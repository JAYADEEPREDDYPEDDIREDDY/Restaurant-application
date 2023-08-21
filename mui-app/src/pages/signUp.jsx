import { Box, TextField, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import '../styles/login.css';

function SignUp() {
  const navigate = useNavigate();
  const [isValidEmail,setIsValidEmail]=useState(true);
  const [isValidPassword,setIsValidPassword]=useState(true);
  const [isAlert,setAlert]=useState("");
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  

  const handleSignUp = (e) => {
    const email =input.email;
    const password =input.password;
    const name = input.name;
    if(email===''){
      setIsValidEmail(true);
      setAlert("Enter valid email ID")
    }
    else if(password===''|| password.length<6){
      
      setAlert("Password length must be greater than 6 characters")
    }
    else {
    e.preventDefault();
    console.log(input); 
    
    // console.log(email1);
   axios.post(`${process.env.REACT_APP_SERVER_URL}/signup`,{name,email,password})
   .then(result=>{
    if(result.data==="User already exist")
    {
      setAlert("User already exist")
    }
    else{
    navigate('/login')
    console.log(result)
    }
  })
    
   .catch(e=>console.log(e))
    }
  };

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };
  

  return (
    <>
    <div style={{backgroundColor:'blueGrey'}} className="login-container">
      <form >
        <div className="login-form">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "400px",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto",
            marginTop: "30px",
            padding: "20px",
            borderRadius: "5px",
            boxShadow: "5px 5px 10px #ccc",
            ":hover": {
              boxShadow: "10px 10px 15px #ccc",
            },
          }}
        >
          <Typography><h1>Sign Up</h1> </Typography>
          { isAlert &&
            <div className="alert-message">
            <Typography>
             {isAlert}
            </Typography>
            </div>
          }
            <TextField
              variant="outlined"
              margin="normal"
              placeholder="Name"
              type="text"
              name="name"
              value={input.name}
              onChange={handleChange}
            />
        
        <TextField
             error={!isValidEmail}
             helperText={!isValidEmail ? "Enter valid email id" : ""}
            variant="outlined"
            margin="normal"
            placeholder="Email"
            type="email"
            name="email"
            value={input.email}
            onChange={handleChange}
          />
             <TextField
  error={!isValidPassword}
  helperText={!isValidPassword ? "Incorrect passwrd." : ""}
  variant="outlined"
  margin="normal"
  placeholder="Password"
  type="password"
  name="password"
  value={input.password}
  onChange={handleChange}
/>
          
          <Button
            onClick={handleSignUp}
            variant="contained"
            sx={{ marginTop: "10px" }}
          >
             Sign fsfshedheur
          </Button>
          <Link to={'/login'}><Button
            sx={{ marginTop: "10px" }}
            
          >
            Click here toloingb
          </Button></Link>
        </Box>
        </div>
      </form>
      </div>
    </>
  );
}

export default SignUp;
