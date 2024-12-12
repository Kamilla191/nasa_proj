import axios from "axios";
import React, { useRef } from "react";
import { useNavigate } from "react-router";

export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        if (passwordAgain.current.value !== password.current.value) {
            passwordAgain.current.setCustomValidity("Passwords don't match!");
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            };
            try {
                await axios.post("http://localhost:3010/auth/register", user); // Указан полный URL
                alert("Registration successful");
                navigate('/login');
            } catch (err) {
                console.log(err);
            }
        }
    };

    const moveLogin = (e) => {
        e.preventDefault();
        navigate('/login');
    };

    return (
        <div className="body_back">
            <form className="login_form" onSubmit={handleClick}>
            <input className="login_input" type="text" placeholder="Username" ref={username} required />
            <input className="login_input" type="email" placeholder="Email" ref={email} required />
            <input className="login_input" type="password" placeholder="Password" ref={password} required />
            <input className="login_input" type="password" placeholder="Password again" ref={passwordAgain} required />
            <button className="login_button" type="submit">Sign up</button>
            <button onClick={moveLogin}>Log into account</button>
        </form>
        </div>
    );
}
