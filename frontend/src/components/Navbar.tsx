import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const [open, setOpen] = useState(true);

  const parsedUser = user ? JSON.parse(user) : null;

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className={`navbar ${open ? "open" : "closed"}`}>
      <h2 className="logo">{open ? "TaskManager" : "TM"}</h2>

      <button className="toggle-btn" onClick={() => setOpen(!open)}>
        ☰
      </button>

      <div className="nav-links">
        {token && <Link to="/">Dashboard</Link>}
        {token && <Link to="/goals">Goals</Link>}
        {token && <Link to="/calendar">Calendar</Link>}
        {token && <Link to="/analytics">Analytics</Link>}

        <Link to="/about">About</Link>

        {!token && <Link to="/login">Login</Link>}
        {!token && <Link to="/register">Register</Link>}

        {token && parsedUser && (
          <span className="username">Hi, {parsedUser.name}</span>
        )}

        {token && (
          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
