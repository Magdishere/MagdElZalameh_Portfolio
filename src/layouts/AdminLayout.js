import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background text-white">
      {/* Mobile Header */}
      <div className="md:hidden flex justify-between items-center p-4 border-b border-white/5 bg-accent/20 sticky top-0 z-[60] backdrop-blur-lg">
        <h1 className="text-xl font-bold text-primary">Admin Panel</h1>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-primary bg-white/5 rounded-lg"
        >
          {isSidebarOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
        </button>
      </div>

      {/* Sidebar - Hidden on mobile unless toggled */}
      <div className={`
        fixed inset-0 z-50 transform transition-transform duration-300 md:relative md:translate-x-0 md:z-auto w-64
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full relative">
           <Sidebar />
           {/* Close button inside sidebar for mobile */}
           <button 
             onClick={() => setIsSidebarOpen(false)}
             className="md:hidden absolute top-4 right-4 text-secondary"
           >
             <HiX size={20} />
           </button>
        </div>
      </div>

      {/* Backdrop for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-10 overflow-y-auto">
        <div className="hidden md:flex justify-between items-center mb-10 pb-4 border-b border-secondary border-opacity-10">
          <h2 className="text-xl font-medium text-secondary uppercase tracking-widest">Dashboard</h2>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-semibold">Admin User</p>
              <p className="text-xs text-secondary">Super Admin</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-black font-black">M</div>
          </div>
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
