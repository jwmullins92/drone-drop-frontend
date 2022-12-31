import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import VerifyAddress from './VerifyAddress'
import axios from 'axios'

export default function Register(props) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [address, setAddress] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [newUser, setNewUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [validForm, setValidForm] = useState(true);
    const [usernameTaken, setUsernameTaken] = useState(false)
    const [noAddressFound, setNoAddressFound] = useState(false);

    const [emptyUserBox, setEmptyUserBox] = useState(false)
    const [emptyPasswordBox, setEmptyPasswordBox] = useState(false)
    const [emptyFirstNameBox, setEmptyFirstNameBox] = useState(false)
    const [emptyLastNameBox, setEmptyLastNameBox] = useState(false)
    const [emptyAddressBox, setEmptyAddressBox] = useState(false)

    const geoLocatorUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}&autocomplete=true`

    console.log(process.env.REACT_APP_MAPBOX_TOKEN)

    const navigate = useNavigate();

    const goToLogin = () => {
        navigate('/login')
    }

    const retryRegister = () => {
        props.logout()
        try {
            fetch(process.env.REACT_APP_BACKEND + `/user/${username}`, { method: 'DELETE' })
                .then(
                    setLoading(true)
                )
        } catch (err) {
            console.log(err)
        }
    }

    const verifyUser = async (e) => {
        e.preventDefault()
        setUsernameTaken(false)
        setNoAddressFound(false)

        if (username && password && firstName && lastName && address) {
            try {
                const response = fetch(geoLocatorUrl)
                    .then(response => response.json())
                    .then(res => {
                        console.log(res)
                        if (res.features.length) {
                            const longitude = res.features[0].center[0]
                            const latitude = res.features[0].center[1]
                            const user = {
                                username,
                                password,
                                address: res.features[0].place_name,
                                firstName,
                                lastName,
                                longitude,
                                latitude
                            }

                            if (!props.allUsers.find(user => user.username === username)) {
                                setNewUser(user)
                                props.loginNewUser(user)
                                setLoading(false);
                            } else {
                                setUsernameTaken(true)
                            }
                        } else {
                            setNoAddressFound(true);
                        }

                    })

            } catch (err) {
                console.log(err)
            }
        } else {
            !firstName ? setEmptyFirstNameBox(true) : setEmptyFirstNameBox(false)
            !lastName ? setEmptyLastNameBox(true) : setEmptyLastNameBox(false)
            !username ? setEmptyUserBox(true) : setEmptyUserBox(false)
            !password ? setEmptyPasswordBox(true) : setEmptyPasswordBox(false)
            !address ? setEmptyAddressBox(true) : setEmptyAddressBox(false)
            setValidForm(false)
        }

    }

    const loginNewUser = async () => {
        props.addUser(newUser)
    }

    if (loading) {
        return (
            <div className="d-flex justify-content-center pt-5">
                <div className="card col-12 col-md-6 col-lg-3 mt-5 card-color-md primary-border">
                    <div className="card-body d-flex flex-column">
                        <h5 className="card-title card-text text-center fw-bold">Sign up for Drone Drop Delivery</h5>
                        {!validForm &&
                            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                Looks like we're missing some required data!
                                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>
                        }
                        {usernameTaken && <div className="alert alert-danger alert-dismissible fade show" role="alert">
                            That username is taken
                            <button onClick={(e) => setUsernameTaken(false)} type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>}
                        {noAddressFound && <div className="alert alert-danger alert-dismissible fade show" role="alert">
                            Could not locate anything with the given address
                            <button onClick={(e) => setNoAddressFound(false)} type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>}
                        <form onSubmit={verifyUser}>
                            <div className="my-3">
                                <input type="text"
                                    onChange={(e) => { setFirstName(e.target.value); setEmptyFirstNameBox(false) }}
                                    className={emptyFirstNameBox ? "form-control is-invalid" : "form-control"} id="firstName" placeholder="first name" />
                            </div>
                            <div className="my-3">
                                <input type="text"
                                    onChange={(e) => { setLastName(e.target.value); setEmptyLastNameBox(false) }}
                                    className={emptyLastNameBox ? "form-control is-invalid" : "form-control"} id="lastName" placeholder="last name" />
                            </div>
                            <div className="my-3">
                                <input type="text"
                                    onChange={(e) => { setUsername(e.target.value); setEmptyUserBox(false) }}
                                    className={emptyUserBox ? "form-control is-invalid" : "form-control"}
                                    id="username" placeholder="username" />
                            </div>
                            <div className="my-3">
                                <input type="password"
                                    onChange={(e) => { setPassword(e.target.value); setEmptyPasswordBox(false) }}
                                    className={emptyPasswordBox ? "form-control is-invalid" : "form-control"}
                                    id="password" placeholder="password" />
                            </div>
                            <div className="my-3">
                                <input type="text"
                                    onChange={(e) => { setAddress(e.target.value); setEmptyAddressBox(false) }}
                                    className={emptyAddressBox ? "form-control is-invalid" : "form-control"}
                                    id="address" placeholder="address" />
                            </div>
                            <button type="submit" className="btn btn-primary button-color col-8 offset-2">Register</button>
                        </form>
                        <button className="btn btn-link btn-sm button-link-color" onClick={goToLogin}>Already have an account? Go to Login</button>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <VerifyAddress retryRegister={retryRegister} loginNewUser={loginNewUser} user={newUser} />
        )
    }
}