import React from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    dispatch(loginUser());
    navigate("/app/saved");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>SQL Builder</h1>
        <p>Login to continue </p>
        <button className="btn primary" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}
