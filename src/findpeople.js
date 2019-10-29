import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "./axios";

function FindPeople() {
    const [name, setName] = useState("World");
    const [last, setLast] = useState("Garg");
    setName("Lucky");
    setLast("Puppy");
    return (
        <div>
            <h1>
                Hello,{name}
                {last}!
            </h1>
            <input type="text" onChange={e => setName(e.target.value)} />
            <input type="text" onChange={e => setLast(e.target.value)} />
        </div>
    );
}
