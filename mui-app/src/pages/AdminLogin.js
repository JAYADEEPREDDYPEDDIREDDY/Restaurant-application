import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";

const AdminLogin = () => {
  const navigate = useNavigate()
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
    
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };
  const handleLoginButtton=()=>{
    const email =input.email;
    const password =input.password;
    const role="admin"
    axios.post(`${process.env.REACT_APP_SERVER_URL}/adminLogin`,{email,password,role}).then((result)=>{
      navigate('/adminPanel')
    })
    .catch((err)=>console.log(err))
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f0f0f0", 
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "600px",
          padding: "20px",
          borderRadius: "5px",
          backgroundColor: "#ffffff", 
        }}
      >
        <img
          src={"http://localhost:3000/images/logo.svg"}
          alt="logo"
          width={"350px"}
        />
        <Typography component="h2" variant="h4"
        sx={{
            marginTop:"30px"
        }}>
          Welcome back!
        </Typography>
        <Typography component="h2" variant="h5"
        sx={{
            marginTop:"10px",
            marginBottom:"20px",
        }}>
          Admin Login
        </Typography>
        <TextField
          type="text"
          placeholder="User Name"
          margin="normal"
          fullWidth
          name="email"
          onChange={handleChange}
          value={input.email}
        />
        <TextField
          type="password" 
          placeholder="Password"
          margin="normal"
          fullWidth
          name="password"
          onChange={handleChange}
          value={input.password}
        />
        
        <Button variant="contained" sx={{marginTop:"20px"}}  fullWidth onClick={handleLoginButtton}>
          Login
        </Button>
        <Link to="/forgot-password">
          <Typography variant="body2">Forgot password?</Typography>
        </Link>
      </Box>
      
    </Box>
  );
};

export default AdminLogin;
