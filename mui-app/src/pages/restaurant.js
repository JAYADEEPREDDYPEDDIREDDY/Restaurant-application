import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory
import Layout from '../components/Layout';
import axios from 'axios';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import '../styles/restaurantList.css';


const Restaurant = () => {
  const url = `${process.env.REACT_APP_LOCAL_HOST_URL}/images/`;
  const [data, setData] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/restaurants`)
      .then(response => {
        setData(response.data);
      })
      .catch(err => console.log(err));
  }, []);

  const navigate = useNavigate(); // Initialize useHistory

  const handleOptionClick = (category,restaurant) => {
    navigate(`/restaurants/${restaurant}?category=${category}`); // Pass the category as a query parameter
  };

  return (
    <Layout>
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
