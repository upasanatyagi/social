import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { socket } from "./socket";

export function Chat() {
    const chatMessages = useSelector(state => state && state.chatMessages);
    console.log("here are the last 10 chat messages", chatMessages);

    const elemRef = useRef();
    useEffect(() => {
        console.log("chat mounted!!");
        console.log("scroll top: ", elemRef.current.scrollTop);
        console.log("scrollHeight: ", elemRef.current.scrollHeight);
        console.log("clientHeight: ", elemRef.current.clientHeight);
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, []);

    const keyCheck = e => {
        if (e.key === "Enter") {
            e.preventDefault();
            console.log("e.target.value", e.target.value);
            socket.emit("My amazing chat message", e.target.value);
            e.target.value = "";
        }
    };
    return (
        <div className="chat">
            <h1> CHAT ROOM </h1>
            <div className="chat-container" ref={elemRef}>
                <p> chat message will go here</p>
                <p> chat message will go here</p>
                <p> chat message will go here</p>
                <p> chat message will go here</p>
                <p> chat message will go here</p>
                <p> chat message will go here</p>
                <p> chat message will go here</p>
                <p> chat message will go here</p>
                <p> chat message will go here</p>
                <p> chat message will go here</p>
                <p> chat message will go here</p>
                <p> chat message will go here</p>
                <p> chat message will go here</p>
                <p> chat message will go here</p>
                <p> chat message will go here</p>
                <p> chat message will go here</p>
            </div>
            <textarea
                placeholder="Add your chat message here"
                onKeyDown={keyCheck}
            ></textarea>
        </div>
    );
}
