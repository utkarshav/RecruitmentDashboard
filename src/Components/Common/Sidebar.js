import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './../styles/Sidebar.css';
import { Link } from 'react-router-dom';


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true); // Set isOpen to true initially

  const toggleSidebar = () => {
    // Always set isOpen to true
    setIsOpen(true);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className={`toggle-btn ${isOpen ? 'open' : ''}`} onClick={toggleSidebar}>
        {/* <FontAwesomeIcon icon={faBars} /> */}
      </div>
      <ul>
        <li>Home</li>
        <li>Positions</li>
      
      </ul>
    </div>
  );
};

export default Sidebar;
