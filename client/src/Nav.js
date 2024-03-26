// Nav.js (Common)
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminNav from './AdminNav'
import UserNav from "./UserNav";

const Nav = () => {
  const userRole = localStorage.getItem("user");
  console.log("auth-===++",userRole)
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/home");
  };

  return (
    <div>
      {userRole === "Admin" ? (
        <AdminNav  logout={logout}/>
      ) : userRole === "User" ? (
        <UserNav logout={logout} />
      ) : (
        <ul className="nav-ul">
          <li>
            <Link to="/register"> Sign Up </Link>
          </li>
          <li>
            <Link to="/login"> Login </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Nav;
