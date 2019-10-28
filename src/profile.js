import React from "react";
import { ProfilePic } from "./profile-pic";
import BioEditior from "./bioeditor";

export default function Profile({
    firstName,
    lastName,
    imgUrl,
    toggleModal,

    toggleBio,
    methodInBio,
    bio
}) {
    console.log("props in profile pic:", bio);
    imgUrl = imgUrl || "/default.jpeg";
    return (
        <div>
            <h2>
                {firstName}coming profile
                {lastName}
                {console.log("-=-=-=-=:", imgUrl)}
                <img src={imgUrl} alt={"hello"} />
                coming profile
            </h2>
            <ProfilePic
                firstName={firstName}
                lastName={lastName}
                imgUrl={imgUrl}
                toggleModal={toggleModal}
            />

            <BioEditior
                toggleBio={toggleBio}
                methodInBio={methodInBio}
                bio={bio}
            />
        </div>
    );
}
