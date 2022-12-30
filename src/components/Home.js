import React, { useState, useEffect } from "react";
import UserMap from './UserMap'

export default function Home(props) {

    console.log("HOME" + props.user.username)

    return (
        <UserMap user={props.user} allUsers={props.allUsers} />
    )

}