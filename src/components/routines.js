import React, { useState, useEffect } from "react";
import axios from 'axios';

const Routines = () => {
    const [routines, setRoutines] = useState([]);

    const getRoutines = async () => {
        try {
            const response = await axios.get('/api/routines');
            setRoutines(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getRoutines();
    }, [])

    return (
        <div className="container">

            <div>
                <h1>Routines</h1>
            </div>

            {
                routines.map((routine, index) => {
                    return <React.Fragment key={index}>
                        <div className="card">
                            <div className="card-header">
                                {routine.name}
                            </div>
                            <ul className="list-group list-group-flush" >
                                <li className="list-group-item">Author: {routine.creatorName}</li>
                                <li className="list-group-item">Goal: {routine.goal}</li>
                                <div className="card-header" key={index}> Activities </div>
                                <li className="list-group-item">{routine.activities.map((activities, index) => {
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
                    </React.Fragment>
                })
            }
        </div>
    )
}

export default Routines;