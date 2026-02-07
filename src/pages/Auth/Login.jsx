import React from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    dispatch(loginUser());
    navigate("/app/queries");
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>SQL Drag Drop Builder</h2>
        <p>Static login (auth will be added later)</p>

        <button className="btn-primary" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}
