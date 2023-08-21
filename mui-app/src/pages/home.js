
import Layout from '../components/Layout';
import {  Button, } from '@mui/material';

import '../styles/homePage.css'
import { Link } from 'react-router-dom';

const Home = () => {
 
  return (
    
    <>
     <Layout >
      
        <div  className='text-block' style={{backgroundImage:`url("http://localhost:3000/images/banner.jpeg" )`,height:'90vh'}}>
          <div className='block-m'>
          <div className='title'>Food Website</div>

          <div className='caption'>Best food in india</div>
          <Link to="/restaurants" className='Order-btn'><Button variant="contained"sx={{width:'150px',backgroundColor:'black'}}>Order now</Button></Link>
          </div>
         
        </div>
      
     </Layout>
    </>
  )
}

export default Home;
