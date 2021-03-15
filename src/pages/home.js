import React, { useEffect, useState } from "react";
import Header from "../components/header";
import Login from "../components/login";
import Profile from "./profile";

export default function Home() {
  const [profiles, setProfiles] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://api.github.com/orgs/grupotesseract/public_members")
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson);
        setProfiles(resJson);
      });
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div className="Home">
      <Header />
      <div className="container">
        <div className="filter">
          <form>
            <input
              type="text"
              placeholder="Search by login"
              onChange={handleChange}
            />
            <button>Search</button>
          </form>
        </div>

        <div className="wrapper">
          {profiles.map((profile) => {
            if (search) {
              if (profile.login.toLowerCase().includes(search.toLowerCase())) {
                return <Login user={profile} />;
              }
            } else {
              return <Login user={profile} />;
            }
          })}
        </div>
      </div>
    </div>
  );
}
