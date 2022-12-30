import React, { useState, useEffect } from "react";
import UserMap from './UserMap'

export default function Home(props) {

    return (
        <UserMap user={props.user} allUsers={props.allUsers} />
    )

}