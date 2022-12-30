import React, { useRef, useEffect, useState } from 'react';
import { useNavigate, redirect } from 'react-router';
import MapVerifier from './MapVerifier'

export default function VerifyAddress(props) {

    const navigate = useNavigate()

    const confirmAndLogin = () => {
        props.loginNewUser()
        navigate("/")
    }

    const retryRegister = () => {
        props.retryRegister()
    }

    return (
        <div>
            <MapVerifier longitude={props.user.longitude} latitude={props.user.latitude} anchor="bottom" />
            <div className="d-flex flex-column justify-content-start align-items-center">
                <div className="col-12 col-lg-5">
                    <h2 className="mt-4 mb-4 text-center card-text fw-bold">Does this look correct to you?</h2>
                    <ul className="list-group list-group-flush mb-4 primary-border">
                        <li className="list-group-item card-text d-flex justify-content-between"><b>Name:</b> <span>{props.user.firstName} {props.user.lastName}</span></li>
                        <li className="list-group-item card-text d-flex justify-content-between"><b>Username:</b> <span>{props.user.username}</span></li>
                        <li className="list-group-item card-text  d-flex justify-content-between text-end"><b>Address:</b> <span>{props.user.address}</span></li>
                    </ul>
                </div>
                <button onClick={confirmAndLogin} className="btn button-color border border-light btn-primary mb-3">Looks good!</button>
                <button onClick={retryRegister} className="btn btn-link button-link-color">Something doesn't look right</button>
            </div>
        </div>

    );
}