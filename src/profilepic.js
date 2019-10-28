import React from "react";

const ProfilePic = ({ first, last, url = "/default.jpg", onClick }) => {
    return (
        <div>
            <img src={url} alt={`${first}${last}`} onClick={onClick} />
        </div>
    );
};

export default ProfilePic;
