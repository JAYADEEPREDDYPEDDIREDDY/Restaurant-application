import { Box, Drawer, Toolbar, Typography, AppBar, IconButton, Divider, Button, Avatar } from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import "../styles/navbar.css";
import Cookies from "js-cookie";
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import {  alpha } from '@mui/material/styles';
const Navbar = () => {
  const [cookie, setCookie] = useState("");
  const [menuBtn, setMenuBtn] = useState(false);



  useEffect(() => {
    const c = Cookies.get("jwtToken");
    setCookie(c);
  }, []);

  const handleMenuBtn = () => {
    setMenuBtn(!menuBtn);
  };
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));
  const drawer = () => {
    return (
      <Box onClick={handleMenuBtn} sx={{ textAlign: "center", m: '10' }}>
        <Typography>
          <h3><RestaurantIcon /> My restaurant</h3>
        </Typography>
        <Divider />
        <ul className="mobile-nav">
          {/* Mobile menu items */}
          <li>
            <NavLink activeClassName='active' to={"/"}>home</NavLink>
          </li>
          <li>
            <NavLink to={"/about"}>About</NavLink>
          </li>
          <li>
            <NavLink to={"/restaurants"}>Restaurants</NavLink>
          </li>
          <li>
            <NavLink to={"/contact"}>Contact</NavLink>
          </li>
        </ul>
      </Box>
    );
  };


  return (
    <>
      <Box
        component="nav"
        sx={{
          bgcolor: "black",
          color: "white",
        }}
      >
        {/* AppBar */}
        <AppBar
          sx={{
            bgcolor: "black",
            color: "white",
          }}
        >
          <Toolbar>
            {/* Mobile Menu Button */}
            <IconButton
              onClick={handleMenuBtn}
              color="inherit"
              aria-label="open drawer"
              edge="start"
              sx={{
                mr: 2,
                display: { sm: "none" },
              }}
            >
              <MenuIcon />
            </IconButton>

            <Typography>
              <Link to='/'>
                <img src={'/images/logo.svg'} style={{ width: '200px', height: '60px' }} alt="logo" />
              </Link>
            </Typography>

            {/* Desktop Navbar */}
            <Box
              sx={{
                
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}
            >
              {/* Menu Items */}
              <ul className="nav-menu">
                <li>
                  <NavLink activeClassName='active' to={"/"}>Home</NavLink>
                </li>
                <li>
                  <NavLink to={"/about"}>About</NavLink>
                </li>
                <li>
                  <NavLink to={"/restaurants"}>Restaurants</NavLink>
                </li>
                <li>
                  <NavLink to={"/contact"}>Contact</NavLink>
                </li>
              </ul>

              {/* User Actions */}
              <div style={{ display: 'flex', alignItems: 'center', marginLeft: '20px' }}>
                {cookie ? (
                  <Link to={'/profile'}>
                    <Avatar sx={{ bgcolor: 'secondary.main', marginRight: '10px' }}>
                      <AccountCircleIcon />
                    </Avatar>
                  </Link>
                ) : (
                  <Link to='/login'>
                    <Button sx={{ marginRight: '10px', color: 'white' }} className="login-btn">Login</Button>
                  </Link>
                )}
                {cookie && <Link to={'/cart'}><ShoppingCartIcon /></Link>}
              </div>
              <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
            </Box>
          </Toolbar>
        </AppBar>


        {/* Mobile Drawer */}
        <Box component={"nav"}>
          <Drawer
            variant="temporary"
            open={menuBtn}
            onClose={handleMenuBtn}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": { width: 200 },
            }}
          >
            {drawer()}
          </Drawer>
        </Box>
      </Box>
    </>
  );
};

export default Navbar;
