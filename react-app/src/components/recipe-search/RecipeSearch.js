import React,{useEffect, useState} from 'react';
import Recipe from "./Recipe";
import './index.css'
const RecipeSearch = ({currentGrocery}) => {
const API_ID = process.env.REACT_APP_APP_ID;
const API_KEY = process.env.REACT_APP_APP_KEY;

const [recipes, setRecipes] = useState([]);
const [search, setSearch] = useState('');
const [query, setQuery] = useState('');
console.log(currentGrocery)
useEffect(()=>{
  setQuery(currentGrocery);
}, [query]);

useEffect(()=>{
  getRecipes();
}, [query]);

const getRecipes = async () => {
  const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${API_ID}&app_key=${API_KEY}`);
  const data = await response.json();
  setRecipes(data.hits);
  console.log(data.hits)
};

const updateSearch = e => {
  setSearch(e.target.value);
};

const getSearch = e => {
  e.preventDefault();
  setQuery(search);
  setSearch('');
}
  return(
    <div className="App">
      <h2>Recipe Search for: {currentGrocery}</h2>
      {/* <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch} />
        <button 
        className="search-button" 
        type="submit">Search</button>
      </form> */}
      <div className="recipes">
      {recipes.map(recipe => (
        <Recipe 
        key={recipe.recipe.label} 
        title={recipe.recipe.label} 
        calories={recipe.recipe.calories} 
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        source={recipe.recipe.source} 
        url={recipe.recipe.url}/>
      ))}
      </div>
    </div>
  );
};

export default RecipeSearch;
