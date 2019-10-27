import React from "react";
import { ProfilePic } from "./profile-pic";
import BioEditior from "./bioeditor";

export default function Profile({
    firstName,
    lastName,
    imgUrl,
    toggleModal,
    textareaIsVisible,
    toggleBio,
    methodInBio,
    bio
}) {
    console.log("props in profile pic:", bio);
    imgUrl = imgUrl || "/default.jpeg";
    return (
        <div>
            <h2>
                {firstName}in profile
                {lastName}
                {console.log("-=-=-=-=:", imgUrl)}
                <img src={imgUrl} alt={"hello"} />
                in profile
                <button onClick={() => toggleBio()}>submit</button>
                <div>{bio}</div>
            </h2>
            <ProfilePic
                firstName={firstName}
                lastName={lastName}
                imgUrl={imgUrl}
                toggleModal={toggleModal}
            />
            {textareaIsVisible && (
                <BioEditior toggleBio={toggleBio} methodInBio={methodInBio} />
            )}
        </div>
    );
}
