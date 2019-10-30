import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function FriendButton({ userProfileId }) {
    console.log("userProfileId", userProfileId);
    const [count, setCount] = useState(0);
    const [status, setStatus] = useState("");

    useEffect(() => {
        (async () => {
            const { data } = await axios.get(`/findrelation/${userProfileId}`);
            console.log("data", data);
            if (data.relation == false) {
                setStatus("Make friend request");
            }
        })();
    });
    function click() {
        console.log("i am cicked");
        (async () => {
            const { data } = await axios.post(
                `/sendfriendrequest/${userProfileId}`
            );
        })();
    }

    return (
        <div>
            <div>
                <p>You clicked {count} times</p>
                <button onClick={() => click(count + 1)}>{status}</button>
            </div>
        </div>
    );
}
