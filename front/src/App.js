import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Components/Home/Home.js";
import Register from "./Components/Register/Register.js";
import Login from "./Components/Login/Login.js";

const App = () => {
  const [user, setUser] = useState(null);

  /**
   * userData contains the data inside the local storage
   * If the userData is not null (user is logged), we restore the data
   * of the userContext (accessible from all components)
   */
  // useEffect(() => {
  //   const userData = JSON.parse(localStorage.getItem("token"));
  //   console.log(userData);
  //   if (userData != null) {
  //     setUser(userData);
  //   }
  // }, [setUser]);

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
              <Route exact path="/" render={() => <Home />}></Route>
            </Switch>
          )}
        </Router>
    </div>
  );
};

export default App;
