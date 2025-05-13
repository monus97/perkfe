import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidenav from "./Sidenav";
import Header from "./Header";
import "./styles.css";
import { Outlet } from "react-router-dom";
import AdminSidenav from "./adminSideNav";
import EmployeeSidebar from "./employeeSideNavBar";

interface LayoutProps {
  roleType: string | null;
}

const Layout: React.FC<LayoutProps> = ({ roleType }) => {
  const location = useLocation();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const noLayoutPaths = [
    "/signin",
    "/signup",
    "/store/details",
    "/recognition-tasks",
    "/store/product-details",
    "/user/cart",
    "/user/cart/delivery",
    "/user/orders",
    "/user/orders-details",
    "/user/orders-details/tracking",
    "/store/product-categories",
  ];

  if (noLayoutPaths.includes(location.pathname)) {
    return <Outlet />;
  }

  // Toggle the sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  console.log(roleType, "roleType");

  const renderSideBar = () => {
    switch (roleType) {
      case "admin":
        return (
          <AdminSidenav
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />
        );
      case "user":
        return (
          <EmployeeSidebar
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />
        );
      default:
        return (
          <Sidenav
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />
        );
    }
  };

  return (
    <div
      className={`layouts ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}
    >
      {renderSideBar()}
      <div className="main-content">
        <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
