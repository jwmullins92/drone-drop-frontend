import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import UserMap from './UserMap'

export default function Home(props) {

    const [loading, setLoading] = useState(true);

    const location = useLocation();

    useEffect(() => {
        if (props.allUsers) {
            setLoading(false)
        }
    }, [props.allUsers])


    if (loading) {
        return (
            <h1>LOADING...</h1>
        )
    }
    return (
        <UserMap user={props.user} allUsers={props.allUsers} />
    )

}