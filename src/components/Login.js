import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

export default function Login(props) {



    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [failedLogin, setFailedLogin] = useState(false)
    const [emptyUserBox, setEmptyUserBox] = useState(false)
    const [emptyPasswordBox, setEmptyPasswordBox] = useState(false)

    const navigate = useNavigate();

    // if (props.loggedIn) {
    //     navigate('/')
    // }

    const goToRegister = () => {
        navigate('/register')
    }

    const tryLogin = async (e) => {
        e.preventDefault()

        if (!username || !password) {
            setFailedLogin(true)
            !username ? setEmptyUserBox(true) : setEmptyUserBox(false)
            !password ? setEmptyPasswordBox(true) : setEmptyPasswordBox(false)
        } else {

            try {
                const body = { username, password }
                console.log(JSON.stringify(body))
                fetch("http://localhost:8080/login", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                })
                    .then(response => response.json())
                    .then(res => {
                        if (res) {
                            props.login(res)
                            navigate('/')
                        }
                    })
            } catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <div className="d-flex justify-content-center align-items mt-5">
            <div className="card col-12 col-lg-4 mt-4 primary-border">
                {/* <img src="https://images.unsplash.com/photo-1527977966376-1c8408f9f108?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" className="card-img-top" /> */}
                <div className="card-body d-flex flex-column card-color-md">
                    {failedLogin && <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        Incorrect username or password
                        <button onClick={(e) => setFailedLogin(false)} type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>}
                    <h5 className="fs-2 mb-3 card-title card-text text-center">Login to Drone Drop Delivery</h5>
                    <form className="py-2 px-3 d-flex flex-column" onSubmit={tryLogin}>
                        <div className="my-3">
                            <input onChange={(e) => { setUsername(e.target.value); setEmptyUserBox(false) }}
                                type="text"
                                className={emptyUserBox ? 'is-invalid form-control' : 'form-control'} id="username" placeholder="username" />
                        </div>
                        <div className="my-3">
                            <input className={emptyPasswordBox ? 'is-invalid form-control' : 'form-control'}
                                onChange={(e) => { setPassword(e.target.value); setEmptyPasswordBox(false) }} type="password" id="password" placeholder="password" />
                        </div>
                        <button type="submit" className="btn offset-2 col-8 btn-primary button-color">Login</button>
                        <button className="btn button-link-color btn-sm btn-link" onClick={goToRegister}>No account? Register here</button>
                    </form>

                </div>
            </div>
        </div>
    )
}