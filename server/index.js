require('dotenv').config()

const express = require("express");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
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
    const user_Exist = await usertable.findOne({email:email})
    if(!user_Exist){
      const user_id = uuidv4();
      const newUser = await usertable.create({ user_id, name, email, password });
      res.status(201).json(newUser);
    }
    else{
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
  } catch (err) {
    res.status(500).json({ error: "An error occurred during login."});
  }
});

app.get("/restaurants", (req, res) => {
  const restaurantDb = require('./models/restaurant');
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

app.get("/gets/:restaurantName", async (req, res) => {
  try {
    const restaurantName = req.params.restaurantName;
    const restaurantDb = require('./models/restaurant');
    const restaurantMenu = await restaurantDb.findOne({ name: restaurantName });

    if (!restaurantMenu) {
      return res.status(404).json({ message: "No items found." });
    }
    
    res.json(restaurantMenu.menu);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred while processing the request." });
  }
});

app.post("/add-to-cart", async (req, res) => {
  try {
    const { restaurantName, id } = req.body;
const jwtToken = req.cookies.jwtToken;
// console.log(req.headers);
//const jwtToken = req.headers.authorization



const restaurantDb = require('./models/restaurant');
const restaurantMenu = await restaurantDb.findOne({ name: restaurantName });

if (!restaurantMenu) {
  return res.status(404).json({ message: "Restaurant not found." });
}
const restaurantmenubids=restaurantMenu.menu
const product = restaurantmenubids.find(item => item.ID === id);


if (!product) {
  console.log("not found");
  return res.status(404).json({ message: "Product not found." });
}



    if(!product){
      console.log("not found ")
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
      let userExist = await userTable.findOne({ user_id: user_id });

     
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
          res
            .status(200)
            .json({ message: "Item added to cartds successfully" });
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


app.get("/sample",(req,res)=>{

     sampleMenuTable.find()
     .then((results)=>res.json(results))
     .catch((error)=>res.json(error))

})