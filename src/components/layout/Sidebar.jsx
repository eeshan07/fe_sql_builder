import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../features/auth/authSlice";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className={collapsed ? "sidebar collapsed" : "sidebar"}>
      <div className="sidebar-header">
        <h2>{collapsed ? "SB" : "SQL Builder"}</h2>
        <button className="btn ghost" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? ">" : "<"}
        </button>
      </div>

      <div className="sidebar-links">
        <NavLink to="/app/saved" className="sidebar-link">
          Saved Queries
        </NavLink>

        <NavLink to="/app/create" className="sidebar-link">
          Create Query
        </NavLink>
      </div>

      <div className="sidebar-footer">
        <button
          className="btn danger"
          onClick={() => dispatch(logoutUser())}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
