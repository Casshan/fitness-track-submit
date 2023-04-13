import React, { useState, useEffect } from "react";
import axios from 'axios';

const Activities = () => {
    const [activities, setActivities] = useState([]);

    const getActivities = async () => {
        try {
            const response = await axios.get('/api/activities');
            setActivities(response.data);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        getActivities();
    }, [])

    return (
        <div className="container">

            <div>
                <h1>Activities</h1>
            </div>

            {
                activities.map((activity, index) => {
                    return <div key={index}>
                        <div className="card">
                            <div className="card-header">
                                Activity: {activity.name}
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Description: {activity.description}</li>
                            
                            </ul>
                        </div>
                    </div>
                })
            }
        </div>
    )
}

export default Activities;