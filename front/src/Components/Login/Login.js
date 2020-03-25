import React, { useState } from 'react';
import "./Login.css";
import axios from "axios";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        axios.post("https://localhost:8000/user/login", {user : {
            email: email,
            password: password
        }})
        .then(res => {
            console.log(res.data);
        }).catch(err => {
            console.log(err);
            setError("Invalid email or password");
        })
    }

    return (
        <div className="form_bloc">
            <form className="login_form">
            <h1 className="login_form_header">Login</h1>
                <label className="form_label">
                    Email :
                </label>
                <input type="email" name="email" className="form_input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email..."/>
                <label className="form_label">
                    Password :
                </label>
                <input type="password" name="password" className="form_input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password..."/>
                <button type="submit" className="form_button" onClick={(e) => handleSubmit(e)}>Login</button>
                <p className="form_error">{error}</p>
            </form>
        </div>
    );
};

export default Login;