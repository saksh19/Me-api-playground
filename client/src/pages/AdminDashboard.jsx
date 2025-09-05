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
    skills: [], 
  });
 
  const [editing, setEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile"); // "profile" or "skills"

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
      const res = profile
        ? await API.put("/profile", form)
        : await API.post("/profile", form);
      setProfile(res.data);
      alert("Profile saved!");
      setEditing(false);
    } catch (err) {
      console.error(err);
      alert("Error saving profile");
    }
  };
   const saveSkills = async () => {
    try {
      const res = await API.put("/skills/update", form.skills)
      alert(res.message);
      setEditing(false);
    } catch (err) {
      console.error(err);
      alert("Error saving skills");
    }
  };

  if (!profile && !editing) {
    return (
      <div className="container">
        <h2 className="text-center">Create Profile</h2>
        <ProfileForm
          form={form}
          onChange={handleChange}
          onSave={saveProfile}
          onCancel={() => setEditing(false)}
        />
      </div>
    );
  }

  return (
    <div className="container">
      <h2 className="text-center">Admin Dashboard</h2>

      {/* ---- Card showing profile ---- */}
      <div className="card">
        <h3>{profile?.name}</h3>
        <p><strong>Email:</strong> {profile?.email}</p>
        <p><strong>Education:</strong> {profile?.education}</p>
        <p><strong>Training / Internship:</strong> {profile?.work}</p>
        <p><a href={profile?.github} target="_blank" rel="noreferrer">GitHub</a></p>
        <p><a href={profile?.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></p>
        <p><a href={profile?.portfolio} target="_blank" rel="noreferrer">Portfolio</a></p>

        <div className="skills-chips">
          {(profile?.skills || []).map((s, i) => (
            <span key={i} className="skill-chip">{s}</span>
          ))}
        </div>

        <button className="btn" onClick={() => { setEditing(true); setActiveTab("profile"); }}>
          Edit
        </button>
      </div>

      {/* ---- Modal for editing ---- */}
      {editing && (
        <div className="modal">
          <div className="modal-content">
            {/* Header / Tabs */}
            <div className="flex" style={{ gap: "15px", padding: "10px" }}>
              <h3
                style={{ cursor: "pointer", color: activeTab === "profile" ? "blue" : "" }}
                onClick={() => setActiveTab("profile")}
              >
                Profile
              </h3>
              <h3
                style={{ cursor: "pointer", color: activeTab === "skills" ? "blue" : "" }}
                onClick={() => setActiveTab("skills")}
              >
                Skills
              </h3>
            </div>

            <div style={{ padding: "25px" }}>
              {activeTab === "profile" && (
                <ProfileForm
                  form={form}
                  onChange={handleChange}
                  onSave={saveProfile}
                  onCancel={() => setEditing(false)}
                />
              )}
              {activeTab === "skills" && (
                <SkillForm
                  form={form}
                  onChange={handleChange}
                  onSave={saveSkills}
                  onCancel={() => setEditing(false)}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- Profile Form ---------------- */
function ProfileForm({ form, onChange, onSave, onCancel }) {
  return (
    <div className="form">
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
    </div>
  );
}

/* ---------------- Skills Form ---------------- */
  function SkillForm({ form, onChange, onSave, onCancel }) {
    const [newSkill, setNewSkill] = useState("");
    let newskills = form.skills || [];
    const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const r = await API.get("/skills/top");
        setSkills(r.data);
    
      } catch (err) {
        console.error("Error fetching skills:", err);
      }
    };
    fetchSkills();
  }, []);


    const addSkill = () => {
      if (newSkill.trim()) {
        
        setNewSkill("");
        skills.push({ id: skills.length ? skills[skills.length - 1].id + 1 : 1, name: newSkill.trim() });
        onChange({ target: { name: "skills", value: skills } });
        console.log("Added skill:", newskills);
            console.log("Current form skills:", skills);
        setForm.skills([...skills]);
      }
    };

    const removeSkill = (index) => {
      const updatedFormSkills = skills.filter((_, i) => i !== index);

      setSkills((prevSkills) => prevSkills.filter((_, i) => i !== index));

       onChange({
        target: { name: "skills", value: updatedFormSkills },
      });


      console.log("skills ", skills);
    };

    return (
      <div className="formSkills">
  <div className="skills-chips " style={{ marginBottom: "15px", display: "flex", flexWrap: "wrap", gap: "8px" }}>
    {(skills || []).map((skill, idx) => (
      <span
        key={`${skill.id}-${skill.name}-${idx}`} 
        className="skill-chip"
        onClick={() => removeSkill(idx)} 
      >
        {skill.name} ✕
      </span>
    ))}
  </div>
        <div className="flex" style={{ gap: "8px" }}>
          <input
            className="input"
            placeholder="Add skill"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addSkill();
              }
            }}
          />
          <button type="button" className="btn save" onClick={addSkill}>
            Add
          </button>
        </div>

        <div className="form-buttons">
          <button type="button" className="btn save" onClick={onSave}>Save</button>
          <button type="button" className="btn cancel" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    );
  }
