import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function FindPeople() {
    const [userInput, setUserInput] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        let ignore = false;
        if (!userInput) {
            (async () => {
                console.log("userInput", userInput);
                const { data } = await axios.get(`/api/users`);
                setUsers(data);
            })();
        } else {
            (async () => {
                console.log("userInput", userInput);
                const { data } = await axios.get(`/api/users/${userInput}`);
                console.log(data);
                if (!ignore) {
                    setUsers(data);
                }
            })();
        }
        return () => {
            console.log("cleaning up", userInput);
            ignore = true;
        };
    }, [userInput]);
    return (
        <div className="contmainfindppl">
            <div className="mainfindppl">
                <p>Are you looking for some one in particular!!</p>
                <input
                    type="text"
                    onChange={e => setUserInput(e.target.value)}
                />
                <ul id="fpbox">
                    {users.map(user => (
                        <li key={user.first}>
                            <img id="findpeople" src={user.profilepicture} />
                            <h3>
                                {user.first} {user.last}
                            </h3>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
