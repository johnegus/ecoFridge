import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignInSide from "./components/sign-in-side/SignInSide";
import SignUp from "./components/sign-up/SignUp";
import NavBar from "./components/NavBar";
import Dashboard from './components/dashboard/Dashboard'
import Checkout from './components/checkout/Checkout'
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/dashboard/User";
import { authenticate, signUp } from "./services/auth";
import HomePage from "./components/HomePage";
import AddGrocery from "./components/dashboard/addItem/Add";
import RecipeSearch from "./components/recipe-search/RecipeSearch";
import Modal from 'react-modal'

Modal.setAppElement('#root')


function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async() => {
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
      }
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar setAuthenticated={setAuthenticated} authenticated={authenticated}/>
      <Route path="/login" exact={true}>
        <SignInSide
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />
      </Route>
      <Route path="/sign-up" exact={true}>
        <SignUp authenticated={authenticated} setAuthenticated={setAuthenticated} />
      </Route>
      <ProtectedRoute path="/users" exact={true} authenticated={authenticated}>
        <UsersList/>
      </ProtectedRoute>
      <ProtectedRoute path="/" exact={true} authenticated={authenticated}>
        <Dashboard/>
      </ProtectedRoute>
      <ProtectedRoute path="/recipes" exact={true} authenticated={authenticated}>
        <RecipeSearch />
      </ProtectedRoute>
      <ProtectedRoute path="/add" exact={true} authenticated={authenticated}>
        <AddGrocery />
      </ProtectedRoute>
      <ProtectedRoute path="/users/:userId" exact={true} authenticated={authenticated}>
        <User />
      </ProtectedRoute>
  
      <ProtectedRoute path="/groceries/new" exact={true} authenticated={authenticated}>
        <Checkout />
      </ProtectedRoute>
  
      
      <Route path="/" exact={true}  >
        <HomePage setAuthenticated={setAuthenticated} authenticated={authenticated}/>
      </Route>
    </BrowserRouter>
  );
}

export default App;
