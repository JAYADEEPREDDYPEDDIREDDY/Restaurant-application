import axios from 'axios'
import React, { useEffect,useState } from 'react'
import Layout from '../components/Layout';
import { Box ,CardContent,Typography,CardMedia,CardActionArea,Card} from '@mui/material';

const Sample = () => {
    const cat="Non veg"
    const url = "http://localhost:3001/images/";
    const [data,setData]=useState([]);
    useEffect(()=>{
        axios.get("http://localhost:3000/sample")
        .then(results=>{setData(results.data)
        console.log(data)})
        .catch(err=>console.log(err))
    })
    const items = data.filter((item) => item.Category=== cat)
  return (
    <Layout>
       <Box sx={{display:"flex",flexWrap:"wrap",justifyContent:"center"}}>
           {
            items.map(menu =>(
            <Card sx={{maxWidth:'390px', m:2}}>
              <CardActionArea>
                <CardMedia sx={{minHeight:'400px'}} component={'img'} src={url+menu.image} alt={menu.name}/>
              </CardActionArea>
              <CardContent>
                  <Typography variant="h5" gutterBottom component={'div'}>
                     {menu.name}
                  </Typography>
                  <Typography variant="body2" >
                     {menu.description}
                  </Typography>
                </CardContent>
            </Card>
            ))
           }
       </Box>
    </Layout>
  )
}

export default Sample