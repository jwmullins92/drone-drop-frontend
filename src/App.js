import './App.css';
import Login from './components/Login';
import Register from './components/Register'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Profile from './components/Profile'
import React, { useEffect, useState, useMemo } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import mapboxgl from 'mapbox-gl';
import axios from 'axios'
import NotFound from './components/NotFound'

axios.defaults.withCredentials = true



mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null)
  const [allUsers, setAllUsers] = useState()

  let path = window.localStorage.getItem('path')
  let location = JSON.parse(path)

  useEffect(() => {
    axios.get(process.env.REACT_APP_BACKEND + "/login")
      .then(res => {
        console.log(res)
        if (res.data.loggedIn) {
          console.log("FOuND")
          setCurrentUser(res.data.user)
          setLoggedIn(true)
          console.log(loggedIn)
        }
      })
  }, [])

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        console.log("getting users")
        const response = await fetch(
          process.env.REACT_APP_BACKEND + `/users`
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
    try {
      const response = axios.post(process.env.REACT_APP_BACKEND + '/user', {
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
    setLoggedIn(true)
    setCurrentUser(user)
    setAllUsers(newAllUsers)
  }



  const logout = () => {
    axios.delete(process.env.REACT_APP_BACKEND + "/logout")
      .then(res => {
        setLoggedIn(false)
        setCurrentUser(null)
      })
  }

  return (
    <BrowserRouter>
      <Navbar isLoggedIn={loggedIn} user={currentUser} logout={logout} />
      <Routes>
        <Route path="/" element={loggedIn ? <Home user={currentUser} allUsers={allUsers} /> : <Navigate to="/login" />} />
        <Route path="profile/:username" element={loggedIn ? <Profile user={currentUser} loggedIn={loggedIn} allUsers={allUsers} /> : <Navigate to="/login" />} />
        <Route path="login" element={!loggedIn ? <Login loggedIn={loggedIn} login={login} /> : <Navigate to={location} />} />
        <Route path="register" element={!loggedIn ? <Register addUser={addUser} allUsers={allUsers} logout={logout} loginNewUser={getUser} /> : <Navigate to={location} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
