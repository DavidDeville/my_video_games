import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import "./Register.css";
import axios from "axios";

const Register = () => {

    /**
     * States used for the form input and possible errors
     */
    const [nickname, setNickName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmRegister, setConfirmRegister] = useState(null);
    const [error, setError] = useState(null);

    /**
     * useHistory to redirect to login after a successful registration
     */
    const history = useHistory();

    const handleSubmit = e => {
        e.preventDefault();
        axios.post("https://localhost:8000/user/register", {user : {
            nickname: nickname,
            email: email,
            password: password
        }})
        .then(res => {
            console.log(res);
            if(res.data.message === "fail") {
                setError("User already exist");
            }
            else if(res.data.message === "success") {
                if(error !== null ) {
                    setError(null);
                    setConfirmRegister("Registration success!");
                    history.push("/login");
                } else {
                    setConfirmRegister("Registration success!");
                    history.push("/login");
                }
            }
        }).catch(err => {
            console.log(err);
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
                {error !== null ? 
                <p className="form_error">{error}</p> : 
                <p className="form_success">{confirmRegister}</p>
                }
            </form>
            <div className="have_account_bloc">
                <p className="have_account">Already have an account? </p>
                <p className="login" onClick={() => history.push("/login")}> Login</p>
            </div>
        </div>
    );
};

export default Register;