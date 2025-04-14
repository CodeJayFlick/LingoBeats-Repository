import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { API_BASE_URL } from "../config";

const Quiz = () => {
  const location = useLocation();
  const song = location.state || {}; // Get song data from Dashboard

  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [pastScores, setPastScores] = useState([]);
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const passingScore = 70;

  // Fetch quiz data from backend
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!song.title) {
          setQuizData([]);
          setLoading(false);
          return;
        }

        const response = await fetch(
          `${API_BASE_URL}/auth/quiz/${encodeURIComponent(song.title)}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch quiz data");
        }

        const data = await response.json();

        if (data && data.quiz) {
          setQuizData(data.quiz);
        } else {
          setQuizData([]);
        }
      } catch (err) {
        console.error("Error fetching quiz data:", err);
        setError("Failed to load quiz. Please try again later.");
        setQuizData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [song.title]);

  const handleChange = (index, value) => {
    setUserAnswers({ ...userAnswers, [index]: value });
  };

  const handleSubmit = async () => {
    let correctAnswers = 0;
    quizData.forEach((item, index) => {
      if (userAnswers[index] === item.answer) {
        correctAnswers++;
      }
    });
    const percentageScore = Math.round(
      (correctAnswers / quizData.length) * 100
    );
    setScore(percentageScore);
    setPastScores((prev) => [...prev, percentageScore]);

    // Save score to backend if user is logged in
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await fetch(`${API_BASE_URL}/auth/quiz/update-score`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            quizName: song.title,
            newScore: percentageScore,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to save score");
        }
      }
    } catch (err) {
      console.error("Error saving score:", err);
    }
  };

  const handleRetake = () => {
    setUserAnswers({});
    setScore(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 p-8 relative">
      {/* Dashboard Button at Top-Left */}
      <div className="absolute top-4 left-4">
        <Link to="/dashboard">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
            Dashboard
          </button>
        </Link>
      </div>

      {/* Main Quiz Content */}
      <div className="max-w-6xl mx-auto text-white">
        <h1 className="text-3xl font-bold text-center mb-8">
          Quiz for "{song.title || "Unknown Song"}" by{" "}
          {song.artist || "Unknown Artist"}
        </h1>

        {loading ? (
          <p className="text-center">Loading quiz...</p>
        ) : error ? (
          <p className="text-center text-red-300">{error}</p>
        ) : quizData.length > 0 ? (
          <>
            <p className="text-center mb-6">
              Answer these multiple-choice questions based on the lyrics!
            </p>

            {quizData.map((item, index) => (
              <div key={index} className="mb-6">
                <p className="text-lg">{item.question}</p>
                <div className="mt-2 space-y-2">
                  {item.options.map((option, optIndex) => (
                    <label key={optIndex} className="flex items-center">
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={option}
                        checked={userAnswers[index] === option}
                        onChange={() => handleChange(index, option)}
                        className="mr-2"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition mt-6"
              disabled={score !== null || quizData.length === 0}
            >
              Submit
            </button>
          </>
        ) : (
          <p className="text-center">No quiz available for this song.</p>
        )}

        {score !== null && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold">
              Your score: {score}%{" "}
              {score >= passingScore ? "(Passed)" : "(Failed)"}
            </h2>
            {(score < passingScore || score < 100) && (
              <button
                onClick={handleRetake}
                className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition mt-4"
              >
                Retake Quiz
              </button>
            )}
            {pastScores.length > 1 && (
              <div className="mt-4">
                <h3 className="text-xl font-bold">Past Scores:</h3>
                <ul className="list-disc pl-6">
                  {pastScores.slice(0, -1).map((pastScore, idx) => (
                    <li key={idx}>{pastScore}%</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
