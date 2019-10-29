import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function FindPeople() {
    const [userInput, setUserInput] = useState("");

    useEffect(() => {
        let ignore = false;
        if (userInput !== "") {
            (async () => {
                console.log("userInput", userInput);
                const { data } = await axios.get(`/api/users/${userInput}`);
                if (!ignore) {
                    setUserInput(data);
                } else {
                    console.log("ignored!!!!!");
                }
            })();
        }
        return () => {
            ignore = true;
        };
    }, [userInput]);
    return (
        <div>
            <p>Look who has joined!!</p>
            <input type="text" onChange={e => setUserInput(e.target.value)} />
        </div>
    );
}

//
// {users.map(user => (
//     <div>{/* ... */}</div>
// ))}
//
// {/* ... */}
