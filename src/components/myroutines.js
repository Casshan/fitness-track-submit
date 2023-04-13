import React, { useState, useEffect } from "react";
import axios from 'axios';

const MyRoutines = (props) => {
    const [myRoutines, setMyRoutines] = useState();
    const [routinesLoaded, setRoutinesLoaded] = useState(false);
    const token = window.localStorage.getItem('token');
    const [username, setUserName] = useState();

    useEffect(() => {
        const fetchUserRoutines = async () => {
            try {
                const user = await axios.get('/api/users/me', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                setUserName(user.data.username);
                const routines = await axios.get(`/api/users/${user.data.username}/routines`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                setMyRoutines(routines.data);
                setRoutinesLoaded(true);
            } catch (err) {
                console.log(err);
            }
        }
        fetchUserRoutines();

    }, []);

    return (
        <div className="container">
                {routinesLoaded ? <>
                    <div>
                        <h1>{username}'s Routines</h1>
                    </div>

                    {
                        myRoutines.map((routine, index) => {
                            return <div key={index}>
                                <div className="card">
                                    <div className="card-header">
                                        {routine.name}
                                    </div>
                                    <ul className="list-group list-group-flush" >
                                        <li className="list-group-item" >Author: {routine.creatorName}</li>
                                        <li className="list-group-item" >Goal: {routine.goal}</li>
                                        <div className="card-header"> Activities </div>
                                        <li className="list-group-item" >{routine.activities.map((activities, index) => {
                                            return <div className="list-group-item" key={index}>
                                                <div>Name: {activities.name}</div>
                                                <div>Count: {activities.count}</div>
                                                <div>Duration: {activities.duration}</div>
                                                <div>Description: {activities.description}</div>
                                            </div>

                                        })}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        })
                    }
                </> : <h1>routines loading..</h1>}
        </div>
    )
}

export default MyRoutines;