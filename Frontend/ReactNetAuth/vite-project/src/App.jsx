import React, { useEffect } from 'react'
import {BrowserRouter as Router , Routes, Route, useNavigate } from 'react-router-dom';


import Login from './components/Login';
import Header from './components/Header';
import Register from './components/Register';
import Profile from './components/Profile';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './redux/AuthSlice';
import  {Navigate}  from 'react-router-dom';
import ProductList from './components/ProductList';
import "./App.css"
import ProductDetails from './components/ProductDetails';

import SepetCard from './components/SepetCard';
import Footer from './components/Footer';

const App = () => {

const {user} = useSelector((store)=>store.auth);
const dispatch = useDispatch();

useEffect(()=>{
  const token = localStorage.getItem("token");
  if(token){
    const userFromToken = JSON.parse((atob(token.split(".")[1])));
     dispatch(setUser(userFromToken));
  }
},[dispatch])

  return (
    <Router>
     <Header/> 
      <Routes>
       <Route path="/" element={<ProductList />} />
        
          <Route path="/login" element={user ? <ProductList/>  : <Login />} />
           <Route path="/register" element={user ? <ProductList/> : <Register />} />
            <Route path="/profile" element={ <Profile/> } />
           
            <Route path="/product-details/:id" element={ <ProductDetails/> } />
            <Route path="/card" element={user ? <SepetCard/>  : <Login />} />
         </Routes>
          </Router>
         
  )
}

export default App