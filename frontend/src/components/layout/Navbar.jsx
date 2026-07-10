import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaBell,
  FaUserCircle,
  FaSignOutAlt
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

import "../../styles/navbar.css";

const Navbar = ({ toggleSidebar }) => {

  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [showMenu, setShowMenu] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {

    const handleClick = (e) => {

      if (
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setShowMenu(false);
      }

    };

    document.addEventListener("mousedown", handleClick);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClick
      );

  }, []);

  const handleLogout = () => {

    logout();

    navigate("/login");

  };

  return (

    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-3">

      <button
        className="btn btn-outline-success me-3"
        onClick={toggleSidebar}
      >
        <FaBars />
      </button>

      <Link
        className="navbar-brand fw-bold text-success"
        to="/dashboard"
      >
        🌱 FarmBridge
      </Link>

      <div className="ms-auto d-flex align-items-center">

        <Link
          to="/alerts"
          className="btn btn-light position-relative me-3"
        >
          <FaBell size={20} />
        </Link>

        <div
          className="position-relative"
          ref={menuRef}
        >

          <button
            className="btn btn-light d-flex align-items-center"
            onClick={() =>
              setShowMenu(!showMenu)
            }
          >

            <FaUserCircle
              size={28}
              className="me-2"
            />

            <span>

              {user?.full_name || "Farmer"}

            </span>

          </button>

          {

            showMenu && (

              <div
                className="dropdown-menu dropdown-menu-end show"
                style={{
                  position: "absolute",
                  right: 0,
                  top: "110%"
                }}
              >

                <Link
                  to="/profile"
                  className="dropdown-item"
                >

                  Profile

                </Link>

                <button
                  className="dropdown-item text-danger"
                  onClick={handleLogout}
                >

                  <FaSignOutAlt className="me-2" />

                  Logout

                </button>

              </div>

            )

          }

        </div>

      </div>

    </nav>

  );

};

export default Navbar;