import React from "react";

export default function Login(props) {
  const { user } = props;
  return (
    <div className="Login">
      <a href={`/user/${user.login}`}>
        <img src={user.avatar_url} alt="" />
        <h3>{user.login}</h3>
      </a>
    </div>
  );
}
