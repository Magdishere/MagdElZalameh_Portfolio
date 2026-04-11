import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CgSpinner } from 'react-icons/cg';
import { motion } from 'framer-motion';
import { fetchSkills } from '../features/dataSlice';

const Skills = () => {
  const dispatch = useDispatch();
  const { skills, isLoading } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchSkills());
  }, [dispatch]);

  // Group skills by category
  const categorizedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
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
        <p className="text-primary font-medium tracking-widest uppercase text-sm">Expertise</p>
        <h2 className="text-5xl font-bold">Technical Stack</h2>
      </motion.div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <CgSpinner className="animate-spin text-primary" size={48} />
        </div>
      ) : (
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {Object.keys(categorizedSkills).length > 0 ? Object.keys(categorizedSkills).map((category) => (
            <motion.div variants={fadeInUp} key={category} className="space-y-6">
              <h3 className="text-2xl font-bold text-primary border-b border-primary border-opacity-20 pb-4 inline-block">{category}</h3>
              <div className="space-y-6">
                {categorizedSkills[category].map((skill) => (
                  <div key={skill._id} className="space-y-2 group">
                    <div className="flex justify-between text-sm font-medium">
                      <span className="group-hover:text-primary transition-colors">{skill.name}</span>
                      <span className="text-secondary">{skill.level}%</span>
                    </div>
                    <div className="h-2 w-full bg-accent bg-opacity-20 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                        className="h-full bg-primary"
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )) : (
            <div className="col-span-full py-20 text-center text-secondary">
              No skills found. Add your technical expertise in the admin dashboard!
            </div>
          )}
        </motion.div>
      )}

      {/* Tools Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-20 pt-20 border-t border-secondary border-opacity-10"
      >
        <div className="text-center mb-10">
           <h3 className="text-3xl font-bold">Workflow & Tools</h3>
        </div>
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          className="flex flex-wrap justify-center gap-4"
        >
           {['Git', 'GitHub', 'VS Code', 'Postman', 'Docker', 'AWS', 'Netlify', 'Vercel', 'Firebase'].map(tool => (
             <motion.span 
               variants={fadeInUp}
               whileHover={{ scale: 1.1, backgroundColor: 'rgba(136, 136, 136, 0.2)' }}
               key={tool} 
               className="px-6 py-3 glass-card rounded-xl bg-accent bg-opacity-10 border border-secondary border-opacity-10 font-medium hover:border-primary hover:text-primary transition-all cursor-default"
             >
               {tool}
             </motion.span>
           ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Skills;
