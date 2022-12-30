import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Navbar(props) {

    const changeView = () => {
        props.changeView(props.user.longitude, props.user.latitude)
    }

    return (
        <div className="card col-12 col-lg-6 mb-2 primary-border">
            <h5 className="card-header text-light  card-color-dark">{props.user.username}</h5>
            <div className="card-body">
                <h5 className="card-title">{props.user.firstName} {props.user.lastName}</h5>
                <p className="card-text">{props.user.address}</p>
                <button onClick={changeView} className="btn btn-link btn-sm button-link-color">Show me</button>
            </div>
        </div>
    );
}