import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

import "../styles/dashboard.css";

const DashboardLayout = () => {

    // Sidebar CLOSED by default
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {

        setSidebarOpen((prev) => !prev);

    };

    return (

        <div className="dashboard-wrapper">

            <Navbar toggleSidebar={toggleSidebar} />

            <div className="dashboard-container">

                <Sidebar isOpen={sidebarOpen} />

                <main
                    className={
                        sidebarOpen
                            ? "dashboard-main"
                            : "dashboard-main sidebar-closed"
                    }
                >

                    <Outlet />

                </main>

            </div>

        </div>

    );

};

export default DashboardLayout;