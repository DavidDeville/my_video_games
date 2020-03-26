import React, { useEffect, useState } from "react";
import game_icon from "../../Logos/game_icon.svg";
import { useHistory } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import "./Home.css";

const Home = ({ user, setUser }) => {
  const history = useHistory();

  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("token"));
    setLoggedUser(userData);
  }, [user]);

  const logout = () => {
    localStorage.removeItem("token");
    setLoggedUser(null);
    setUser(null);
  }

  return (
    <div className="home_main_bloc">
      {loggedUser !== null ? (
        <div className="home_header">
          <div>
            <span className="home_title">GAMES COLLECTION</span>
          </div>
          <div>
            <span className="home_login">Welcome {loggedUser.username} !</span>
          </div>
          <div>
            <span onClick={() => logout()} className="home_logout">LOGOUT</span>
          </div>
        </div>
      ) : (
        <div className="options_header">
            <div>
                <></>
            </div>
            <div>
          <img src={game_icon} className="App-logo" alt="logo" />
          </div>
          <div>
          <span className="register" onClick={() => history.push("/register")}>Register</span>
          <span className="login" onClick={() => history.push("/login")}>Login</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
