import React, { useState } from 'react';
import {
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Container,
  Grid,
  Typography,
} from '@mui/material';

const RestaurantForm = () => {
  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantImage, setRestaurantImage] = useState('');
  const [description, setDescription] = useState('');
  const [isVegAvailable, setIsVegAvailable] = useState(false);
  const [isNonVegAvailable, setIsNonVegAvailable] = useState(false);
  const [menuCount, setMenuCount] = useState(0); // Number of menu items
  const [menuItems, setMenuItems] = useState([]); // Array to store menu item details
  const [menuDetails, setMenuDetails] = useState([]);
  const handleMenuCountChange = (event) => {
    setMenuCount(parseInt(event.target.value));
    setMenuItems([]); // Clear existing menu items
  };

  const handleMenuItemChange = (index, field, value) => {
    const updatedItems = [...menuItems];
    updatedItems[index][field] = value;
    setMenuItems(updatedItems);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here, including menu items
    // You can access form fields' values using the state variables
  };

  const generateMenuFields = () => {
    const fields = [];

    for (let i = 0; i < menuCount; i++) {
      fields.push(
        <Grid container spacing={2} key={i}>
          <Grid item xs={12}>
            <Typography variant="h6">Menu Item {i + 1}</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Item Name"
              fullWidth
              value={menuItems[i]?.name || ''}
              onChange={(e) => handleMenuItemChange(i, 'name', e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Item Image URL"
              fullWidth
              value={menuItems[i]?.image || ''}
              onChange={(e) => handleMenuItemChange(i, 'image', e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Item Price"
              fullWidth
              type="number"
              value={menuItems[i]?.price || ''}
              onChange={(e) => handleMenuItemChange(i, 'price', e.target.value)}
            />
          </Grid>
        </Grid>
      );
    }

    return fields;
  };

  return (
    <Container maxWidth="md">
      <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Restaurant Name"
              fullWidth
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Restaurant Image URL"
              fullWidth
              value={restaurantImage}
              onChange={(e) => setRestaurantImage(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              multiline
              rows={4}
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox checked={isVegAvailable} onChange={() => setIsVegAvailable(!isVegAvailable)} />}
              label="Veg Available"
            />
            <FormControlLabel
              control={<Checkbox checked={isNonVegAvailable} onChange={() => setIsNonVegAvailable(!isNonVegAvailable)} />}
              label="Non-Veg Available"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Menu Details"
              multiline
              rows={6}
              fullWidth
              value={menuDetails}
              onChange={(e) => setMenuDetails(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Add Restaurant
            </Button>
          </Grid>
        </Grid>
      </form>
        
        <Grid item xs={12}>
          <TextField
            label="Number of Menu Items"
            type="number"
            value={menuCount}
            onChange={handleMenuCountChange}
          />
        </Grid>

        {/* Generate menu item fields dynamically */}
        {generateMenuFields()}

        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Add Restaurant
          </Button>
        </Grid>
     
    </Container>
  );
};

export default RestaurantForm;
