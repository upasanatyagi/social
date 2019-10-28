import React from "react";

export function ProfilePic({ firstName, lastName, imgUrl, toggleModal }) {
    console.log("props in profile pic:");
    imgUrl = imgUrl || "/default.jpeg";
    return (
        <div>
            <h2>
                {firstName}coming profilepic
                {lastName}
            </h2>
            <img onClick={toggleModal} src={imgUrl} alt={lastName} />
            in profilepic
        </div>
    );
}
