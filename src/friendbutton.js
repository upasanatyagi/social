import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function FriendButton({ userProfileId }) {
    console.log("userProfileId", userProfileId);
    const [status, setStatus] = useState("");

    useEffect(() => {
        (async () => {
            const { data } = await axios.get(`/findrelation/${userProfileId}`);
            console.log("data", data);
            if (data.relation == false) {
                setStatus("Make friend request");
            } else if (data.accepted == true) {
                setStatus("End Friendship");
            } else if (data.accepted == false) {
                if (data.sender_id == userProfileId) {
                    setStatus("Accept");
                } else if (data.receiver_id == userProfileId) {
                    setStatus("Cancel");
                }
            }
        })();
    }, []);
    const click = async function() {
        console.log("i am cicked");
        if (status == "Make friend request") {
            const { data } = await axios.post(
                `/sendfriendrequest/${userProfileId}`
            );
            setStatus("Cancel");
        } else if (status == "Accept") {
            // console.log("data", data);
            const { data } = await axios.post(
                `/acceptfriendrequest/${userProfileId}`
            );
            setStatus("End Friendship");
        } else if (status == "End Friendship" || "Cancel") {
            console.log("clicked cancel", data);
            const { data } = await axios.post(
                `/endfriendship/${userProfileId}`
            );
            setStatus("Make friend request");
        }
    };

    return (
        <div>
            <div>
                <button id="frndbtn" onClick={click}>
                    {status}
                </button>
            </div>
        </div>
    );
}
