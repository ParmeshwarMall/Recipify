import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Home = () => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [dietaryPreference, setDietaryPreference] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedId, setExpandedId] = useState(null);

  const ingredientsList = [
    "Tomato",
    "Onion",
    "Garlic",
    "Chicken",
    "Paneer",
    "Egg",
    "Carrot",
    "Butter",
    "Cream",
    "Garam Masala",
    "Ginger",
    "Bell Peppers",
    "Yogrut",
    "Turmeric",
    "Basmati Rice",
    "Mint",
    "Potato",
    "Cauliflower",
    "Coriander",
    "Curry Leaves",
    "Spinach",
    "Peas",
    "Kidney Beans",
    "Curry Leaves",
    "Khoya",
    "Sugar",
  ];
  const dietaryOptions = ["None", "Vegetarian", "Non-Vegetarian"];

  const handleIngredientChange = (e) => {
    const value = e.target.value;
    if (value && !selectedIngredients.includes(value)) {
      setSelectedIngredients([...selectedIngredients, value]);
    }
  };

  const handleRemoveIngredient = (ingredient) => {
    setSelectedIngredients(
      selectedIngredients.filter((item) => item !== ingredient)
    );
  };

  const getRecipes = async () => {
    if (selectedIngredients.length === 0) {
      toast.info("Please select at least one ingredient.", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    setLoading(true);
    const toastId = toast.info("Fetching recipe...", {
      autoClose: false,
      position: "top-center",
    });
    try {
      const response = await axios.post(
        "https://recipe-backend-qja7.onrender.com/recipe",
        {
          ingredients: selectedIngredients,
          dietary: dietaryPreference,
        }
      );
      toast.update(toastId, {
        render: "Recipe shown below!",
        autoClose: 2000,
        isLoading: false,
        type: "success",
      });
      setRecipes(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      toast.update(toastId, {
        render: "Failed to fetch recipe. Try again!",
        autoClose: 2000,
        isLoading: false,
        type: "error",
      });
    }
    setLoading(false);
  };

  const handleExpandClick = (index) => {
    setExpandedId(expandedId === index ? null : index);
  };

  return (
    <div className="w-screen min-h-screen flex flex-col items-center">
      {/* Hero Section (Full Screen) */}
      <div
        className="w-full h-screen flex flex-col justify-center items-center text-white bg-cover bg-center bg-fixed bg-no-repeat relative"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-photo/wooden-board-empty-table-top-blurred-background_1253-1584.jpg?t=st=1741179856~exp=1741183456~hmac=cd632d45fc97342e7920d6e4f725ec84984803d208ca409afd7c4f7c34964390&w=1380')",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Form Card */}
        <div className="relative z-10 backdrop-blur-md bg-white/20 border border-white/30 p-8 rounded-2xl shadow-lg w-full max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-center mb-4">
          Find Your Perfect Recipe!
          </h1>

          {/* Ingredient Selection */}
          <div className="mb-4">
            <label className="block text-lg mb-1">Select Ingredients:</label>
            <select
              className="w-full p-2 border rounded bg-gray-700 text-white"
              onChange={handleIngredientChange}
              defaultValue=""
            >
              <option value="" disabled>
                Select an ingredient
              </option>
              {ingredientsList.map((ingredient, index) => (
                <option key={index} value={ingredient}>
                  {ingredient}
                </option>
              ))}
            </select>

            {/* Selected Ingredients */}
            <div className="mt-2 flex flex-wrap gap-2">
              {selectedIngredients.map((ingredient, index) => (
                <span
                  key={index}
                  className="bg-green-500 text-sm px-2 py-1 rounded cursor-pointer"
                  onClick={() => handleRemoveIngredient(ingredient)}
                >
                  {ingredient} ✖
                </span>
              ))}
            </div>
          </div>

          {/* Dietary Preferences */}
          <div className="mb-4">
            <label className="block text-lg mb-1">Dietary Preference: (optional)</label>
            <select
              className="w-full p-2 border rounded bg-gray-700 text-white"
              onChange={(e) => setDietaryPreference(e.target.value)}
              value={dietaryPreference}
            >
              {dietaryOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Fetch Recipes Button (Centered) */}
          <div className="flex justify-center">
            <button
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition w-full max-w-[200px]"
              onClick={getRecipes}
              disabled={loading}
            >
              {loading ? "Fetching..." : "Get Recipes"}
            </button>
          </div>
        </div>
      </div>

      {/* Recipe Results Section */}
      {recipes.length > 0 && (
        <div
          className="w-full min-h-screen py-10 px-5 bg-transparent backdrop-blur-2xl "
          style={{
            backgroundImage:
              "url('https://img.freepik.com/free-photo/wooden-board-empty-table-top-blurred-background_1253-1584.jpg?t=st=1741179856~exp=1741183456~hmac=cd632d45fc97342e7920d6e4f725ec84984803d208ca409afd7c4f7c34964390&w=1380')",
            backgroundAttachment: "fixed", // Fixed background
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="backdrop-blur-md bg-white/20 border border-white/30 p-8 rounded-2xl shadow-lg">
            <h2 className="text-4xl font-bold text-center mb-8 text-[#f9fbf5]">
              Your Recipes
            </h2>

            <div className="w-3/3 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe, index) => (
                <div
                  key={index}
                  className={`bg-white shadow-lg rounded-xl overflow-hidden transition-all duration-300 ${
                    expandedId === index ? "h-auto" : "h-[490px]"
                  }`}
                >
                  {/* Recipe Name */}
                  <h3 className="text-xl font-semibold text-center bg-gray-200 py-2">
                    {recipe.name}
                  </h3>

                  {/* Recipe Image */}
                  <div className="h-[260px] w-full overflow-hidden">
                    <img
                      src={recipe.imageUrl}
                      alt={recipe.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Recipe Info */}
                  <div className="p-4">
                    <p>
                      <strong>Difficulty:</strong> {recipe.difficulty} |{" "}
                      <strong>Time:</strong> {recipe.cookingTime} mins
                    </p>
                    <div>
                      <span>
                        <strong>Required Ingredients: </strong>
                      </span>
                      {recipe.ingredients.map((ing, key) => {
                        return (
                          <span key={key} className="text-gray-700">
                            {ing},{" "}
                          </span>
                        );
                      })}
                    </div>
                    <div>
                      <span>
                        <strong>Nutritions: </strong>
                      </span>
                      <span>Calories: {recipe.nutritionalInfo.calories}, </span>
                      <span>Protein: {recipe.nutritionalInfo.protein}, </span>
                      <span>Carbs: {recipe.nutritionalInfo.carbs}</span>
                    </div>

                    {/* Expand Button */}
                    <button
                      className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 transition"
                      onClick={() => handleExpandClick(index)}
                    >
                      {expandedId === index ? "Hide Steps" : "Show Steps"}
                    </button>

                    {/* Expandable Section (Cooking Steps) */}
                    <div
                      className={`transition-all duration-300 overflow-hidden ${
                        expandedId === index
                          ? "max-h-96 mt-3"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <p className="text-gray-600 p-3 bg-gray-50 rounded-md">
                        {recipe.instructions}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
