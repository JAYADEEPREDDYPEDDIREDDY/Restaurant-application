import { Box, Typography } from '@mui/material'
import React from 'react';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  return (
    <>
      <Box sx={{bgcolor:'black',color:'white', textAlign:'center'}}>
        <Box className="social-media" 
        sx={{
            my:'3',
            '& svg':{
                color:'white',
                fontSize:"40px",
                cursor:'pointer',
                marginLeft:'10px'
            },
            '& svg:hover':{
                // /fontSize:"50px",
                transform:'translateX(5px)',
                transition:'all 400ms',
                color:"blue"
            }
        }}>
        <a href='https://www.youtube.com/'><YouTubeIcon/></a>
        <a href='https://twitter.com/'><TwitterIcon/></a>
        <a href='http://linkedin.com/'><LinkedInIcon/></a>
        <a href='https://facebook.com/'><FacebookIcon/></a>
        <a href='https://instagram.com/'><InstagramIcon/></a>
        </Box>
        
        <Typography>
            Copyright @myrestaurant.com - 2023
        </Typography>
      </Box>
    </>
  )
}
export default Footer;