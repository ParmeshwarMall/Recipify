const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "https://ingrecipe.netlify.app", credentials: true }));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const RecipeSchema = mongoose.Schema({
  name: String,
  ingredients: [String],
  instructions: String,
  dietary: String, // e.g., ["vegetarian", "gluten-free"]
  difficulty: String, // easy, medium, hard
  cookingTime: Number, // in minutes
  nutritionalInfo: {
    calories: Number,
    protein: Number,
    carbs: Number,
  },
  imageUrl: String,
});

const Recipe = mongoose.model("Recipe", RecipeSchema);

app.post("/recipe", async (req, res) => {
  try {
    const { ingredients, dietary } = req.body;

    let recipes;
    if (dietary && dietary !== "None") {
      recipes = await Recipe.find({ dietary: dietary.toLowerCase() });
    } else {
      recipes = await Recipe.find();
    }

    const scoredRecipes = recipes
      .map((recipe) => {
        const recipeIngredient = new Set(recipe.ingredients);
        let matchCount = 0;

        for (let i = 0; i < ingredients.length; i++) {
          if (recipeIngredient.has(ingredients[i])) {
            matchCount++;
          }
        }

        const missingCount = recipe.ingredients.length - matchCount;
        const diff = missingCount - matchCount;

        if (matchCount > 0) {
          return { ...recipe._doc, diff }; // Assuming recipe itself is an object
        }
        return null; // Mark as null to filter out later
      })
      .filter((recipe) => recipe !== null); // Remove null values

    const sortedRecipes = scoredRecipes.sort((a, b) => a.diff - b.diff);

    res.json(sortedRecipes.slice(0, 4));
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(8000, () => console.log("Server running on port 8000"));
