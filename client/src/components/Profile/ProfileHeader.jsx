import React from "react";

// ProfileHeader component displays the profile header with the username
const ProfileHeader = ({ username }) => (
  <>
    <h1 className="title-page text-3xl font-bold mb-4 text-center">
      Your Profile
    </h1>
    <p className="text-center py-4 mb-4 text-xl">
      Hello, <strong>{username}</strong>!
    </p>
  </>
);

export default ProfileHeader;
