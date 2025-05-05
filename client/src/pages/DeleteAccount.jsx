import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config"; // Importing the API base URL

function DeleteAccount() {
    const navigate = useNavigate(); // For navigation to other pages
    const [error, setError] = React.useState("");
    const [success, setSuccess] = React.useState("");
    const token = localStorage.getItem("token"); // Get the token from local storage

    const handleDelete = async () => {
        const confirmDeletion = window.confirm(
            "Are you sure you want to delete your account? Once your account is deleted, it cannot be undone."
        );
        if (!confirmDeletion) return;

        try {
            const res = await fetch(`${API_BASE_URL}/profile/delete`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });

            const data = await res.json();
            if (res.ok) {
                localStorage.removeItem("token"); // Remove token from local storage
                setSuccess("Your account has been successfully deleted.");
                setTimeout(() => navigate('/signup'), 2000); // Redirect to signup page in 2 seconds
            } else {
                setError(data.error || "Failed to delete account.");
            }
        } catch (error) {
            console.error("[ERROR] Failed to delete account:", error);
            setError("An error occurred while deleting the account. Please try again.");               
        }
    };
    
    return (
        <div classname="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
            <h2 classname="text-xl font-bold mb-4">Delete Account Here</h2>
            {error && <p classname="text-red-500 mb-2">{error}</p>}
            {success && <p classname="text-green-500 mb-2">{success}</p>}
            <button
                classname="big-red-500 text-white font-semibold px-6 py-2 rounded hover:bg-red-700"
                onClick={handleDelete}
            >
                Permanently Delete Account
            </button>
        </div>
    );
}

export default DeleteAccount;