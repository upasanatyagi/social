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
        <div className="myProfileDisplay">
            <div id="mypropic">
                <ProfilePic
                    firstName={firstName}
                    lastName={lastName}
                    imgUrl={imgUrl}
                    toggleModal={toggleModal}
                />
            </div>
            <div>
                <BioEditior
                    toggleBio={toggleBio}
                    methodInBio={methodInBio}
                    bio={bio}
                />
            </div>
        </div>
    );
}
