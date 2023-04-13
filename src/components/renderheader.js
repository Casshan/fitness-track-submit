import React, { useState } from "react";

const RenderHeader = (props) => {

    const Logout = () => {
        props.setIsLoggedIn(false);
        props.setUserToken('');
        window.localStorage.removeItem('token');
    }


    return (
        <React.Fragment>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Fitness Tracker</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">

                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#/routines">Routines</a>
                            </li>
                            {props.isLoggedIn ? <>
                                <li>
                                    <a className="nav-link" href="#/myroutines">My Routines</a>
                                </li>
                            </> : null}
                            <li>
                                <a className="nav-link" href="#/activities">Activities</a>
                            </li>
                            <li>
                                {props.isLoggedIn ? <a onClick={() => {
                                    Logout();
                                }} className="nav-link" href="#/routines">Logout</a> : <a className="nav-link" href="#/login">Login</a>}
                            </li>

                        </ul>

                    </div>
                </div>
            </nav>
        </React.Fragment>
    )
};

export default RenderHeader;