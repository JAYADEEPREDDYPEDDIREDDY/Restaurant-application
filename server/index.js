require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const { v3: uuidv3 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");

const usertable = require("./models/user");

const userTable = require("./models/user");
app.use(cookieParser());

const corsOptions = {
  origin: process.env.FRONT_URL,
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
mongoose
  .connect(process.env.MONGODB_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((e) => console.log(e));

app.listen(process.env.PORT_NUMBER, () => {
  console.log("Server connected");
});

// Input validation middleware
const validateSignupInput = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Please provide all fields." });
  }
  next();
};

app.post("/signup", validateSignupInput, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const role = "user";
    const user_Exist = await usertable.findOne({ email: email });
    if (!user_Exist) {
      const user_id = uuidv4();
      const newUser = await usertable.create({
        user_id,
        name,
        email,
        password,
        role,
      });
      res.status(201).json(newUser);
    } else {
      res.json("User already exist");
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the user." });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await usertable.findOne({ email: email });
    if (user.role === "user") {
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: "Incorrect email or password." });
      }

      const token = jwt.sign(
        {
          user_id: user.user_id,
        },
        process.env.JWT_SECRET_KEY
      );

      res.json({ status: "success", token });
    } else {
      return res.status(401).json({ error: "Incorrect email or password." });
    }
  } catch (err) {
    res.status(500).json({ error: "An error occurred during login." });
  }
});

app.get("/restaurants", (req, res) => {
  const restaurantDb = require("./models/restaurant");
  restaurantDb
    .find()
    .then((restaurants_list) => {
      res.json(restaurants_list);
    })
    .catch((err) => {
      console.error(`Error fetching data from /restaurants: ${err}`);
      res.status(500).json({ error: "An error occurred while fetching data." });
    });
});

app.get("/gets/:restaurntName", async (req, res) => {
  try {
    const restaurantName = req.params.restaurntName;
    const restaurantDb = require("./models/restaurant");
    const restaurantMenu = await restaurantDb.findOne({ name: restaurantName });

    if (!restaurantMenu) {
      return res.status(404).json({ message: "No items found." });
    }

    res.json(restaurantMenu.menu);
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request." });
  }
});

