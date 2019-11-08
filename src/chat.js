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
    }, [chatMessages]);

    const keyCheck = e => {
        if (e.key === "Enter") {
            e.preventDefault();
            console.log(" reducer state");
            console.log("e.target.value", e.target.value);
            socket.emit("chat message", e.target.value);
            e.target.value = "";
        }
    };
    return (
        <div className="chat">
            <div>
                <h1> CHAT ROOM </h1>
            </div>
            <div className="chat-container" ref={elemRef}>
                {chatMessages &&
                    chatMessages.length > 0 &&
                    chatMessages.map(chatMessage => (
                        <div className="chatbox" key={chatMessage.chat_id}>
                            <div className="chatbox1">
                                <img
                                    id="chatImage"
                                    src={chatMessage.profilepicture}
                                />

                                <h3>
                                    {chatMessage.first}
                                    {chatMessage.last}
                                </h3>
                            </div>
                            <div className="chatbox2">
                                <p>{chatMessage.message}</p>
                            </div>
                        </div>
                    ))}
            </div>
            <div>
                <textarea
                    placeholder="Add your chat message here"
                    onKeyDown={keyCheck}
                ></textarea>
            </div>
        </div>
    );
}
