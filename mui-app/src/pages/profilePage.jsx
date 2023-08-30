import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, Avatar, Button } from '@mui/material';
import Layout from '../components/Layout';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


const profileStyles = {
  root: {
    marginTop: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  paper: {
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '400px',
  },
  avatar: {
    width: '100px',
    height: '100px',
    marginBottom: '1rem',
  },
  button: {
    marginTop: '1rem',
  },
};


const ProfilePage = () => {
  const [name,setName]=useState("");
  const [showProfie,setShowProfile]=useState(false);
  const [email,setEmail]=useState("");
  const [cookie,setCookie]= useState("");
  const navigate = useNavigate()
  const logoutUser=()=>{
      Cookies.remove("jwtToken");
      
      navigate("/login");
      window.location.reload();
  }
  useEffect(()=>{
    
      const c=Cookies.get("jwtToken")
      setCookie(c)
       setCookie(cookie)
    axios.post(`${process.env.REACT_APP_SERVER_URL}/profile`,
    {
     
    },
    {
      withCredentials: true, 
    })
    .then((results)=>{
        setName(results.data.name);
        setEmail(results.data.email);
        setShowProfile(true)

    }).catch(err=>setShowProfile(false))
  })
  
  return (
    <Layout >
      
    { showProfie && <Container component="main" maxWidth="sm" sx={{marginTop:"100px",marginBottom:"320px"}}>
      <div style={profileStyles.root}>
        <Paper style={profileStyles.paper} elevation={3}>
          <Avatar
            style={profileStyles.avatar}
            alt="User Avatar"
            src="http://localhost:3000/avatar.png"
          />
          <Typography component="h1" variant="h5">
            
          </Typography>
          <Typography variant="body1">
            Name: {name}
          </Typography>
          <Typography variant="body1">
            Email: {email}
          </Typography>
          <Typography variant="body1">
            Location: India
          </Typography>
          <Button onClick={logoutUser}>Logout</Button>
        </Paper>
      </div>
    </Container>}
    <h1>Login to view profile</h1>
    </Layout>
  );
};

export default ProfilePage;