app.post("/add-to-cart", async (req, res) => {
  try {
    const { restaurantName, id } = req.body;
    const jwtToken = req.cookies.jwtToken;
    const restaurantDb = require("./models/restaurant");
    const restaurantMenu = await restaurantDb.findOne({ name: restaurantName });

    if (!restaurantMenu) {
      return res.status(404).json({ message: "Restaurant not found." });
    }
    const restaurantmenubids = restaurantMenu.menu;
    const product = restaurantmenubids.find((item) => item.ID === id);

    if (!product) {
      console.log("not found");
      return res.status(404).json({ message: "Product not found." });
    }

    if (product) {
      if (!jwtToken) {
        return res
          .status(401)
          .json({ message: "Authorization token is missing." });
      }

      const decodedToken = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

      if (!decodedToken.user_id) {
        return res.status(401).json({ message: "Invalid token payload." });
      }

      const user_id = decodedToken.user_id;

      const cartItem = {
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: 1,
      };
      //let userExist = await userTable.findOne({ user_id: user_id });

      let isItemAlreadyExist = await userTable.findOne({
        "items.name": cartItem.name,
      });
      if (isItemAlreadyExist) {
        // If the item exists, increase its quantity by 1

        isItemAlreadyExist.items.find(
          (item) => item.name === cartItem.name
        ).quantity += 1;
        await isItemAlreadyExist.save();
        res
          .status(200)
          .json({ message: "Item quantity increased in the cart" });
      } else {
        await userTable.findOneAndUpdate(
          { user_id: user_id },
          { $push: { items: cartItem } },
          { new: true }
        );
        res.status(200).json({ message: "Item added to carts successfully" });
      }
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    //console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/cart", async (req, res) => {
  const jwtToken = req.cookies.jwtToken;

  try {
    if (!jwtToken) {
      return res
        .status(401)
        .json({ message: "Authorization token is missing." });
    }

    const decodedToken = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

    if (!decodedToken.user_id) {
      return res.status(401).json({ message: "Invalid token payload." });
    }

    const user_id = decodedToken.user_id;

    // Find the user's cart and retrieve the items
    const cart = await userTable.findOne({ user_id: user_id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found." });
    }

    res.json(cart.items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

app.post("/quantityi", async (req, res) => {
  const itemName = req.body.name;

  try {
    // Find the cart that contains the item with the specified name
    const cartWithItem = await userTable.findOne({ "items.name": itemName });

    if (!cartWithItem) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    // Find the specific item within the cart's items array
    const itemToUpdate = cartWithItem.items.find(
      (item) => item.name === itemName
    );

    // Increase the quantity of the item
    itemToUpdate.quantity += 1;

    // Save the updated cart
    await cartWithItem.save();

    res.status(200).json({ message: "Item quantity increased in the cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/quantitym", async (req, res) => {
  const itemName = req.body.name;

  try {
    const cartWithItem = await userTable.findOne({ "items.name": itemName });

    if (!cartWithItem) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    const itemToUpdate = cartWithItem.items.find(
      (item) => item.name === itemName
    );
    if (itemToUpdate.quantity === 1) {
      cartWithItem.items = cartWithItem.items.filter(
        (item) => item.name !== itemName
      );

      await cartWithItem.save();
    } else {
      itemToUpdate.quantity -= 1;
      await cartWithItem.save();
    }

    res.status(200).json({ message: "Item quantity decreased in the cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/profile", (req, res) => {
  const token = req.cookies.jwtToken;

  if (!token) {
    return res.status(401).json({ message: "Authorization token is missing." });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decodedToken.user_id) {
      return res.status(401).json({ message: "Invalid token payload." });
    }

    const userId = decodedToken.user_id;
    userTable
      .findOne({ user_id: userId })
      .then((results) => res.json(results))
      .catch((err) => res.json(err));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/adminLogin", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(password);
    const user = await usertable.findOne({ email: email });

    if (!user) {
      return res
        .status(401)
        .json({ error: "Incorrect ecedvedvmail or password." });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (isPasswordCorrect) {
      return res.status(200).json({ error: "Success" });
    } else {
      return res.status(401).json({ error: "Incorrect email or password." });
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/addNewResturant", async (req, res) => {
  try {
    const AddRestaurant = require("./models/AddResturant");
    const {
      branchName,
      addResturantOrBranch,
      restaurantOwner,
      restaurantName,
      contactNumber,
      emailId,
      //bannerImage,
      address,
      latitude,
      logitude,
      aboutRestaurant,
      country,
      state,
      city,
      currency,
      foodTypes,
      serviceTaxType,
      serviceTax,
      serviceFeeApplicable,
      serviceFeeType,
      serviceFee,
      allowEventBooking,
      eventBookingCapacity,
      eventOnlineAvailability,
      eventBookingMinimum,
      printerAvailable,
      printerPageHeight,
      printerPageWidth,
      sameTimingsAsMonday,
      restaurantTimings,
      closedNo,
      contractualCommission,
      pickUp,
      delivery,
    } = req.body;
    const id = uuidv3(restaurantName, uuidv3.DNS);
    const status = false;
    const newRestaurant = await AddRestaurant.create({
      id,
      status,
      branchName,
      addResturantOrBranch,
      restaurantOwner,
      restaurantName,
      contactNumber,
      emailId,
      //bannerImage,
      address,
      latitude,
      logitude,
      aboutRestaurant,
      country,
      state,
      city,
      currency,
      foodTypes,
      serviceTaxType,
      serviceTax,
      serviceFeeApplicable,
      serviceFeeType,
      serviceFee,
      allowEventBooking,
      eventBookingCapacity,
      eventOnlineAvailability,
      eventBookingMinimum,
      printerAvailable,
      printerPageHeight,
      printerPageWidth,
      sameTimingsAsMonday,
      restaurantTimings,
      closedNo,
      contractualCommission,
      pickUp,
      delivery,
    });

    res.json(newRestaurant);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while adding the restaurant." });
  }
});

app.get('/ResturantsList',async(req,res)=>{
  try{
  const AddRestaurant = require("./models/AddResturant");

  const restaurant = await AddRestaurant.find();

  res.json(restaurant);
  }catch (error) {
  console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while adding the restaurant." });
  }
});

const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Set your upload directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Define the schema and model for categories
const categorySchema = new mongoose.Schema({
  categoryName: String,
  imageUrl: String,
});
const Category = mongoose.model('Category', categorySchema);


app.post('/admin/addCategory', upload.single('image'), async (req, res) => {
  try {
    const { categoryName } = req.body;
    const imageUrl = req.file.path; // Multer stores the uploaded file's path

    const newCategory = new Category({
      categoryName,
      imageUrl,
    });

    await newCategory.save();

    res.status(201).json({ message: 'Category added successfully' });
  } catch (error) {
    console.error('Error adding category:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/categories',async(req,res)=>{
  await Category.find().
  then(result=>res.json(result))
  .catch(err=>res.json(err))
});

app.get('/categories/:category', async (req, res) => {
  try {
    const category = req.params.category;
    const restaurantDb = require("./models/restaurant");
    const restaurants = await restaurantDb.find({ 'menu.category': category });
    res.json(restaurants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

const AddRestaurant = require("./models/AddResturant");

app.post('/updateStatus', async (req, res) => {
  console.log("hello world")
  const { restaurantName, newStatus } = req.body;

  try {
    console.log('Received request:', restaurantName, newStatus);
    const updateResult = await AddRestaurant.updateOne(
      { restaurantName: restaurantName }, // Match the restaurant by name
      { $set: { status: newStatus } } // Update the 'action' field with newStatus
    );

    if (updateResult.nModified > 0) {
      res.status(200).json({ message: "Status updated successfully." });
    } else {
      res.status(404).json({ message: "Restaurant not found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while updating status." });
  }
});
