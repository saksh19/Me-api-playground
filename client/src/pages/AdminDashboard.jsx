import React, { useEffect, useState } from "react";
import API from "../api";

export default function AdminDashboard() {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    education: "",
    work: "",
    github: "",
    linkedin: "",
    portfolio: "",
  });
  const [editing, setEditing] = useState(false);


  useEffect(() => {
    API.get("/profile")
      .then((r) => {
        setProfile(r.data);
        setForm(r.data);
      })
      .catch(() => {});
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const saveProfile = async () => {
  try {
    if (profile) {
      const res = await API.put("/profile", form);
      setProfile(res.data);   // update state with new profile
      alert("Profile updated!");
    } else {
      const res = await API.post("/profile", form);
      setProfile(res.data);
      alert("Profile created!");
    }
    setEditing(false);
  } catch (err) {
    console.error(err);
    alert("Error saving profile");
  }
};

  if (!profile) {
    return (
      <div className="container">
        <h2 className="text-center">Create Profile</h2>
        <ProfileForm form={form} onChange={handleChange} onSave={saveProfile} onCancel={() => setEditing(false)} />
      </div>
    );
  }

  return (
    <div className="container">
      <h2 className="text-center">Admin Dashboard</h2>

      <div className="card">
        <h3>{profile.name}</h3>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Education:</strong> {profile.education}</p>
        <p><strong>Training and Internship:</strong> {profile.work}</p>
        <p><a href={profile.github} target="_blank" rel="noreferrer">GitHub</a></p>
        <p><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></p>
        <p><a href={profile.portfolio} target="_blank" rel="noreferrer">Portfolio</a></p>
        <button className="btn" onClick={() => setEditing(true)}>Edit Profile</button>
      </div>

      {editing && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Profile</h3>
            <ProfileForm form={form} onChange={handleChange} onSave={saveProfile} onCancel={() => setEditing(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

function ProfileForm({ form, onChange, onSave, onCancel }) {
  return (
    <form className="form">
      <input name="name" value={form.name} onChange={onChange} placeholder="Name" />
      <input name="email" value={form.email} onChange={onChange} placeholder="Email" />
      <input name="education" value={form.education} onChange={onChange} placeholder="Education" />
      <input name="work" value={form.work} onChange={onChange} placeholder="Work" />
      <input name="github" value={form.github} onChange={onChange} placeholder="GitHub" />
      <input name="linkedin" value={form.linkedin} onChange={onChange} placeholder="LinkedIn" />
      <input name="portfolio" value={form.portfolio} onChange={onChange} placeholder="Portfolio" />
      <div className="form-buttons">
        <button type="button" className="btn save" onClick={onSave}>Save</button>
        <button type="button" className="btn cancel" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
