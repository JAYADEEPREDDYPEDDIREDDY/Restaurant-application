import React from 'react'
import Layout from '../components/Layout';
import { Box, Typography } from '@mui/material';

const About = () => {
  return (
    <>
       <Layout>
      <Box>
        <Box sx={{backgroundImage:"/images/about.jpg",height:'500px',opacity:'10px'}}>
          <div style={{paddingTop:'200px',paddingRight:'700px',paddingLeft:'40px'}}>
          <h1 style={{color:'white',fontSize:'40px',padding:'0.5rem',
          borderRadius:'10px',width:'600px',
          fontFamily:'cursive',textAlign:'center',marginRight:'50px',}} >Welcome to My Restaurant</h1>

          </div>
        </Box>
        <Typography sx={{textAlign:'center'}}>
        

At My Restaurant, we believe in the joy of good food and great company. Our cozy and inviting space is the perfect setting for you to indulge in a delightful dining experience.

<h1>Our Story</h1>
Founded with a love for food and a passion for hospitality, [Restaurant Name] opened its doors in [year]. From the beginning, we set out to create a place where people could come together, share a meal, and create lasting memories.

<h1>Our Food</h1>
We take pride in serving fresh and delicious dishes made from the finest ingredients. Our talented chefs craft each plate with care and attention to detail, ensuring that every bite is a burst of flavor.

<h1>Your Experience</h1>
When you visit us, you become a part of our family. Our friendly and attentive staff will go above and beyond to make sure you have a memorable time. Whether it's a romantic dinner for two or a gathering with friends, we strive to make your experience truly special.

<h1>ommunity Matters</h1>
As a local business, we believe in giving back to the community that has embraced us. We actively support local causes and events, because we know that a strong community is the heart of any successful restaurant.

<h1>Visit Us</h1>
We are conveniently located at [Address], [City], [State/Province], [ZIP/Postal Code]. For reservations or any inquiries, feel free to call us at [Phone Number] or drop us an email at [Email Address]. We can't wait to welcome you to [Restaurant Name] and share our love for great food with you.

Thank you for considering us for your dining pleasure. See you soon!

        </Typography>
      </Box>
     </Layout>
    </>
  )
}

export default About;