import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

const Quiz = () => {
  const location = useLocation();
  const song = location.state || {}; // Get song data from Dashboard

  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [pastScores, setPastScores] = useState([]); // Simulate database storage
  const [quizData, setQuizData] = useState([]); // State for dynamic quiz data
  const passingScore = 70; // Define passing as 70%

  // Static quiz data for each song
  const quizDataCaballitoBlanco = [
    {
      question: "Translate 'blanco' from 'Caballito blanco':",
      options: ["White", "Black", "Blue", "Red"],
      answer: "White",
    },
    {
      question: "What does 'llévame' mean in 'llévame de aquí'?",
      options: ["Take me", "Leave me", "Show me", "Help me"],
      answer: "Take me",
    },
    {
      question: "Translate 'aquí' from 'llévame de aquí':",
      options: ["There", "Here", "Away", "Home"],
      answer: "Here",
    },
    {
      question: "What is 'pueblo' in English from 'mi pueblo'?",
      options: ["City", "Town", "Country", "House"],
      answer: "Town",
    },
    {
      question: "Translate 'nací' from 'donde yo nací':",
      options: ["I lived", "I was born", "I grew", "I stayed"],
      answer: "I was born",
    },
    {
      question: "What does 'tengo' mean in 'Tengo, tengo, tengo'?",
      options: ["I want", "I see", "I have", "I need"],
      answer: "I have",
    },
    {
      question: "Translate 'nada' from 'tú no tienes nada':",
      options: ["Something", "Everything", "Nothing", "Anything"],
      answer: "Nothing",
    },
    {
      question: "What is 'ovejas' in English from 'tres ovejas'?",
      options: ["Cows", "Sheep", "Horses", "Goats"],
      answer: "Sheep",
    },
    {
      question: "Translate 'cabaña' from 'en una cabaña':",
      options: ["Cabin", "Barn", "Field", "Cave"],
      answer: "Cabin",
    },
    {
      question: "What does 'leche' mean in 'una me da leche'?",
      options: ["Water", "Milk", "Juice", "Wine"],
      answer: "Milk",
    },
    {
      question: "Translate 'lana' from 'otra me da lana':",
      options: ["Wool", "Silk", "Cotton", "Leather"],
      answer: "Wool",
    },
    {
      question: "What is 'mantequilla' in English from 'otra mantequilla'?",
      options: ["Cheese", "Butter", "Bread", "Meat"],
      answer: "Butter",
    },
  ];

  const quizDataTingalayo = [
    {
      question: "Translate 'ven' from 'Tingalayo! Ven, mi burrito, ven':",
      options: ["Come", "Go", "Stay", "Run"],
      answer: "Come",
    },
    {
      question: "What does 'burrito' mean in 'mi burrito, ven'?",
      options: ["Horse", "Donkey", "Dog", "Cat"],
      answer: "Donkey",
    },
    {
      question: "Translate 'mi' from 'mi burrito, ven':",
      options: ["Your", "His", "My", "Their"],
      answer: "My",
    },
    {
      question: "What does 'sí' mean in 'Burrito sí! Burrito no!'?",
      options: ["Yes", "No", "Maybe", "Always"],
      answer: "Yes",
    },
    {
      question: "Translate 'no' from 'Burrito sí! Burrito no!'?",
      options: ["Yes", "No", "Sometimes", "Never"],
      answer: "No",
    },
    {
      question: "What is 'come' in English from 'Burrito come con un tenedor'?",
      options: ["Runs", "Eats", "Sleeps", "Dances"],
      answer: "Eats",
    },
    {
      question: "Translate 'con' from 'come con un tenedor':",
      options: ["With", "Without", "On", "Under"],
      answer: "With",
    },
    {
      question: "What does 'tenedor' mean in 'con un tenedor'?",
      options: ["Spoon", "Fork", "Knife", "Plate"],
      answer: "Fork",
    },
    {
      question: "Translate 'baila' from 'Burrito baila con un matador':",
      options: ["Sings", "Dances", "Walks", "Jumps"],
      answer: "Dances",
    },
    {
      question: "What is 'matador' in English from 'baila con un matador'?",
      options: ["Bullfighter", "Teacher", "Singer", "Dancer"],
      answer: "Bullfighter",
    },
    {
      question: "Translate 'un' from 'con un tenedor':",
      options: ["A/An", "The", "Some", "Many"],
      answer: "A/An",
    },
  ];

  const quizDataMamacita = [
    {
      question: "Translate 'enloquecí' from 'Me enloquecí, buscaba aún así':",
      options: ["I went crazy", "I ran away", "I fell asleep", "I laughed"],
      answer: "I went crazy",
    },
    {
      question: "What does 'buscaba' mean in 'buscaba aún así'?",
      options: ["I was looking", "I was singing", "I was dancing", "I was waiting"],
      answer: "I was looking",
    },
    {
      question: "Translate 'conseguí' from 'y por fin te conseguí':",
      options: ["I lost", "I got", "I forgot", "I saw"],
      answer: "I got",
    },
    {
      question: "What does 'vi' mean in 'Desde que te vi'?",
      options: ["I heard", "I saw", "I touched", "I left"],
      answer: "I saw",
    },
    {
      question: "Translate 'corazón' from 'en mi corazón tú estás':",
      options: ["Mind", "Heart", "Soul", "Hand"],
      answer: "Heart",
    },
    {
      question: "What does 'estás' mean in 'tú estás'?",
      options: ["You are", "You go", "You want", "You see"],
      answer: "You are",
    },
    {
      question: "Translate 'quiero' from 'y ya no quiero a nadie más':",
      options: ["I need", "I want", "I have", "I know"],
      answer: "I want",
    },
    {
      question: "What does 'más' mean in 'a nadie más'?",
      options: ["Less", "More", "Again", "Never"],
      answer: "More",
    },
    {
      question: "Translate 'vámonos' from 'vámonos de fiesta':",
      options: ["Let’s stay", "Let’s go", "Let’s dance", "Let’s sing"],
      answer: "Let’s go",
    },
    {
      question: "What does 'fiesta' mean in 'vámonos de fiesta'?",
      options: ["Party", "Work", "School", "Trip"],
      answer: "Party",
    },
    {
      question: "Translate 'contigo' from 'Contigo bien quiero pasarla':",
      options: ["With you", "Without you", "For you", "About you"],
      answer: "With you",
    },
    {
      question: "What does 'pasarla' mean in 'quiero pasarla'?",
      options: ["To pass it", "To have a good time", "To leave it", "To find it"],
      answer: "To have a good time",
    },
  ];

  const quizDataALaLoco = [
    {
      question: "Translate 'siente' from 'Se siente cada vez':",
      options: ["Feels", "Sees", "Hears", "Knows"],
      answer: "Feels",
    },
    {
      question: "What does 'discoteca' mean in 'llego a la discoteca'?",
      options: ["School", "Disco", "Park", "Store"],
      answer: "Disco",
    },
    {
      question: "Translate 'vibra' from 'La vibra bien alta':",
      options: ["Vibe", "Sound", "Light", "Dance"],
      answer: "Vibe",
    },
    {
      question: "What does 'alta' mean in 'vibra bien alta'?",
      options: ["Low", "High", "Quiet", "Slow"],
      answer: "High",
    },
    {
      question: "Translate 'ambiente' from 'entrando en ambiente':",
      options: ["Room", "Mood", "Time", "Place"],
      answer: "Mood",
    },
    {
      question: "What does 'cuerpo' mean in 'Tu cuerpo y el mío'?",
      options: ["Mind", "Body", "Heart", "Soul"],
      answer: "Body",
    },
    {
      question: "Translate 'corriente' from 'Solo sigue la corriente':",
      options: ["Flow", "River", "Wind", "Path"],
      answer: "Flow",
    },
    {
      question: "What does 'bailemos' mean in 'Así que bailemos a lo loco'?",
      options: ["Let’s sing", "Let’s dance", "Let’s run", "Let’s talk"],
      answer: "Let’s dance",
    },
    {
      question: "Translate 'loco' from 'bailemos a lo loco':",
      options: ["Crazy", "Calm", "Fast", "Slow"],
      answer: "Crazy",
    },
    {
      question: "What does 'tragos' mean in 'Un par de tragos'?",
      options: ["Songs", "Drinks", "Steps", "Lights"],
      answer: "Drinks",
    },
    {
      question: "Translate 'desenfoco' from 'y me desenfoco':",
      options: ["I focus", "I’m out of focus", "I wake up", "I stop"],
      answer: "I’m out of focus",
    },
    {
      question: "What does 'party' mean in 'Esto es un party salvaje'?",
      options: ["Party", "Game", "Fight", "Trip"],
      answer: "Party",
    },
  ];

  const quizDataVuelaLibre = [
    {
      question: "Translate 'doy' from 'Yo te doy toda mi vida':",
      options: ["I give", "I take", "I see", "I want"],
      answer: "I give",
    },
    {
      question: "What does 'vida' mean in 'toda mi vida'?",
      options: ["Love", "Life", "Time", "Hope"],
      answer: "Life",
    },
    {
      question: "Translate 'sabes' from 'Sabes bien que soy tan tuyo':",
      options: ["You know", "You say", "You feel", "You think"],
      answer: "You know",
    },
    {
      question: "What does 'tuyo' mean in 'soy tan tuyo'?",
      options: ["Mine", "Yours", "Ours", "Theirs"],
      answer: "Yours",
    },
    {
      question: "Translate 'muera' from 'hasta que un día me muera':",
      options: ["I live", "I die", "I leave", "I stay"],
      answer: "I die",
    },
    {
      question: "What does 'engañarme' mean in 'al engañarme'?",
      options: ["To help me", "To deceive me", "To find me", "To love me"],
      answer: "To deceive me",
    },
    {
      question: "Translate 'castigo' from 'Dios te dé un castigo':",
      options: ["Gift", "Punishment", "Blessing", "Reward"],
      answer: "Punishment",
    },
    {
      question: "What does 'iré' mean in 'Me iré, pues tú lo has querido'?",
      options: ["I’ll stay", "I’ll go", "I’ll wait", "I’ll cry"],
      answer: "I’ll go",
    },
    {
      question: "Translate 'ríes' from 'cómo te ríes':",
      options: ["You laugh", "You cry", "You run", "You dance"],
      answer: "You laugh",
    },
    {
      question: "What does 'esperanza' mean in 'la esperanza que yo he puesto en ti'?",
      options: ["Fear", "Hope", "Anger", "Dream"],
      answer: "Hope",
    },
    {
      question: "Translate 'creí' from 'todo lo que yo en ti creí':",
      options: ["I believed", "I forgot", "I saw", "I heard"],
      answer: "I believed",
    },
    {
      question: "What does 'vuela' mean in 've y vuela libre'?",
      options: ["Run", "Fly", "Sing", "Jump"],
      answer: "Fly",
    },
    {
      question: "Translate 'libre' from 'vuela libre':",
      options: ["Free", "Alone", "Fast", "Slow"],
      answer: "Free",
    },
  ];

  // Map song titles to their quiz data
  const quizDataMap = {
    "Caballito Blanco": quizDataCaballitoBlanco,
    "Tingalayo": quizDataTingalayo,
    "Mamacita": quizDataMamacita,
    "A La Loco": quizDataALaLoco,
    "Vuela Libre": quizDataVuelaLibre,
  };

  // Set quiz data based on the song title when the component mounts or song changes
  useEffect(() => {
    const selectedQuizData = quizDataMap[song.title] || [];
    setQuizData(selectedQuizData);
  }, [song.title]);

  const handleChange = (index, value) => {
    setUserAnswers({ ...userAnswers, [index]: value });
  };

  const handleSubmit = () => {
    let correctAnswers = 0;
    quizData.forEach((item, index) => {
      if (userAnswers[index] === item.answer) {
        correctAnswers++;
      }
    });
    const percentageScore = Math.round((correctAnswers / quizData.length) * 100);
    setScore(percentageScore);
    setPastScores((prev) => [...prev, percentageScore]); // Save score
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
          Quiz for "{song.title || "Unknown Song"}" by {song.artist || "Unknown Artist"}
        </h1>

        <p className="text-center mb-6">
          Answer these multiple-choice questions based on the lyrics!
        </p>

        {quizData.length > 0 ? (
          quizData.map((item, index) => (
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
          ))
        ) : (
          <p className="text-center">No quiz available for this song.</p>
        )}

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition mt-6"
          disabled={score !== null || quizData.length === 0}
        >
          Submit
        </button>

        {score !== null && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold">
              Your score: {score}% {score >= passingScore ? "(Passed)" : "(Failed)"}
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