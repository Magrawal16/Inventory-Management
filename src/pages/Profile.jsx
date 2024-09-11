import React from "react";

function Profile({ user }) {
  // Use the user prop to access user data
  const { username, password } = user;

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Username: {username}</p>
      <p>Password: {password}</p>
      {/* Add more profile information here */}
    </div>
  );
}

export default Profile;
