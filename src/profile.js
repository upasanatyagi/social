import React from "react";
import { ProfilePic } from "./profile-pic";
import BioEditor from "./bioeditor";

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
            <div>
                <ProfilePic
                    firstName={firstName}
                    lastName={lastName}
                    imgUrl={imgUrl}
                    toggleModal={toggleModal}
                />
            </div>
            <div>
                <BioEditor
                    className="bioEditor"
                    toggleBio={toggleBio}
                    methodInBio={methodInBio}
                    bio={bio}
                />
            </div>
        </div>
    );
}
