import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory
import Layout from '../components/Layout';
import axios from 'axios';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { Select, MenuItem, Container, List, ListItem } from '@mui/material';
import '../styles/restaurantList.css';


const Restaurant = () => {
  const url = `${process.env.REACT_APP_LOCAL_HOST_URL}/images/`;
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const [restaurants,setRestaurants] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/restaurants`)
      .then(response => {
        setData(response.data);
      })
      .catch(err => console.log(err));

      axios.get(`${process.env.REACT_APP_SERVER_URL}/categories`)
      .then(response => {
        setCategory(response.data);
        console.log(category)
      })
      .catch(err => console.log(err));
  }, []);

  const navigate = useNavigate(); // Initialize useHistory

  const handleOptionClick = (category,restaurant) => {
    navigate(`/restaurants/${restaurant}?category=${category}`); // Pass the category as a query parameter
  };
  const handleCategory=(cat)=>{
    axios.get(`${process.env.REACT_APP_SERVER_URL}/categories/${cat}`)
      .then(response => {
        console.log(response.data)
        const allRestaurants =response.data
        const filteredRestaurants = allRestaurants.map(restaurant => {
          const filteredMenu = restaurant.menu.filter(item => item.category === cat);
          return {
            name: restaurant.name,
            menu: filteredMenu,
          };
        });
  
        setRestaurants(filteredRestaurants)
      })
     console.log(cat);
  }

  return (
    <Layout>
      <Typography component={'h2'} variant='h3'>Categories</Typography>
      <div style={{display: "flex", flexDirection: "row",}}>
        
        {category.map(item => (
          <div key={item.categoryName} style={{padding:'20px'}} >
             <Card
              sx={{ maxWidth: "390px", m: 2 }}
              onClick={() => handleCategory(item.categoryName)}
            >
          <img src={process.env.REACT_APP_SERVER_URL+'/'+item.imageUrl} alt='ja' style={{height: "200px",width:'200px',borderRadius:'150px'}}></img>
          <Typography component={'h4'} variant='h5' sx={{marginLeft:'50px'}}>{item.categoryName}</Typography>
          </Card>
          </div>
        ),)}
        
      </div>
      <List>
        {restaurants.map(restaurant => (
          <ListItem key={restaurant.name} style={{ marginBottom: '20px' }}>
            <Typography variant="h6" gutterBottom>
              {restaurant.name}
            </Typography>
            <List>
              {restaurant.menu.map(item => (
                <div style={{display:'flex', flexDirection:"column"}}>
                <ListItem key={item._id}>
                  <img src={url + item.image} alt={item.name}></img>
                  {item.url} - {item.price}
                </ListItem>
                </div>
              ))}
            </List>
          </ListItem>
        ))}
      </List>
      <Typography component={'h2'} variant='h3'>Restaurants</Typography>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {data.map(item => (
          <div key={item.id}>
            <Card
              sx={{ maxWidth: "390px", display: "flex", flexDirection: "row", m: 2 }}
              onClick={() => setSelectedCard(item.id)}
            >
              <CardActionArea>
                <CardMedia
                  sx={{ minHeight: "400px" }}
                  component={"img"}
                  src={url + item.url}
                  alt={item.name}
                />
                <CardContent>
                  <Typography variant="h5" gutterBottom component={"div"}>
                    {item.name}
                  </Typography>
                  <Typography variant="body2">Veg : {item.veg}</Typography>
                  <Typography variant="body2">Non Veg : {item.nonVeg}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            {selectedCard === item.id && (
              <div className="overlay">
                <button className="option-button" onClick={() => handleOptionClick('veg',item.name)}>Veg</button>
                <button className="option-button" onClick={() => handleOptionClick('Non veg',item.name)}>Non-Veg</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Restaurant;
