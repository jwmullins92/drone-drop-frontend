import React, { useRef, useEffect, useState, useCallback } from 'react';
import ReactMapGL, { Marker, MapRef } from 'react-map-gl';
import { useNavigate } from 'react-router';
import UserCard from './UserCard'

export default function UserMap(props) {

    const [users, setUsers] = React.useState(props.allUsers);

    const navigate = useNavigate()

    const [viewState, setViewState] = React.useState({
        longitude: props.user.longitude,
        latitude: props.user.latitude,
        zoom: 7,
        attributionControl: false,
    });

    const handleMarkerClick = (user) => {
        navigate('/profile/' + user.username, { state: { user: user } })
    }

    const changeView = (longitude, latitude) => {
        setViewState({
            longitude: longitude,
            latitude: latitude,
            zoom: 15,
            attributionControl: false,
        })
    }



    return (
        <div>
            <div className="map-container mb-2">
                <ReactMapGL
                    {...viewState}
                    onMove={evt => setViewState(evt.viewState)}
                    mapStyle="mapbox://styles/mapbox/streets-v12"
                >
                    {users && users.map(user => {
                        return <Marker onClick={() => handleMarkerClick(user)} key={user.username} longitude={user.longitude} latitude={user.latitude} anchor="center" />
                    })}
                </ReactMapGL>
            </div>
            <div className="d-flex flex-column align-items-center">
                {users && users.map(user => {
                    return <UserCard key={user.username} user={user} changeView={changeView} />
                })}
            </div>
        </div>


    );
}