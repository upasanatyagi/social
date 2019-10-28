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

            <h2>
                <img id="profileimg" src={imgUrl} alt={"hello"} />
                {firstName}
                {lastName}
            </h2>
        </div>
    );
}
