// Author: Cody Franecki
// Creation Date: 2025-04-24
// Date of Revision: 2025-04-25
/* Description:
    This code is a React component for the Score Page of LingoBeats.
    The score page displays the user's quiz scores from all the attempts they
    had made from the quizzes. The page displays the average score of all 
    quiz attempts and the highest score of all attempts.
*/

import React, {useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Main function for the Score Page
function Score_Page() {
    const [quizzes, setQuizzes] = useState([]);
    const [error, setError] = useState('');
    const [averageScores, setAverageScores] = useState({});
    const [highestScores, setHighestScores] = useState({});
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if(!token) {
            navigate("/login"); // Redirects to login if no token is found
            return;
        }
        // Using a fetch request in order to retrieve the quiz scores from the server.
        fetch(`${API_BASE_URL}/scores`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.quizzes) setQuizzes(data.quizzes);
            if (data.totalAverage) setTotalAverage(data.totalAverage);     
        })
        .catch(err => {
            console.error("[ERROR} Failed to fetch quiz scores:", err);
            setError("Failed to fetch quiz scores. Try again later.");
        })
        .catch(err => {
            console.error("[ERROR} Failed to fetch quiz scores:", err);
            setError("Failed to fetch quiz scores. Try again later.");
        });
    }, [token, navigate]);

    return (
        <div style={{ padding: "20px" }}>
            <h2>Quiz Score Performance</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {quizzes.length === 0 && <p>No Quiz Data Available.</p>}
            {quizzes.map((quiz, index) => (
                <div key={index} style={{ marginBottom: "20px" }}>
                    <h3>{quiz.name}</h3>
                    <p><strong>Scores:</strong> {quiz.scores.join(', ')}</p>
                    <p><strong>Average:</strong> {quiz.averageScores}</p>
                    <p><strong>Highest Score:</strong> {quiz.highest}</p>
                </div>
            ))}
            {totalAverage !== null && (
                <div style={{ marginTop: "20px" }}>
                    <h3>Overall Average Score: {totalAverage}</h3>
                </div>
            )}
            <button onClick={() => navigate('/profile')}>Return to Profile</button>
        </div>
    );
}

export default Score_Page;