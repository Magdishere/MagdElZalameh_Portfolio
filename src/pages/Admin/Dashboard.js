import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaProjectDiagram, FaStar, FaEnvelope, FaUsers } from 'react-icons/fa';
import { fetchProjects, fetchSkills, fetchMessages, fetchVisitorCount } from '../../features/dataSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { projects, skills, messages, visitorCount } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchSkills());
    dispatch(fetchMessages());
    dispatch(fetchVisitorCount());
  }, [dispatch]);

  const stats = [
    { name: 'Total Visitors', count: visitorCount, icon: <FaUsers size={28} />, path: '/admin' },
    { name: 'Projects', count: projects.length, icon: <FaProjectDiagram size={28} />, path: '/admin/projects' },
    { name: 'Skills', count: skills.length, icon: <FaStar size={28} />, path: '/admin/skills' },
    { name: 'Messages', count: messages.length, icon: <FaEnvelope size={28} />, path: '/admin/messages' },
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <motion.div
            key={stat.name}
            whileHover={{ scale: 1.05, translateY: -5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Link 
              to={stat.path}
              className="glass-card p-6 rounded-xl bg-accent bg-opacity-10 border border-secondary border-opacity-10 flex items-center justify-between hover:border-primary transition-colors block group"
            >
              <div>
                <h3 className="text-xl font-semibold mb-2 text-secondary group-hover:text-white transition-colors">{stat.name}</h3>
                <p className="text-4xl font-bold text-primary">{stat.count}</p>
              </div>
              <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
                {stat.icon}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
