import React, { useState, useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext"
import { loginCall } from "../../apiCalls";
import { useNavigate } from "react-router-dom";
import "./login.css"

export default function Login() {
    /*const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:3010/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        if (response.ok) login(data.token);
    };*/

    const email = useRef();
    const password = useRef();
    const { isFetching, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        loginCall(
            { email: email.current.value, password: password.current.value},
            dispatch
        );
        alert("Authorization was completed successfully");
    };
    const moveRegis = async (e) => {
        e.preventDefault();
        navigate('/');
    }

    return (
        <div className="body_back">
            <form className="login_form" onSubmit={handleClick}>
                <input
                    className="login_input"
                    type="email"
                    placeholder="Email"
                    required
                    ref={email} 
                />
                <input
                    className="login_input" 
                    type="password"
                    placeholder="Password"
                    required
                    ref={password} 
                />
                <button className="login_button" type="submit">Login in</button>
            </form>
        </div>
    );
}
