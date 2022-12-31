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
  const [currentUser, setCurrentUser] = useState(JSON.parse(window.localStorage.getItem('currentUser')))
  const [allUsers, setAllUsers] = useState()

  console.log(process.env.REACT_APP_BACKEND)

  let path = window.localStorage.getItem('path')
  let location = JSON.parse(path)


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

  useEffect(() => {
    console.log("CHANGING USER")
    console.log(currentUser)
    if (currentUser) {
      setLoggedIn(true)
    } else {
      console.log("FLASING")
      setLoggedIn(false)
    }
  }, [currentUser])


  const login = (user) => {
    window.localStorage.setItem('currentUser', JSON.stringify(user))
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
      window.localStorage.setItem('currentUser', JSON.stringify(user))
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
    window.localStorage.setItem("currentUser", null)
    axios.delete(process.env.REACT_APP_BACKEND + "/logout")
      .then(res => {
        setLoggedIn(false)
        setCurrentUser(null)
      })
  }

  if (loggedIn) {
    return (
      <BrowserRouter>
        <Navbar isLoggedIn={loggedIn} user={currentUser} logout={logout} />
        <Routes>
          <Route path="/" element={loggedIn ? <Home user={currentUser} allUsers={allUsers} /> : <Navigate to="/login" />} />
          <Route path="profile/:username" element={loggedIn ? <Profile user={currentUser} loggedIn={loggedIn} allUsers={allUsers} /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to={location} />} />
        </Routes>
      </BrowserRouter>
    );
  }
  return (
    <BrowserRouter>
      <Navbar isLoggedIn={loggedIn} user={currentUser} logout={logout} />
      <Routes>
        <Route path="login" element={!loggedIn ? <Login loggedIn={loggedIn} login={login} /> : <Navigate to={location} />} />
        <Route path="register" element={!loggedIn ? <Register addUser={addUser} allUsers={allUsers} logout={logout} loginNewUser={getUser} /> : <Navigate to={location} />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
