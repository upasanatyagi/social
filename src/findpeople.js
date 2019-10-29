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
        <div>
            <ul>
                {users.map(user => (
                    <li key={user.first}>
                        <img src={user.profilepicture} />
                        <h3>
                            {user.first}
                            {user.last}
                        </h3>
                    </li>
                ))}
            </ul>
            <p>Look who has joined!!</p>
            <input type="text" onChange={e => setUserInput(e.target.value)} />
        </div>
    );
}
