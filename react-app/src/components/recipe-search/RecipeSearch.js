import React,{useEffect, useState} from 'react';
import Recipe from "./Recipe";
import './index.css'
import CircularProgress from '@material-ui/core/CircularProgress';

const RecipeSearch = ({currentGrocery}) => {
const API_ID = process.env.REACT_APP_APP_ID;
const API_KEY = process.env.REACT_APP_APP_KEY;

const [recipes, setRecipes] = useState([]);
const [search, setSearch] = useState('');
const [query, setQuery] = useState('');
const [loaded, setLoaded] = useState(false);


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
  setTimeout(function(){ setLoaded(true); }, 500);
};

const updateSearch = e => {
  setSearch(e.target.value);
};

const getSearch = e => {
  e.preventDefault();
  setQuery(search);
  setSearch('');
}

if (!loaded ) {
  return (
   
    <>
  
    <main className="centered middled">
      <b>Fetching Recipes...</b>
      <CircularProgress />
      </main>
    </>
    )
  }
  return(
    <div className="App">
      <h2>Recipe Search for: {currentGrocery}</h2>
      {recipes.length == 0 ? 
      <>
      <br></br>
      <h2>
        Sorry, your search request failed, possibly due to the following reasons:
      </h2>
      <h3>- The API has exceeded the 5 fetch per minute maximum.</h3>
      <h3>- There are no recipes for your particular query.</h3>
      </> :''
    }
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
