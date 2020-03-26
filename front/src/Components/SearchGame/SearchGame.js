import React, { useState, useEffect } from "react";
import "./SearchGame.css";
import axios from "axios";

const SearchGame = () => {
  const [title, setTitle] = useState("");

  useEffect(() => {
    if(title.length > 3) {
      fetchGame();
    }
  }, [title]);

  const fetchGame = () => {
    console.log("pouet");
    axios.post('https://localhost:8000/games/', {
      title: title
    })
    .then(res => {
      console.log(res.data);
    })
  };

  return (
    <div>
      <form>
        <label>Game title : </label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          type="submit"
          value="Submit"
          onClick={e => e.preventDefault()}
          hidden
        />
      </form>
    </div>
  );
};

export default SearchGame;
