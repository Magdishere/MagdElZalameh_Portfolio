import React from 'react';
import { NavLink } from 'react-router-dom';
import { MdDashboard } from 'react-icons/md';
import { FaProjectDiagram, FaStar, FaBriefcase, FaEnvelope } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { logout } from '../features/authSlice';

const Sidebar = () => {
  const dispatch = useDispatch();

  const menuItems = [
    { name: 'Overview', icon: <MdDashboard size={20} />, path: '/admin' },
    { name: 'Projects', icon: <FaProjectDiagram size={20} />, path: '/admin/projects' },
    { name: 'Skills', icon: <FaStar size={20} />, path: '/admin/skills' },
    { name: 'Experience', icon: <FaBriefcase size={20} />, path: '/admin/experience' },
    { name: 'Messages', icon: <FaEnvelope size={20} />, path: '/admin/messages' },
  ];

  return (
    <div className="h-full bg-accent bg-opacity-20 border-r border-secondary border-opacity-20 flex flex-col p-4 backdrop-blur-lg">
      <div className="mb-10 px-2">
        <h1 className="text-2xl font-bold text-primary">Portfolio Admin</h1>
      </div>
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === '/admin'}
            className={({ isActive }) => 
              `sidebar-link ${isActive ? 'active' : 'text-secondary hover:text-white'}`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
      <button
        onClick={() => dispatch(logout())}
        className="sidebar-link text-red-400 hover:text-red-300 mt-auto"
      >
        <FiLogOut size={20} />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;
