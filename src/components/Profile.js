import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import MapVerifier from './MapVerifier'

export default function Profile(props) {

    const location = useLocation()

    let user = location.state.user.username ? location.state.user : props.user;

    return (
        <div>
            <MapVerifier longitude={user.longitude} latitude={user.latitude} anchor="bottom" />
            <div className="d-flex flex-column justify-content-start col-12 col-lg-8 offset-lg-2">
                <h2 className="mt-4 mb-4 text-center card-text fw-bold">Hi, {user.firstName}</h2>
                <ul className="list-group primary-border">
                    <li className="list-group-item card-text card-color-md d-flex justify-content-between"><b>Name:</b> <span>{user.firstName} {user.lastName}</span></li>
                    <li className="list-group-item card-text card-color-md d-flex justify-content-between"><b>Username:</b> <span>{user.username}</span></li>
                    <li className="list-group-item card-text card-color-md d-flex justify-content-between text-end"><b>Address:</b> <span>{user.address}</span></li>
                </ul>
            </div>
        </div>
    )

}