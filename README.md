# Recipe Generator  

## Introduction  

The Recipe Generator is a web application that allows users to find recipes based on selected ingredients and dietary preferences. It fetches recipes from an API and displays them in a dynamic UI. Users can expand/collapse the recipe cards to view detailed cooking steps.  

## Features  

* Select ingredients from a predefined list.  
* Choose dietary preferences (e.g., Vegetarian, Vegan, Keto, etc.)  
* Fetch recipes from the backend  
* Display recipes as cards with images, difficulty level, cooking time, and ingredients  
* Expand/collapse cards to show or hide cooking steps  
* Transparent background with a fixed image to enhance UI aesthetics  

## Tech Stack  

* Frontend: React (JSX, Tailwind CSS)  
* Backend: Node.js, Express.js  
* Database: MongoDB  
* HTTP Client: Axios  
* Installation & Setup  

## Prerequisites  

Make sure you have the following installed:    

* Node.js (v14 or later)  
* npm or yarn  
* MongoDB (if running locally)  

## Clone the Repository  

```git clone https://github.com/yourusername/recipe-generator.git  
cd recipe-generator```  

### Install Dependencies  

```npm install```

### Start the Frontend

```npm run dev```

### Start the Backend  

Navigate to the backend folder:  

```cd backend
npm install
npm start```