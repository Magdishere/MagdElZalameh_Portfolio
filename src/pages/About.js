import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';

const About = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="py-20 space-y-20">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-2"
      >
        <p className="text-primary font-medium tracking-widest uppercase text-sm">About Me</p>
        <h2 className="text-5xl font-bold">My Story</h2>
      </motion.div>

      <div className="flex flex-col md:flex-row items-center gap-20">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2"
        >
          <div className="relative group">
            <div className="w-full aspect-square bg-accent rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:-translate-y-2">
              <img src="/office.png" alt="Work Desk" className="object-cover w-full h-full" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary bg-opacity-20 rounded-full blur-2xl -z-10 group-hover:scale-110 transition-transform"></div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 space-y-8"
        >
          <div className="space-y-4">
            <h3 className="text-3xl font-bold">MERN Stack Developer based in Lebanon</h3>
            <p className="text-secondary text-lg leading-relaxed">
              I specialize in building dynamic and responsive web applications using MongoDB, Express.js, React, and Node.js. My journey in web development started with a passion for creating things that live on the internet, and it has evolved into a career dedicated to crafting high-quality digital experiences.
            </p>
            <p className="text-secondary text-lg leading-relaxed">
              I am committed to writing clean, maintainable code and staying up-to-date with the latest industry trends. Whether it's architecting a complex backend API or designing a seamless user interface, I bring a detail-oriented approach to every project.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent bg-opacity-20 rounded-xl flex items-center justify-center text-primary border border-secondary border-opacity-10"><FaEnvelope size={20} /></div>
              <div>
                <p className="text-[10px] text-secondary uppercase font-bold tracking-widest">Email</p>
                <p className="font-semibold hover:text-primary transition-colors">
                  <a href="mailto:magdelzalameh6@gmail.com">magdelzalameh6@gmail.com</a>
                </p>
              </div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent bg-opacity-20 rounded-xl flex items-center justify-center text-primary border border-secondary border-opacity-10"><FaWhatsapp size={20} /></div>
              <div>
                <p className="text-[10px] text-secondary uppercase font-bold tracking-widest">WhatsApp</p>
                <p className="font-semibold hover:text-primary transition-colors">
                  <a href="https://wa.me/96176326960" target="_blank" rel="noopener noreferrer">+961 76 326 960</a>
                </p>
              </div>
            </motion.div>
          </div>

          <div className="pt-4 flex gap-4">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://my-portfolio-7mch.onrender.com/api/download-cv" 
              className="btn-primary rounded-full px-8 inline-block text-center pt-2"
              download
            >
              Download CV
            </motion.a>
            <div className="flex gap-2">
              <motion.a whileHover={{ y: -5 }} href="https://github.com/Magdishere/" className="w-12 h-12 border border-secondary border-opacity-20 rounded-full flex items-center justify-center hover:text-primary hover:border-primary transition-all"><FaGithub size={20} /></motion.a>
              <motion.a whileHover={{ y: -5 }} href="https://www.linkedin.com/in/magd-el-zalameh-0b31bb208/" className="w-12 h-12 border border-secondary border-opacity-20 rounded-full flex items-center justify-center hover:text-primary hover:border-primary transition-all"><FaLinkedin size={20} /></motion.a>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: 'Full Stack Development', desc: 'Building complete web applications from database to frontend using the MERN stack.' },
          { title: 'API Integration', desc: 'Designing and implementing robust RESTful APIs with Express and Node.js.' },
          { title: 'UI/UX Design', desc: 'Creating modern, responsive, and user-centric interfaces with React and Tailwind CSS.' }
        ].map((service, index) => (
          <motion.div 
            {...fadeInUp}
            transition={{ delay: index * 0.1 }}
            key={index} 
            className="glass-card p-10 rounded-2xl bg-accent bg-opacity-10 border border-secondary border-opacity-10 hover:border-primary transition-all group"
          >
            <h4 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">{service.title}</h4>
            <p className="text-secondary leading-relaxed">{service.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default About;
