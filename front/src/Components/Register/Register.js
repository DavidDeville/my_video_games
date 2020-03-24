import React, { useState } from 'react';
import "./Register.css";
import axios from "axios";

const Register = () => {

    const [nickname, setNickName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        console.log("valeur nickname : " +nickname);
        console.log("valeur email : " +email);
        console.log("valeur password : " +password);
        axios.post("https://localhost:8000/user/create", {user : {
            nickname: nickname,
            email: email,
            password: password
        }})
        .then(res => {
            console.log(res.data["user"]);
        }).catch(err => {
            console.log(err);
            setError("Invalid input or user already taken");
        })
    }

    return (
        <div className="form_bloc">
            <form className="register_form">
            <h1 className="register_form_header">Registration</h1>
                <label className="form_label">
                    Nick name :
                </label>
                <input type="text" name="nickname" className="form_input" value={nickname} onChange={(e) => setNickName(e.target.value)} placeholder="Enter your nickname..."/>
                <label className="form_label">
                    Email :
                </label>
                <input type="email" name="email" className="form_input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email..."/>
                <label className="form_label">
                    Password :
                </label>
                <input type="password" name="password" className="form_input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password..."/>
                <button type="submit" className="form_button" onClick={(e) => handleSubmit(e)}>Register</button>
                <p className="form_error">{error}</p>
            </form>
        </div>
    );
};

export default Register;