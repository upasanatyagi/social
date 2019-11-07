import React from "react";

export function ProfilePic({ lastName, imgUrl, toggleModal }) {
    console.log("props in profile pic:");
    imgUrl = imgUrl || "/default.jpeg";
    return (
        <div>
            <img onClick={toggleModal} src={imgUrl} alt={lastName} />
        </div>
    );
}
// <p>
//     {firstName} {lastName}
// </p>
