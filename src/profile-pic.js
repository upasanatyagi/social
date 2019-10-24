import React from "react";

export function ProfilePic({ firstName, lastName, imgUrl }) {
    console.log("props in profile pic:");
    imgUrl = imgUrl || "/images/default.jpeg";
    return (
        <div>
            <h2>
                I am the profile pic!!
                {firstName}
            </h2>
            <img src={imgUrl} alt={lastName} />
        </div>
    );
}
