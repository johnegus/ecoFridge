import React,{useEffect, useState} from 'react';
import Recipe from "./Recipe";
import Modal from 'react-modal'
import CloseIcon from '@material-ui/icons/Close';
import './index.css'
const RecipeSearchInput = () => {


    const APP_ID = 'd52ce565';
    const APP_KEY = 'ae866e8bb3383dcb7a0c888c9af8aec9';
  
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false)

  
  
  useEffect(()=>{
    getRecipes();
  }, [query]);
  
  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };
  
  const updateSearch = e => {
    setSearch(e.target.value);
  };
  
  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
    setModalIsOpen(true) 
  }
    return(
      <>
      <div className="App">
        <form onSubmit={getSearch} className="search-form">
          <input className="search-bar" type="text" value={search} onChange={updateSearch} />
          <button 
          className="search-button" 
          type="submit">Search</button>
        </form>
        </div>
      <Modal 
      isOpen={modalIsOpen} 
      onRequestClose={() => setModalIsOpen(false)}
      closeTimeoutMS={500}
      style={
        {
        content: {
          background: 'linear-gradient(7deg, rgba(2,0,36,1) 0%, rgba(212,212,228,0.48921566917782733) 34%, rgba(0,212,255,1) 100%)', 
          position: 'absolute',
          top: '20%',
          left: '1%',
          right: '1%',
          bottom: '5%',
          border: '1px solid #ccc',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          borderRadius: '5px',
          outline: 'none',
          padding: '20px',
          zIndex: '30',
        }
      }
      }
      >

        <div className='closeIcon'>
              <CloseIcon onClick={() => setModalIsOpen(false)}>Close</CloseIcon>
            </div>

      
        <div className="recipes">
        {recipes.map(recipe => (
          <Recipe 
          key={recipe.recipe.label} 
          title={recipe.recipe.label} 
          calories={recipe.recipe.calories} 
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
          source={recipe.recipe.source} />
        ))}
        </div>
      
      </Modal>

      </>
    );
  };

export default RecipeSearchInput;