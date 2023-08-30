import React from 'react'
import { useLocation } from 'react-router-dom';

const RestaurantDetails = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const restaurantName = queryParams.get("restaurantName");
  
  return (
    <div>{restaurantName}</div>
  )
}

export default RestaurantDetails