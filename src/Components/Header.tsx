import React, { useState } from "react";
import "./styles.css";
import { useLocation } from "react-router-dom";

interface HeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ isSidebarOpen, toggleSidebar }) => {
  const [notification, setNotification] = useState(true);
  const location = useLocation(); // Get the current location object
  const currentPage = location.pathname.split("/")[1];
  const formattedPage =
    currentPage.charAt(0).toUpperCase() + currentPage.slice(1);
  const userString = sessionStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const formattedName =
    user?.firstName.charAt(0).toUpperCase() + user?.firstName.slice(1);
  const formattedRole =
    user?.role.charAt(0).toUpperCase() + user?.role.slice(1);

const details = sessionStorage.getItem('details')
const logo = details ? JSON.parse(details) : null;
  return (
    <header className="head">
      <div className="d-flex align-items-center">
        <div onClick={toggleSidebar} className="titleButton">
          <svg
            width="23"
            height="24"
            viewBox="0 0 23 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 18.7825H20M3 11.9999H20M3 5.21729H20"
              stroke="#4160FC"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        {formattedPage}
      </div>
      <div className="profilesection">
        {notification && (
          <div className="p-3">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12.001 1.25C7.72081 1.25 4.25102 4.71979 4.25102 9V9.7041C4.25102 10.401 4.04473 11.0824 3.65814 11.6622L2.50954 13.3851C1.17644 15.3848 2.19415 18.1028 4.51274 18.7351C5.26836 18.9412 6.03035 19.1155 6.79676 19.2581L6.79865 19.2632C7.56765 21.3151 9.62296 22.75 12.001 22.75C14.3789 22.75 16.4343 21.3151 17.2033 19.2632L17.2051 19.2581C17.9716 19.1155 18.7336 18.9412 19.4893 18.7351C21.8079 18.1028 22.8256 15.3848 21.4925 13.3851L20.3439 11.6622C19.9573 11.0824 19.751 10.401 19.751 9.7041V9C19.751 4.71979 16.2812 1.25 12.001 1.25ZM15.3774 19.537C13.1345 19.805 10.8674 19.8049 8.62447 19.5369C9.33542 20.5585 10.572 21.25 12.001 21.25C13.4299 21.25 14.6665 20.5585 15.3774 19.537ZM5.75102 9C5.75102 5.54822 8.54924 2.75 12.001 2.75C15.4528 2.75 18.251 5.54822 18.251 9V9.7041C18.251 10.6972 18.545 11.668 19.0958 12.4943L20.2444 14.2172C21.0096 15.3649 20.4254 16.925 19.0946 17.288C14.4504 18.5546 9.55167 18.5546 4.90742 17.288C3.57659 16.925 2.99244 15.3649 3.75762 14.2172L4.90622 12.4943C5.45707 11.668 5.75102 10.6972 5.75102 9.7041V9Z"
                fill="#828BB9"
              />
              <circle cx="18" cy="5" r="3" fill="#FF0000" />
            </svg>
          </div>
        )}
        {!notification && (
          <div className="p-3">
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11.001 0.25C6.72081 0.25 3.25102 3.71979 3.25102 8V8.7041C3.25102 9.40102 3.04473 10.0824 2.65814 10.6622L1.50954 12.3851C0.176445 14.3848 1.19415 17.1028 3.51274 17.7351C4.26836 17.9412 5.03035 18.1155 5.79676 18.2581L5.79865 18.2632C6.56765 20.3151 8.62296 21.75 11.001 21.75C13.3789 21.75 15.4343 20.3151 16.2033 18.2632L16.2051 18.2581C16.9716 18.1155 17.7336 17.9412 18.4893 17.7351C20.8079 17.1028 21.8256 14.3848 20.4925 12.3851L19.3439 10.6622C18.9573 10.0824 18.751 9.40102 18.751 8.7041V8C18.751 3.71979 15.2812 0.25 11.001 0.25ZM14.3774 18.537C12.1345 18.805 9.86742 18.8049 7.62447 18.5369C8.33542 19.5585 9.57199 20.25 11.001 20.25C12.4299 20.25 13.6665 19.5585 14.3774 18.537ZM4.75102 8C4.75102 4.54822 7.54924 1.75 11.001 1.75C14.4528 1.75 17.251 4.54822 17.251 8V8.7041C17.251 9.69716 17.545 10.668 18.0958 11.4943L19.2444 13.2172C20.0096 14.3649 19.4254 15.925 18.0946 16.288C13.4504 17.5546 8.55167 17.5546 3.90742 16.288C2.57659 15.925 1.99244 14.3649 2.75762 13.2172L3.90622 11.4943C4.45707 10.668 4.75102 9.69716 4.75102 8.7041V8Z"
                fill="#828BB9"
              />
            </svg>
          </div>
        )}
        <svg
          width="2"
          height="50"
          viewBox="0 0 2 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1 1L1 49" stroke="#DAD8D8" stroke-linecap="round" />
        </svg>
        <div className="p-3 d-flex imagesection">
          <div className="pe-3">
            <img
              className="profileimage"
              src={logo ? logo?.logo : ""}
              alt=""
            />
          </div>
          <div className="hearderProfile">
            <div className="name"> { formattedName}</div>
            <div className="role">{formattedRole}</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
