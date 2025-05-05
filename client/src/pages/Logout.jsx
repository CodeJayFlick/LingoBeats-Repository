import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { API_BASE_URL } from "../config"; // Importing the API base URL

function Logout() {
    const navigate = useNavigate(); // For navigation to other pages

    useEffect(() => {
        localStorage.removeItem("token"); // Remove token from local storage
        localStorage.removeItem("username"); // Remove username from local storage
        navigate("/"); // Redirect to login page
    }, [navigate]);

    return null;
}

export default Logout;