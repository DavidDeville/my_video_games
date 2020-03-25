import React from "react";
import game_icon from "../src/Logos/game_icon.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Components/Home/Home.js";
import Register from "./Components/Register/Register.js";
import Login from "./Components/Login/Login.js";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={game_icon} className="App-logo" alt="logo"/>
        <Router>
          <Switch>
            <Route exact path="/" render={() => <Home />}></Route>
            <Route exact path="/register" render={() => <Register />}></Route>
            <Route exact path="/login" render={() => <Login />}></Route>
          </Switch>
        </Router>
      </header>
    </div>
  );
};

export default App;
