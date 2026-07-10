import React from "react";

import { NavLink } from "react-router-dom";

import {

  FaTachometerAlt,

  FaSeedling,

  FaPaw,

  FaTools,

  FaCloudSun,

  FaDollarSign,

  FaChartLine,

  FaBell,

  FaUser

} from "react-icons/fa";

import "../../styles/sidebar.css";

const Sidebar = ({ isOpen }) => {

  const menus = [

    {
      title: "Dashboard",
      icon: <FaTachometerAlt />,
      path: "/dashboard"
    },

    {
      title: "Crops",
      icon: <FaSeedling />,
      path: "/crops"
    },

    {
      title: "Livestock",
      icon: <FaPaw />,
      path: "/livestock"
    },

    {
      title: "Equipment",
      icon: <FaTools />,
      path: "/equipment"
    },

    {
      title: "Weather",
      icon: <FaCloudSun />,
      path: "/weather"
    },

    {
      title: "Market Prices",
      icon: <FaDollarSign />,
      path: "/market"
    },

    {
      title: "Analytics",
      icon: <FaChartLine />,
      path: "/analytics"
    },

    {
      title: "Alerts",
      icon: <FaBell />,
      path: "/alerts"
    },

    {
      title: "Profile",
      icon: <FaUser />,
      path: "/profile"
    }

  ];

  return (

    <aside

      className={
        isOpen
          ? "sidebar open"
          : "sidebar"
      }

    >

      <div className="sidebar-header">

        <h4 className="text-white">

          🌱 FarmBridge

        </h4>

        <small className="text-light">

          Smart Farm Management

        </small>

      </div>

      <div className="sidebar-menu">

        {

          menus.map((menu) => (

            <NavLink

              key={menu.path}

              to={menu.path}

              className={({ isActive }) =>

                isActive

                  ? "sidebar-link active"

                  : "sidebar-link"

              }

            >

              <span className="sidebar-icon">

                {menu.icon}

              </span>

              <span>

                {menu.title}

              </span>

            </NavLink>

          ))

        }

      </div>

    </aside>

  );

};

export default Sidebar;