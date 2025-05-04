import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Quiz = () => {
  const location = useLocation();
  const song = location.state || {};

  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [pastScores, setPastScores] = useState([]);
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const passingScore = 70;

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
          `/api/auth/quiz/${encodeURIComponent(song.title)}`
        );

        if (!response.ok) throw new Error("Failed to fetch quiz data");

        const data = await response.json();
        setQuizData(data?.quiz || []);
      } catch (err) {
        console.error("Error fetching quiz data:", err);
        setError("Oops! We couldn’t load your quiz. Try again soon.");
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
      if (userAnswers[index] === item.answer) correctAnswers++;
    });

    const percentageScore = Math.round(
      (correctAnswers / quizData.length) * 100
    );

    setScore(percentageScore);
    setPastScores((prev) => [...prev, percentageScore]);

    try {
      const token = localStorage.getItem("token");
      if (token) {
        await fetch(`/api/auth/quiz/update-score`, {
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
      }
    } catch (err) {
      console.error("Error saving score:", err);
    }
  };

  const handleRetake = () => {
    setUserAnswers({});
    setScore(null);
  };

  const answeredCount = Object.keys(userAnswers).length;
  const totalQuestions = quizData.length;
  const progressPercent =
    totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 to-indigo-800 text-white p-6">
      {/* Dashboard Button */}
      <div className="absolute top-4 left-4 z-50">
        <Link to="/dashboard">
          <button className="bg-white text-indigo-600 px-4 py-2 rounded-xl shadow hover:bg-gray-100 transition">
            ← Back to Dashboard
          </button>
        </Link>
      </div>

      <div className="max-w-4xl mx-auto mt-12 bg-purple-500 text-black rounded-3xl shadow-xl p-8 relative">
        {/* Sticky Header with Light Purple Background */}
        <div className="sticky top-0 bg-purple-500 py-4 z-10 shadow-md">
          <h1 className="text-3xl font-bold text-center text-white mb-3">
            🎵 Quiz: "{song.title || "Unknown"}" by {song.artist || "Unknown"}
          </h1>

          {quizData.length > 0 && score === null && (
            <div className="w-full px-6">
              <div className="bg-gray-600 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-green-500 h-full transition-all duration-300 ease-in-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="text-center mt-1 text-sm text-white">
                {progressPercent}% completed
              </p>
            </div>
          )}
        </div>

        {loading ? (
          <p className="text-center animate-pulse">Loading your quiz...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : quizData.length > 0 ? (
          <>
            <p className="text-center text-lg mb-6">
              Answer the questions below! 🎤✨
            </p>

            <div className="space-y-8">
              {quizData.map((item, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-xl shadow">
                  <p className="font-semibold mb-3">{item.question}</p>
                  <div className="space-y-2">
                    {item.options.map((option, optIndex) => (
                      <label
                        key={optIndex}
                        className={`block p-2 rounded-md cursor-pointer transition ${
                          userAnswers[index] === option
                            ? "bg-blue-600 text-white font-semibold"
                            : "hover:bg-indigo-600/40"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${index}`}
                          value={option}
                          checked={userAnswers[index] === option}
                          onChange={() => handleChange(index, option)}
                          className="hidden"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <button
                onClick={handleSubmit}
                className="bg-green-500 text-white font-bold py-3 px-6 rounded-xl hover:bg-green-600 transition disabled:opacity-50"
                disabled={score !== null}
              >
                🚀 Submit Quiz
              </button>
            </div>
          </>
        ) : (
          <p className="text-center">No quiz data available for this song.</p>
        )}
        {/*Author: Will Gallagher:
           Added Circular Progress Bar to score readout
           imported from react-circular-progressbar if unable to run do
           npm install --save react-circular-progressbar
           also refactored score text to appear to the side of the wheel*/}
        {score !== null && (
          <div className="mt-10 text-center">
            <div className="flex items-center justify-center gap-6">
              <div className="w-20 h-20">
                <CircularProgressbar
                  value={score}
                  text={`${score}%`}
                  styles={buildStyles({
                    textColor: "#fff",
                    pathColor: "#22c55e", //Soft Green
                    trailColor: "#ef4444", //Red Trail to show incorrect percent
                    textSize: "12x",
                    strokeLinecap: "round",
                  })}
                />
              </div>

              <div classname="text-left">
                <h2
                  className={`text-2xl font-bold ${
                    score >= passingScore ? "text-green-400" : "text-red-400"
                  }`}
                >
                  Your Score: {score}%{" "}
                  {score >= passingScore ? "🎉 You passed!" : "❌ Try again!"}
                </h2>

                {(score < passingScore || score < 100) && (
                  <button
                    onClick={handleRetake}
                    className="mt-4 bg-yellow-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-yellow-600 transition"
                  >
                    🔁 Retake Quiz
                  </button>
                )}
              </div>
            </div>

            {pastScores.length > 1 && (
              <div className="mt-6 text-left">
                <h3 className="text-xl font-semibold mb-2">📊 Past Scores:</h3>
                <ul className="list-disc list-inside space-y-1">
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
