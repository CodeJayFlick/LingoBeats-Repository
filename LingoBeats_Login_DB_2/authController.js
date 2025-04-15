const bcrypt = require("bcryptjs");
const { connectToDB } = require("./db");

async function registerUser(username, password) {
  try {
    console.log("[DEBUG] Attempting to register user:", username); // Debug log

    // Validate input
    if (!username || !password) {
      throw new Error("Username and password are required");
    }

    const db = await connectToDB();
    const usersCollection = db.collection("users");
    const quizTemplate = [
      // Easy Quizzes (5)
      {
        name: "Caballito Blanco",
        difficulty: "easy",
        scores: [],
      },
      {
        name: "Tingalayo",
        difficulty: "easy",
        scores: [],
      },
      {
        name: "Cancion infantil de la lluvia para ninos y bebes",
        difficulty: "easy",
        scores: [],
      },
      {
        name: "Humpty Dumpty",
        difficulty: "easy",
        scores: [],
      },
      {
        name: "Un Elefante Se Balanceaba",
        difficulty: "easy",
        scores: [],
      },

      // Medium Quizzes (5)
      {
        name: "De Colores",
        difficulty: "medium",
        scores: [],
      },
      {
        name: "El Barquito Chiquitito",
        difficulty: "medium",
        scores: [],
      },
      {
        name: "La Gallina Turuleca",
        difficulty: "medium",
        scores: [],
      },
      {
        name: "Mambru Se Fue A La Guerra",
        difficulty: "medium",
        scores: [],
      },
      {
        name: "Mi Burrito Sabanero",
        difficulty: "medium",
        scores: [],
      },

      // Hard Quizzes (5)
      {
        name: "A La Loco",
        difficulty: "hard",
        scores: [],
      },
      {
        name: "Vuela Libre",
        difficulty: "hard",
        scores: [],
      },
      {
        name: "Enloquecer",
        difficulty: "hard",
        scores: [],
      },
      {
        name: "Mamacita",
        difficulty: "hard",
        scores: [],
      },
      {
        name: "La Mar Estaba Serena",
        difficulty: "hard",
        scores: [],
      },
    ];
    console.log("[DEBUG] Checking for existing user..."); // Debug log
    const existingUser = await usersCollection.findOne({ username });
    if (existingUser) {
      throw new Error("Username already exists");
    }

    console.log("[DEBUG] Hashing password..."); // Debug log
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      username,
      password: hashedPassword,
      quizzes: quizTemplate, // Store all quizzes with empty scores
      createdAt: new Date(),
    };

    console.log("[DEBUG] Inserting new user..."); // Debug log
    const result = await usersCollection.insertOne(newUser);

    console.log("[DEBUG] User registered successfully"); // Debug log
    return {
      userId: result.insertedId,
      username,
    };
  } catch (error) {
    console.error("[ERROR] Registration failed:", error.message); // Detailed error log
    throw error; // Re-throw for route handling
  }
}
async function updateQuizScore(userId, quizName, newScore) {
  const db = await connectToDB();
  const usersCollection = db.collection("users");

  // Get current user data
  const user = await usersCollection.findOne({ _id: new ObjectId(userId) });

  // Find the quiz and update scores
  const updatedQuizzes = user.quizzes.map((quiz) => {
    if (quiz.name === quizName) {
      // Keep only the last 9 scores and add the new one
      const updatedScores = [...quiz.scores.slice(-9), newScore];
      return { ...quiz, scores: updatedScores };
    }
    return quiz;
  });

  // Update in database
  await usersCollection.updateOne(
    { _id: new ObjectId(userId) },
    { $set: { quizzes: updatedQuizzes } }
  );
}
async function loginUser(username, password) {
  try {
    console.log("[DEBUG] Attempting login for user:", username); // Debug log

    const db = await connectToDB();
    const usersCollection = db.collection("users");

    console.log("[DEBUG] Finding user in DB..."); // Debug log
    const user = await usersCollection.findOne({ username });
    if (!user) {
      throw new Error("User not found");
    }

    console.log("[DEBUG] Comparing passwords..."); // Debug log
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    console.log("[DEBUG] Login successful"); // Debug log
    return {
      userId: user._id,
      username: user.username,
    };
  } catch (error) {
    console.error("[ERROR] Login failed:", error.message); // Detailed error log
    throw error; // Re-throw for route handling
  }
}
module.exports = {
  registerUser,
  loginUser,
  updateQuizScore, // Add this
};
