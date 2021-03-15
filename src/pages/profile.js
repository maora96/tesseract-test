import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import Header from "../components/header";

export default function Profile() {
  const [followerCount, setFollowerCount] = useState(0);
  const [reposCount, setReposCount] = useState(0);
  const [profile, setProfile] = useState({});
  const { params } = useRouteMatch();
  useEffect(() => {
    fetch(`https://api.github.com/users/${params.id}`)
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson);
        setProfile(resJson);
      });
  }, []);

  useEffect(() => {
    fetch(`${profile.followers_url}`)
      .then((res) => res.json())
      .then((resJson) => {
        const followers = resJson.length;
        setFollowerCount(followers);
      });
  }, [profile]);

  useEffect(() => {
    fetch(`${profile.repos_url}`)
      .then((res) => res.json())
      .then((resJson) => {
        const repos = resJson.length;
        setReposCount(repos);
      });
  }, [profile]);

  const formatDate = (date) => {
    const unformatted = new Date(date);
    let year = unformatted.getFullYear();
    let month =
      unformatted.getMonth() >= 10
        ? unformatted.getMonth()
        : `0${unformatted.getMonth()}`;
    let day =
      unformatted.getDate() >= 10
        ? unformatted.getDate()
        : `0${unformatted.getDate()}`;
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="Profile">
      <Header />
      <div className="profile-box">
        <img src={profile.avatar_url} alt="" />
        <div className="profile-container">
          <h3>{profile.login}</h3>
          <div className="followers-repos">
            <div className="repos">
              <span>{reposCount}</span> repos
            </div>
            <div className="followers">
              <span>{followerCount}</span> followers
            </div>
          </div>
          <div className="joined-in">
            Joined in {formatDate(profile.created_at)}.
          </div>
        </div>
      </div>
    </div>
  );
}
