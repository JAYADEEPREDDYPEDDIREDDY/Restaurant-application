import { Box, TextField, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import axios from 'axios';
import { useLoginContext } from "../components/loginContext";
import { Link, useNavigate } from "react-router-dom";
import '../styles/login.css';
import Cookies from "js-cookie";
function Login() {
  
  const [isAlert,setAlert]=useState("");
  const [isValidEmail,setIsValidEmail]=useState(true);
  const [isValidPassword,setIsValidPassword]=useState(true);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { setLoginMessage } = useLoginContext();


  const handleLoginIn = (e) => {
    const email =input.email;
    const password =input.password;
    if(email===''){
      setIsValidEmail(true);
      setAlert("Enter valid email ID")
    }
    else if(password===''){
      
      setAlert("Enter valid password")
    }
    else if(email&&password){
    e.preventDefault();
  
    
   axios.post(`${process.env.REACT_APP_SERVER_URL}/login`,{email,password},
    {withCredentials: true}
   )
   
   .then(result=>{
   
    
  if(result.status.toString()==="200"){

    setLoginMessage(result.data.token);
    
  Cookies.set("jwtToken",result.data.token)
    navigate('/');
    
  } 
})
    
   .catch(e=>
    { if(e.status==="401"){
      console.log(e.data.error)
    }
    else
    {
      setIsValidPassword(false);
      setAlert("Incorrect email or password");
    }
})
}
}

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };
  

  return (
    <>
      <form >
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

          <Typography> <h1>Login</h1></Typography>
          { isAlert &&
            <div className="alert-message">
            <Typography>
             {isAlert}
            </Typography>
            </div>
          }
          
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
           {/* <TextField
          // error
          id="outlined-error-helper-text"
          label="Error"
          defaultValue="Hello World"
          helperText="Incorrect entry."
        /> */}
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
            // type="submit"
            variant="contained"
            sx={{ marginTop: "10px" }}
            onClick={handleLoginIn}
          >
             Login
          </Button>
          <Link  to={'/signup'}> <Button
            sx={{ marginTop: "10px" }}
            
          >Click here to Sign Up
          </Button></Link>
        </Box>
      </form>
    </>
  );
}

export default Login;
