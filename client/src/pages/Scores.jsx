// Author: Cody Franecki & Will Gallagher
// Creation Date: 2025-04-24
// Date of Revision: 2025-05-05
/* Description:
    This code is a React component for the Score Page of LingoBeats.
    The score page displays the user's quiz scores from all the attempts they
    had made from the quizzes. The page displays the average score of all 
    quiz attempts and the highest score of all attempts.
*/

import React, {useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { API_BASE_URL } from "../config"; // Importing the API base URL
import songList from "../assets/songLists.json";

// Main function for the Score Page
export default function Scores() {
    const navigate = useNavigate(); // For navigation to other pages
    const [userScores, setUserScores] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");
    const [openStates, setOpenStates] = useState({}); //state of song card


    useEffect(() => {
        if(!token) {
            navigate("/login"); // Redirects to login if no token is found
            return;
        }
        fetchUserScores(token);
    }, [token, navigate]);

    //most of the following adapted from the dashboard page
    //refactored to play better with the wheels as well as leaving out unnecessary stuff

    const fetchUserScores = async (token) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/user/scores`, {
                headers: {
                    Authorization: `Bearer ${token}` ,
                },
            });
            const data = await response.json();
            setUserScores(data);
        } catch (error) {
            setError("Failed to fetch User Scores");
            console.error("Error fetching scores:", error);
        } finally {
            setLoading(false);
        }
    };

    const getScores = (title) => {
        const quiz = userScores?.find((q) => q.name === title);
        return quiz?.scores || [];
    };
    //reduction of prev. used calculation metrics in dashboard
    //because only numerical is needed, no longer returning -
    const calculateAverage = (scores) =>
        scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b) / scores.length) : 0;

    const findHighest = (scores) =>
        scores.length > 0 ? Math.max(...scores) : 0;

    const getRecent = (scores) =>
        scores.length > 0 ? scores[scores.length - 1] : 0;

    //state toggle for song dropdown
    const toggleCard = (title) => {
        setOpenStates((prev) => ({ ...prev, [title]: !prev[title] }));
    };
    //modular "parent class" of progress wheel update from quiz page
    //adapted from modular song card on dashboard
    const ScoreCircle = ({ label, value, color }) => (
        <div className="flex flex-col items-center">
            <div className="w-20 h-20">
                <CircularProgressbar
                    value={value}
                    text={`${value}%`}
                    styles={buildStyles({
                        textColor: "#000",
                        pathColor: color,
                        trailColor: "#e4e4e4",
                        textSize: "12px",
                        strokeLinecap: "round",
                    })}
                />
            </div>
            <p className="text-sm mt-1 text-gray-700">{label}</p>
        </div>
    );
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-white">
                Loading...
            </div>
        );
    }
    //Special ASCII reference for later ▶ | ▼ | from https://www.alt-codes.net/
    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 p-8">
            <h1 className="text-3xl font-bold text-white text-center mb-8">Your Quiz Scores</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {["easy", "medium", "hard"].map((difficulty) => (
                    <div key={difficulty}>
                        <h2 className="text-2xl font-bold text-white mb-4 capitalize">{difficulty}</h2>
                        <div className="space-y-4">
                            {songList[difficulty].map((song) => {
                                const scores = getScores(song.title);
                                const average = calculateAverage(scores);
                                const highest = findHighest(scores);
                                const recent = getRecent(scores);
                                const open = openStates[song.title] || false;

                                return (
                                    <div
                                        key={song.title}
                                        className="bg-white rounded-2xl shadow-md p-4 cursor-pointer transition-all"
                                        onClick={() => toggleCard(song.title)}
                                    >
                                        <div className="flex justify-between items-center">
                                            <h3 className="font-bold text-gray-800">{song.title}</h3>
                                            <span className="text-blue-500 text-sm">
                        {open ? "▶ Hide" : "▼ Show"}
                      </span>
                                        </div>
                                        {open && (
                                            <div className="mt-4 space-y-2">
                                                <p className="text-gray-600">Artist: {song.artist}</p>
                                                <p className="text-gray-600">Length: {song.length}</p>
                                                <p className="text-gray-600">Scores: {scores.join(", ") || "-"}</p>

                                                <div className="flex justify-around mt-4">
                                                    <ScoreCircle label="Average" value={average} color="#22c55e" />
                                                    <ScoreCircle label="Highest" value={highest} color="#3b82f6" />
                                                    <ScoreCircle label="Recent" value={recent} color="#facc15" />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-8">
                <button
                    onClick={() => navigate("/profile")}
                    className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                    Go to Profile
                </button>
            </div>
        </div>
    );
}