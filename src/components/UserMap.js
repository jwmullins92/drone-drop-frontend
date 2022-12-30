import React, { useRef, useEffect, useState, useCallback } from 'react';
import Map, { Marker, MapRef } from 'react-map-gl';
import { useNavigate } from 'react-router';
import UserCard from './UserCard'
import mapboxgl from 'mapbox-gl'

export default function UserMap(props) {

    const [showPopup, setShowPopup] = React.useState(false);
    const [users, setUsers] = React.useState(props.allUsers);

    const map = useRef(null);
    const mapContainer = useRef(null)

    const navigate = useNavigate()

    const [viewState, setViewState] = React.useState({
        longitude: props.user.longitude,
        latitude: props.user.latitude,
        zoom: 7,
        attributionControl: false,
    });

    // useEffect(() => {
    //     if (map.current) return; // initialize map only once
    //     console.log("setting map")
    //     map.current = new mapboxgl.Map({
    //         center: [props.user.longitude, props.user.latitude],
    //         zoom: 7,
    //         attributionControl: false,
    //         container: mapContainer.current,
    //         style: 'mapbox://styles/mapbox/streets-v12',
    //     });
    //     for (let user of users) {
    //         new mapboxgl.Marker().setLngLat([user.longitude, user.latitude]).addTo(map.current)
    //     }
    // });

    const handleMarkerClick = (user) => {
        navigate('/profile', { state: { user: user } })
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
                <Map
                    {...viewState}
                    onMove={evt => setViewState(evt.viewState)}
                    mapStyle="mapbox://styles/mapbox/streets-v12"
                >
                    {users && users.map(user => {
                        return <Marker onClick={() => handleMarkerClick(user)} key={user.username} longitude={user.longitude} latitude={user.latitude} anchor="center" />
                    })}
                </Map>
            </div>
            <div className="d-flex flex-column align-items-center">
                {users && users.map(user => {
                    return <UserCard key={user.username} user={user} changeView={changeView} />
                })}
            </div>
            {/* <div ref={mapContainer} className="map-container" /> */}
        </div>


    );
}