import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="bg-background min-h-screen text-white">
      <Navbar />
      <main className="pt-20 px-4 md:px-20">
        <Outlet />
      </main>
      <footer className="py-10 text-center text-secondary border-t border-secondary border-opacity-10 mt-20 text-xs tracking-widest uppercase">
        © 2026. Designed by Magd El Zalameh. All right reserved.
      </footer>
    </div>
  );
};

export default MainLayout;
