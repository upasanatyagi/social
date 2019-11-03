import React from "react";

export function ProfilePic({ lastName, imgUrl, toggleModal }) {
    console.log("props in profile pic:");
    imgUrl = imgUrl || "/default.jpeg";
    return (
        <img id="smallimg" onClick={toggleModal} src={imgUrl} alt={lastName} />
    );
}
