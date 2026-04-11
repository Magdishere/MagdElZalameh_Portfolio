import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt, FaSpinner } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { fetchExperience } from '../features/dataSlice';

const Experience = () => {
  const dispatch = useDispatch();
  const { experience, isLoading } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchExperience());
  }, [dispatch]);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    initial: {},
    whileInView: {
      transition: {
        staggerChildren: 0.1
      }
    },
    viewport: { once: true }
  };

  return (
    <div className="py-20 space-y-12">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <p className="text-primary font-medium tracking-widest uppercase text-sm">Career Journey</p>
        <h2 className="text-5xl font-bold">My Professional History</h2>
      </motion.div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <FaSpinner className="animate-spin text-primary" size={48} />
        </div>
      ) : (
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          className="max-w-4xl mx-auto space-y-12 pl-4 border-l border-secondary border-opacity-20"
        >
          {experience.length > 0 ? experience.map((exp) => (
            <div key={exp._id} className="relative group">
              <div className="absolute -left-[21px] top-0 w-4 h-4 rounded-full bg-background border-2 border-primary group-hover:bg-primary transition-colors"></div>
              <motion.div 
                whileHover={{ x: 10 }}
                className="glass-card p-8 rounded-2xl bg-accent bg-opacity-10 border border-secondary border-opacity-10 hover:border-primary transition-all"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-4">
                  <h3 className="text-2xl font-bold">{exp.title}</h3>
                  <span className="text-sm text-secondary font-bold uppercase tracking-widest">
                    {exp.from ? new Date(exp.from).getFullYear() : ''} - {exp.current ? 'Present' : (exp.to ? new Date(exp.to).getFullYear() : '')}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-primary font-medium mb-2">
                  <FaBriefcase size={16} />
                  <span>{exp.company}</span>
                  {exp.location && (
                    <>
                      <span className="text-secondary mx-1">•</span>
                      <span className="flex items-center gap-1 text-secondary text-sm font-normal">
                        <FaMapMarkerAlt size={14} />
                        {exp.location}
                      </span>
                    </>
                  )}
                </div>
                <p className="text-secondary text-sm leading-relaxed">
                  {exp.description}
                </p>
              </motion.div>
            </div>
          )) : (
            <div className="py-20 text-center text-secondary col-span-full">
              No experience found. Add your career history in the admin dashboard!
            </div>
          )}
        </motion.div>
      )}

      {/* Education Section */}
      <div className="mt-20 pt-20 border-t border-secondary border-opacity-10">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h2 className="text-4xl font-bold">Education</h2>
        </motion.div>
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          className="max-w-4xl mx-auto space-y-12 pl-4 border-l border-secondary border-opacity-20"
        >
          {[
            { 
              degree: 'Master Degree in Computer and Communication Engineering', 
              school: 'Lebanese International University', 
              year: '2019 - 2021',
              desc: 'Dahr El Ain Road, Al‐Haykalieh, Tripoli, North Lebanon, Lebanon'
            },
            { 
              degree: 'Bachelor Degree in Telecommunication Engineering', 
              school: 'Lebanese International University', 
              year: '2014 - 2019',
              desc: 'Dahr El Ain Road, Al‐Haykalieh, Tripoli, North Lebanon, Lebanon'
            }
          ].map((edu, index) => (
            <motion.div variants={fadeInUp} key={index} className="relative group">
              <div className="absolute -left-[21px] top-0 w-4 h-4 rounded-full bg-background border-2 border-primary group-hover:bg-primary transition-colors"></div>
              <motion.div 
                whileHover={{ x: 10 }}
                className="glass-card p-8 rounded-2xl bg-accent bg-opacity-10 border border-secondary border-opacity-10 hover:border-primary transition-all"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-4">
                  <h3 className="text-2xl font-bold">{edu.degree}</h3>
                  <span className="text-sm text-secondary font-bold uppercase tracking-widest">{edu.year}</span>
                </div>
                <p className="text-primary font-medium mb-2">{edu.school}</p>
                <p className="text-secondary text-sm leading-relaxed">{edu.desc}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Experience;
