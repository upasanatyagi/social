import React from "react";

export function ProfilePic({ lastName, imgUrl, toggleModal }) {
    console.log("props in profile pic:");
    imgUrl = imgUrl || "/default.jpeg";
    return (
        <div className="profile-pic">
            <div>
                <img
                    id="profilelogo"
                    src="https://socialbox.agency/wp-content/uploads/2019/09/SB-LOGO.png"
                />
            </div>

            <div>
                <img
                    id="smallimg"
                    onClick={toggleModal}
                    src={imgUrl}
                    alt={lastName}
                />
            </div>
        </div>
    );
}
