import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Components/Home/Home.js";
import Register from "./Components/Register/Register.js";
import Login from "./Components/Login/Login.js";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
  }, []);

  return (
    <div>
        <Router>
          {user === null ? (
            <Switch>
              <Route
                exact
                path="/"
                render={() => <Home />}
              ></Route>
              <Route exact path="/register" render={() => <Register />}></Route>
              <Route
                exact
                path="/login"
                render={() => <Login setUser={setUser} />}
              ></Route>
            </Switch>
          ) : (
            <Switch>
              <Route exact path="/" render={() => <Home setUser={setUser} />}></Route>
            </Switch>
          )}
        </Router>
    </div>
  );
};

export default App;
