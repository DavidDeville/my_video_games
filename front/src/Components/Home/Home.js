import React, { useEffect, useState } from "react";
import game_icon from "../../Logos/game_icon.svg";
import { useHistory } from "react-router-dom";
import "./Home.css";

const Home = ({ user }) => {
  const history = useHistory();

  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("token"));
    setLoggedUser(userData);
  }, [user, loggedUser]);

  return (
    <div className="home_header">
      {loggedUser !== null ? (
        <div>
          <p onClick={() => console.log(loggedUser)}>
            Welcome {loggedUser.username} !
          </p>
        </div>
      ) : (
        <div>
          <img src={game_icon} className="App-logo" alt="logo" />
          <p onClick={() => history.push("/register")}>Register</p>
          <p onClick={() => history.push("/login")}>Login</p>
        </div>
      )}
    </div>
  );
};

export default Home;
