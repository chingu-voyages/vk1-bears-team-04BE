import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const Header = () => {
  const auth = useSelector((state) => state.auth);

  const { user, isLogged } = auth;

  const handleLogout = async () => {
    try {
      await axios.get("/user/logout");
      localStorage.removeItem("firstLogin");
      window.location.href = "/";
    } catch (err) {
      window.location.href = "/";
    }
  };

  const userLink = () => {
    return (
      <li>
        <Link to="/">{user.firstName}</Link>
        <ul>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/" onClick={handleLogout}>
              Logout
            </Link>
          </li>
        </ul>
      </li>
    );
  };
  return (
    <header>
      <div className="logo">
        <Link to="/">U Rescue Me</Link>
      </div>
      <ul>
        {isLogged ? (
          userLink()
        ) : (
          <li>
            <Link to="/login">Log In</Link>
          </li>
        )}
      </ul>
    </header>
  );
};

export default Header;
