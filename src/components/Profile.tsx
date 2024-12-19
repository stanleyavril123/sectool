import React from "react";
import { Avatar } from "@mui/material";
import "./Profile.css";

interface ProfileProps {
  email?: string;
  avatarSrc?: string;
}

const Profile: React.FC<ProfileProps> = ({
  email = "John.Doe@sectool.com",
  avatarSrc = "",
}) => {
  return (
    <header className="profile-header">
      <div className="profile-container">
        <Avatar src={avatarSrc} alt="User Avatar" />
        <span className="profile-email">{email}</span>
      </div>
    </header>
  );
};

export default Profile;
