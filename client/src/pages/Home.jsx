import React, { useEffect, useState } from "react";
import API from "../api";

export default function Home() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    API.get("/profile")
      .then((r) => setProfile(r.data))
      .catch(() => {});
  }, []);

  if (!profile) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <div className="profile">

        <div className="avatar">
          {profile.name ? profile.name[0].toUpperCase() : "?"}
        </div>

        <div className="meta">
          <h1>{profile.name}</h1>
          <p>{profile.education}</p>
          <p>software developer fresher</p>
          <p>{profile.email}</p>

          <div className="flex gap style={{ padding : 2px}}">
            <a href={profile.github} target="_blank" rel="noreferrer">
              <button className="btn btn-primary">GitHub</button>
            </a>
            {profile.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                <button className="btn btn-ghost">LinkedIn</button>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
