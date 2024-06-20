import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { NavLink } from 'react-router-dom';
import SidebarData from './SidebarData';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleSidebar() {
    setIsOpen(!isOpen);
  }

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <span className="hamburger"></span>
      </button>
      <ul className="sidebar-links">
      {SidebarData.map((item) => (
            <li key={uuidv4()} className={item.cName}>
              <NavLink
                to={item.path}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? '#97bf0f' : '#ffffff',
                  color: isActive ? '#ffffff' : '#000000',
                })}
              >
                <span className="item-title uppercase font-bold text-sm">{item.title}</span>
              </NavLink>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Sidebar;