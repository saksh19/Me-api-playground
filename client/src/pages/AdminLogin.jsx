import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handle = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { username, password });
      localStorage.setItem("token", res.data.token);
      navigate("/admin/dashboard");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="container">
      <h2 className="text-center">Admin Login</h2>
      <form className="form" onSubmit={handle}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="input"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="input"
        />
        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}
