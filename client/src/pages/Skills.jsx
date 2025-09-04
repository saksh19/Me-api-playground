import React, { useEffect, useState } from "react";
import API from "../api";
import axios from "axios";

export default function Skills() {
  const [skills, setSkills] = useState([]);

useEffect(() => {
  API.get("/skills/top")
    .then((r) => {
      setSkills(r.data);
      console.log("Fetched skills:", r.data);
    })
    .catch((err) => console.error("Error fetching skills:", err));
}, []);


  return (
    <div className="card-skill" >
      <h2 style={{ fontSize: "2rem", marginBottom: "16px" }}>Top Skills</h2>
      <ul className="skills-list" >
        {skills.map((s) => (
          <li key={s.id} className="skill-item " >

            <span className="skill-name">{s.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
