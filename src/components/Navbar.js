import React from 'react'
import { useNavigate } from 'react-router-dom'
import UserMap from './UserMap';

export default function Navbar(props) {

    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault()
        navigate(e.target.name)
    }

    const logout = (e) => {
        e.preventDefault()
        navigate("/login")
        props.logout();
    }

    const goToProfile = (e) => {
        e.preventDefault()
        navigate("/profile", { state: { user: props.user } })
    }

    if (!props.isLoggedIn) {
        return (
            <nav className="navbar navbar-expand-lg sticky-top nav-color border-bottom nav-border-color">
                <div className="container-fluid">
                    <a className="navbar-brand fw-bold nav-logo" name="/" onClick={handleClick} href='#' >Drone Drop Delivery</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link nav-logo fw-bold" name="/login" onClick={handleClick} aria-current="page" href="#">Login</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link nav-logo fw-bold" name="/register" onClick={handleClick} href="#">Register</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }

    if (props.isLoggedIn) {
        return (
            <nav className="navbar navbar-expand-lg nav-color sticky-top border-bottom nav-border-color">
                <div className="container-fluid">
                    <a className="navbar-brand fw-bold nav-logo" name="/" onClick={handleClick} href='#' >Drone Drop Delivery</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link fw-bold nav-logo" name="/" onClick={handleClick} aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link fw-bold nav-logo" name="/profile" onClick={goToProfile} href="#">Profile</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link fw-bold nav-logo" onClick={logout} name="/login" href="#">Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}