import './App.css';
import Login from './components/Login';
import Register from './components/Register'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Profile from './components/Profile'
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import mapboxgl from 'mapbox-gl';
import axios from 'axios'

mapboxgl.accessToken = 'pk.eyJ1IjoiandtdWxsaW5zOTIiLCJhIjoiY2tveWZoNHVxMGpjNTJvazhjaDNudzJkeSJ9.GfoztZX0qS6i1xHHfnvhrA';
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null)
  const [allUsers, setAllUsers] = useState()

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await fetch(
          `http://dronedropexpress-env.eba-mzvmnh8d.us-east-1.elasticbeanstalk.com/users`
        )
        let users = await response.json();
        setAllUsers(users)
      } catch (err) {
        console.log(err)
      }
    };
    getAllUsers()
  }, [])

  const login = (user) => {
    setLoggedIn(true);
    setCurrentUser(user)
  }

  const getUser = async (user) => {
    const { username, password, firstName, lastName, address, longitude, latitude } = user;
    setLoggedIn(true)
    setCurrentUser(user)
    try {
      const response = axios.post('http://dronedropexpress-env.eba-mzvmnh8d.us-east-1.elasticbeanstalk.com/user', {
        username,
        password,
        firstName,
        lastName,
        address,
        longitude,
        latitude
      })
    } catch (err) {
      console.error(err)
    }
  }

  const addUser = (user) => {
    const newAllUsers = allUsers.slice();
    newAllUsers.push(user)
    setAllUsers(newAllUsers)
  }

  const logout = () => {
    setLoggedIn(false)
    setCurrentUser(null)
  }

  return (
    <BrowserRouter>
      <Navbar isLoggedIn={loggedIn} user={currentUser} logout={logout} />
      <Routes>
        <Route path="/" element={loggedIn ? <Home user={currentUser} allUsers={allUsers} /> : <Navigate to="/login" />} />
        <Route path="profile" element={loggedIn ? <Profile user={currentUser} allUsers={allUsers} /> : <Navigate to="/login" />} />
        <Route path="login" element={<Login login={login} />} />
        <Route path="register" element={<Register addUser={addUser} allUsers={allUsers} logout={logout} loginNewUser={getUser} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
