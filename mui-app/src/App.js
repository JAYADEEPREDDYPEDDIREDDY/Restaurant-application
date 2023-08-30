
import React from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './pages/home';
import About from './pages/about';
import Contact from './pages/contact';
import PageNotFound from './pages/pageNotFound';
import Login from './pages/login';
import SignUp from './pages/signUp';
import Restaurant from './pages/restaurant';
import Table9 from './pages/resturantMenu'
import CartPage from './pages/cart';
import ProfilePage from './pages/profilePage';
import CheckOut from './pages/checkOut';
import Sample from './pages/sample';
import AddResturant from './pages/AddResturant';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/adminPanel';

const App = () => {
  
  return (
    <>
      <BrowserRouter>
      <Routes>
      <Route path='/cart'element={<CartPage />}/>
      <Route path='/checkout'element={<CheckOut />}/>
        <Route path='/' element={<Home />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/contact' element={<Contact />}/>
        <Route path='/login'element={<Login/>}/>
        <Route path='/setcookie'element={<Login/>}/>
        <Route path='/signup'element={<SignUp/>}/>
        <Route path='/profile'element={<ProfilePage />}/>
        <Route path='/restaurants'element={<Restaurant />}/>
        <Route path='/restaurants/:restaurantName'element={<Table9 />}/>
        <Route path='/admin'element={<AdminLogin />}/>
        <Route path='/adminPanel'element={<AdminPanel />}/>
        <Route path='/addRestaurnat'element={<AddResturant />}/>
        <Route path='/sample'element={<Sample />}/>


        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
