import React from "react";

export function ProfilePic({ firstName, lastName, imgUrl, toggleModal }) {
    console.log("props in profile pic:");
    imgUrl = imgUrl || "/default.jpeg";
    return (
        <div>
            <p>
                {firstName} {lastName}
            </p>
            <img
                id="smallimg"
                onClick={toggleModal}
                src={imgUrl}
                alt={lastName}
            />
        </div>
    );
}
