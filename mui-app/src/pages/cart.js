import React, { useCallback, useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button, CardMedia } from '@mui/material';
import Layout from '../components/Layout';
import axios from 'axios';
import Cookies from 'js-cookie';
import CustomAlert from '../components/alert';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartEmpty,setCartEmpty]=useState(false);
  const [alertI,setAlertI]= useState(false);
  const [alertD,setAlertD]= useState(false);
  const url=`${process.env.REACT_APP_LOCAL_HOST_URL}/images/`;
  const [cookie,setCookie]= useState("");

  
  const fetchCartItems = useCallback(() => {
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/cart`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((results) => {
        setCartItems(results.data);
        if (results.data.length === 0) {
          setCartEmpty(true);
        } else {
          setCartEmpty(false);
        }
      })
      .catch((err) => {
        console.log("your cart is empty");
      });
  }, []); // Empty dependency array since no external values are used within

  useEffect(() => {
    const c = Cookies.get("jwtToken");
    setCookie(c);
    fetchCartItems(); // Fetch initial cart items
  }, [fetchCartItems]);
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleQuantityChange = (item, increment) => {
    const endpoint = increment ? "quantityi" : "quantitym";
    if(increment){
      setAlertI(true)
    }
    else{
      setAlertD(true)
    }
   
    axios.post(`${process.env.REACT_APP_SERVER_URL}/${endpoint}`, { name: item.name })
    .then((response) => {
      console.log(response.data);
      fetchCartItems();
      // Update cart items or do anything else as needed
    })
    .catch((error) => {
      console.error(error);
    })
    
  };
  

  return (
    <Layout>
      {cartEmpty ? (<h1>Your cart is empty</h1>)
      :
      ( 
        <div>
      {cookie ? (
        <Box sx={{ padding: '20px' }}>
          <Typography variant="h4" gutterBottom>
            Your Cart
          </Typography>
          <List>
            {cartItems.map(item => (
              <ListItem key={item.id}>
               <CardMedia
                sx={{ maxHeight: "100px",maxWidth:"150px" }}
                component={"img"}
                src={url + item.image}
                alt={item.name}
              />
                <ListItemText
                sx={{marginLeft:'50px'}}
                  primary={item.name}
                  secondary={`₹${item.price} x ${item.quantity}`}
                />
                <CustomAlert message={`Do you want to increase the quantity`}
               open={alertI}
               onClose={()=>{
                setAlertI(false)}}
               secondButton="no"
               onSecondButtonClose={()=>{
              setAlertI(false)}}
               />
               <CustomAlert message={`Do you want to decrease the quantity `}
               open={alertD}
               onClose={()=>{
                setAlertD(false)}}
               secondButton="no"
               onSecondButtonClose={()=>{
                setAlertD(false)}}
               />
                <Button variant="outlined" onClick={() => handleQuantityChange(item, true)}>+</Button>
                <Button variant="outlined" onClick={() => handleQuantityChange(item, false)}>-</Button>
              </ListItem>
            ))}
          </List>
          <Typography variant="h6" sx={{ textAlign: 'end', marginTop: '20px' }}>
            Total: ₹{calculateTotal()}
          </Typography>
          <Link  to={'/checkout'}> <Button variant='contained' >Check out</Button></Link>
        </Box>
      ) : (
        <h1> Login to view cart</h1>
      )}
      </div> 
      )}
    </Layout>
  );
};

export default CartPage;
