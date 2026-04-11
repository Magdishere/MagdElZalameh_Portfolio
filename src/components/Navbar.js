import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Portfolio', path: '/projects' },
    { name: 'Skills', path: '/skills' },
    { name: 'Experience', path: '/experience' },
    { name: 'Contact', path: '/contact', isButton: true },
  ];

  return (
    <nav className="fixed w-full z-[100] bg-background/80 backdrop-blur-xl border-b border-white/5 py-4 px-5 md:px-20 flex justify-between items-center transition-all duration-300">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/" className="text-2xl font-black tracking-tighter group">
          MAGD<span className="text-primary group-hover:animate-pulse">.</span>
        </Link>
      </motion.div>
      
      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-8">
        {navLinks.map((link) => (
          <Link 
            key={link.name}
            to={link.path} 
            className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
              link.isButton 
                ? 'bg-primary hover:bg-white hover:text-black px-6 py-2.5 rounded-full text-black' 
                : location.pathname === link.path ? 'text-primary' : 'text-secondary hover:text-white'
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden z-[110]">
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="w-11 h-11 flex items-center justify-center bg-accent/50 rounded-full text-primary focus:outline-none border border-white/5 active:scale-90 transition-transform"
          aria-label="Toggle Menu"
        >
          {isOpen ? <HiX size={22} /> : <HiMenuAlt3 size={22} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 w-full h-screen bg-background z-[105] flex flex-col justify-center items-center p-6 md:hidden"
          >
            {/* Decorative background blur */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
            
            <div className="flex flex-col items-center space-y-6 w-full max-w-xs relative z-10">
              {navLinks.map((link, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={link.name}
                  className="w-full text-center"
                >
                  <Link 
                    to={link.path} 
                    onClick={() => setIsOpen(false)} 
                    className={`block w-full text-3xl font-black tracking-tighter transition-all ${
                      link.isButton
                        ? 'text-primary bg-white/5 py-4 rounded-2xl border border-white/5'
                        : location.pathname === link.path ? 'text-primary' : 'text-white hover:text-primary'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
