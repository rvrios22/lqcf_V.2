import React, { useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const { setToken } = useOutletContext();
  const submitButton = useRef(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    try {
      const response = await fetch("http://localhost:3001/api/user/login", options);
      const data = await response.json();

      sessionStorage.setItem("token", data.token);
      setToken(data.token);

      setFormData({ username: "", password: "" });
      submitButton.current.blur()
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="general-container">
      <h1 className="sub-header">Login</h1>
      <form action="POST" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="username"
          value={formData.username}
          onChange={(e) => {
            setFormData({
              ...formData,
              username: e.target.value,
            });
          }}
        />
        <input
          type="password"
          placeholder="password"
          value={formData.password}
          onChange={(e) => {
            setFormData({
              ...formData,
              password: e.target.value,
            });
          }}
        />
        <input
          type="submit"
          value="Submit"
          className="submit-button"
          ref={submitButton}
        />
      </form>
    </div>
  );
}

export default Login;
