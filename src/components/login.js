import React, { useState } from "react";
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';

const Login = (props) => {
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const onChange = (event) => {
        if (event.target.name === 'loginUsername') {
            setLoginUsername(event.target.value);
        } else if (event.target.name === 'loginPassword') {
            setLoginPassword(event.target.value);
        }
    }

    const accountLogin = async (event) => {
        event.preventDefault();
        let username = loginUsername;
        let password = loginPassword;
        try {
            const response = await axios.post('/api/users/login', {
                username,
                password
            });
            // console.log(response);
            if (!response.data.success) {
                console.log("Login failed.")
                return setErrorMessage("Username or password is incorrect.");
            } else {
                props.setUserToken(response.data.token);
                window.localStorage.setItem('token', `${response.data.token}`);
                return props.setIsLoggedIn(true);
            }
        } catch (err) {
            setErrorMessage("Username or password is incorrect.");
            throw err;
        }
    }

    return (
        <div className="container" id="loginform">
            <br />
            <h1>Login</h1>
            <form>

                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        value={loginUsername}
                        onChange={onChange}
                        name='loginUsername'
                        placeholder="Username" />

                    <label htmlFor="floatingInput">Username</label>
                </div>

                <div className="form-floating">
                    <input
                        type="password"
                        className="form-control"
                        id="floatingPassword"
                        value={loginPassword}
                        onChange={onChange}
                        name='loginPassword'
                        placeholder="Password"></input>

                    <label htmlFor="floatingPassword">Password</label>
                </div><br />

                {props.isLoggedIn ? <Navigate to='/myroutines' /> : <div className='text-danger'>{errorMessage}</div>}

                <button
                    type="Login"
                    className="btn btn-primary"
                    onClick={accountLogin}>
                    Login
                </button>

                <Link to='/register' ><button type="Login" className="btn btn-primary">Register</button></Link>

            </form>
        </div>
    )
}

export default Login;