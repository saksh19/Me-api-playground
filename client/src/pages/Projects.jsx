import React, { useEffect, useState } from "react";
import API from "../api";

export default function Projects() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    API.get("/projects")
      .then((r) => setItems(r.data.items || r.data))
      .catch(() => {});
  }, []);

  if (!items.length) {
    return <div className="container">No projects found.</div>;
  }

  return (
    <div className="container">
      <h2 className="text-center">My Projects</h2>
      <div className="grid">
        {items.map((p) => (
          <div className="card" key={p.id}>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            {p.skills && p.skills.length > 0 && (
              <p>
                <strong>Skills:</strong> {p.skills.join(", ")}
              </p>
            )}
            {p.link && (
              <a href={p.link} target="_blank" rel="noreferrer">
                <button className="btn btn-primary">View Project</button>
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
