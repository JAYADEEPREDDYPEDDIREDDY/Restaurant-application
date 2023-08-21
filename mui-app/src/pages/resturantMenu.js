import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
} from "@mui/material";
import "../styles/restaurantList.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CustomAlert from "../components/alert";


const Table9 = () => {
  
  const url = `${process.env.REACT_APP_LOCAL_HOST_URL}/images/`;
  const [data, setData] = useState([]);

  const { restaurantName } = useParams();
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const cat = queryParams.get("category");

  const [showAlert,setShowAlert] =useState(false)
  const naviagate = useNavigate()

  const handleCart = (id) => {
   
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/add-to-cart`,
        { restaurantName, id },
        {withCredentials: true}
       
      )
      .then((results) => {
       console.log(results)
      }).catch(err=>{ console.log(err)
        setShowAlert(true)});
  };
 const loginAction=()=>{
  naviagate("/login")
}
  useEffect(() => {
    axios
      .get(`http://localhost:3001/gets/${restaurantName}`)
      .then((response) => {
       
        setData(response.data);
      })
      .catch((err) => console.log(err));
  });

  // Filter the data to get only "veg" items
  const vegItems = data.filter((item) => item.type === cat);
  


  return (
    <Layout>
      {showAlert && <CustomAlert message="To access this feature, please log in or sign up."
      open={showAlert}
      onClose={loginAction}
      />}
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {vegItems.map((item) => (
          
          <Card key={item.id} sx={{ maxWidth: "390px", display: "flex", m: 2 }}>

            <CardActionArea>
              <CardMedia
                sx={{ minHeight: "400px" }}
                component={"img"}
                src={url + item.image}
                alt={item.name}
              />
              <CardContent>
                <Typography variant="h5" gutterBottom component={"div"}>
                  {item.name}
                </Typography>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography variant="body2">Price: {item.price}</Typography>
                  <Button
                    sx={{ marginTop: "-10px" }}
                    onClick={() => handleCart(item.ID)}
                  >
                    Add to cart
                  </Button>
                </div>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Layout>
  );
};

export default Table9;
