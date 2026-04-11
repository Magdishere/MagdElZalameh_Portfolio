import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaGithub, FaExternalLinkAlt, FaSpinner } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { fetchProjects } from '../features/dataSlice';

const Projects = () => {
  const dispatch = useDispatch();
  const { projects, isLoading } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchProjects());
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

  const getImageUrl = (path) => {
    if (!path) return 'https://via.placeholder.com/600x400?text=MERN+Project';
    return path.startsWith('http') ? path : `https://my-portfolio-7mch.onrender.com${path}`;
  };

  return (
    <div className="py-20 space-y-12">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <p className="text-primary font-medium tracking-widest uppercase text-sm">Portfolio</p>
        <h2 className="text-5xl font-bold">My Featured Works</h2>
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.length > 0 ? projects.map((project) => (
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              key={project._id} 
              className="group glass-card rounded-2xl overflow-hidden bg-accent bg-opacity-10 border border-secondary border-opacity-10 flex flex-col h-full hover:border-primary transition-all duration-300 shadow-xl"
            >
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={getImageUrl(project.images[0])} 
                  alt={project.title} 
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-primary bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  {project.links?.github && (
                    <motion.a whileHover={{ scale: 1.2 }} href={project.links.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-white text-primary rounded-full">
                      <FaGithub size={20} />
                    </motion.a>
                  )}
                  {project.links?.live && (
                    <motion.a whileHover={{ scale: 1.2 }} href={project.links.live} target="_blank" rel="noopener noreferrer" className="p-3 bg-white text-primary rounded-full">
                      <FaExternalLinkAlt size={20} />
                    </motion.a>
                  )}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col space-y-4">
                <h3 className="text-2xl font-bold">{project.title}</h3>
                <p className="text-secondary text-sm flex-1 leading-relaxed line-clamp-3">{project.description}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.techStack?.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-primary bg-opacity-10 text-primary text-[10px] font-bold uppercase tracking-widest rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )) : (
            <div className="col-span-full py-20 text-center text-secondary font-medium">
              No projects found. Add some in the admin dashboard!
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Projects;
