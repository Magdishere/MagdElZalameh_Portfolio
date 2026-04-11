import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaGithub, FaLinkedin, FaExternalLinkAlt, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import axios from 'axios';
import { motion } from 'framer-motion';
import { fetchProjects, fetchSkills, fetchExperience } from '../features/dataSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { projects, skills, experience } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchSkills());
    dispatch(fetchExperience());
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
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative py-12 flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden">
        {/* Decorative Background Element */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full blur-3xl"
        ></motion.div>
        
        <div className="md:w-3/5 space-y-6 z-10 text-center md:text-left">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent border border-white/5 text-[10px] font-bold uppercase tracking-widest text-primary animate-pulse"
          >
            <span className="w-2 h-2 rounded-full bg-primary"></span>
            Available for new projects
          </motion.div>
          
          <div className="space-y-2">
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-secondary font-medium tracking-[0.3em] uppercase text-xs opacity-80"
            >
              Full Stack Developer
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[0.9]"
            >
              Magd <span className="text-primary font-light italic">El Zalameh</span>
            </motion.h1>
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-secondary/70 text-sm md:text-base max-w-md leading-relaxed"
          >
            Crafting high-performance <span className="text-white">MERN stack</span> applications with a focus on clean architecture and exceptional user experiences.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-2"
          >
            <button className="btn-primary rounded-full px-8 py-3 text-xs md:text-sm uppercase font-bold tracking-widest w-full sm:w-auto">
              Start a Project
            </button>
            
            <div className="flex items-center gap-3 p-1.5 rounded-full bg-accent/30 border border-white/5 backdrop-blur-sm">
              <a href="https://github.com/Magdishere" className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full hover:bg-primary hover:text-black transition-all duration-300"><FaGithub size={18} /></a>
              <a href="https://www.linkedin.com/in/magd-el-zalameh-0b31bb208/" className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full hover:bg-primary hover:text-black transition-all duration-300"><FaLinkedin size={18} /></a>
              <div className="h-4 w-[1px] bg-white/10 mx-1"></div>
              <span className="pr-4 text-[9px] md:text-[10px] font-bold uppercase tracking-tighter text-secondary">Follow Me</span>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            rotate: 0,
            y: [0, -10, 0] 
          }}
          transition={{ 
            opacity: { duration: 1, delay: 0.4 },
            scale: { duration: 1, delay: 0.4 },
            rotate: { duration: 1, delay: 0.4 },
            y: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          className="md:w-1/2 flex justify-center z-10"
        >
          <div className="relative group">
            {/* Animated Ring */}
            <div className="absolute inset-0 border border-primary/20 rounded-2xl -m-4 group-hover:scale-105 transition-transform duration-500 -z-10"></div>
            
            <div className="w-[260px] h-[340px] md:w-[320px] md:h-[420px] relative">
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10"></div>
              <div className="w-full h-full bg-accent rounded-2xl overflow-hidden transition-all duration-1000 border border-white/10 shadow-2xl">
                <img 
                  src="/me.png" 
                  alt="Magd El Zalameh" 
                  className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-1000 transform group-hover:scale-105" 
                />
              </div>
              
              {/* Info Badge */}
              <motion.div 
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -bottom-4 -right-4 bg-accent border border-white/10 p-4 rounded-xl shadow-2xl backdrop-blur-md z-20"
              >
                <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Experience</p>
                <p className="text-xl font-black">2+ Years</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <motion.section 
        {...fadeInUp}
        className="flex flex-col md:flex-row items-center gap-20 py-20"
      >
        <div className="md:w-2/5">
           <motion.div 
             whileHover={{ scale: 1.02 }}
             className="w-full aspect-[4/5] bg-accent rounded-2xl overflow-hidden shadow-2xl border border-white/5"
           >
              <img src="/office.png" alt="About" className="object-cover w-full h-full" />
           </motion.div>
        </div>
        <div className="md:w-3/5 space-y-8">
           <div className="space-y-2">
              <p className="text-primary font-medium tracking-widest uppercase text-sm">About Me</p>
              <h2 className="text-5xl font-bold">Hi There! I'm Magd Zalameh</h2>
              <p className="text-primary font-medium">MERN Stack Developer</p>
           </div>
           <p className="text-secondary leading-relaxed text-lg">
              I am a passionate Full Stack Developer specializing in the MERN stack (MongoDB, Express.js, React.js, Node.js). I love building scalable, high-performance web applications and solving complex problems with elegant code.
           </p>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 pt-4 text-sm md:text-base">
              <div className="flex items-center gap-3"><FaEnvelope className="text-primary" size={18} /> magdelzalameh6@gmail.com</div>
              <div className="flex items-center gap-3"><FaMapMarkerAlt className="text-primary" size={18} /> Kousba, El Koura - North Lebanon</div>
              <div className="flex items-center gap-3">
                <FaPhone className="text-primary" size={18} /> 
                <a href="https://wa.me/96176326960" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">+961 76 326 960</a>
              </div>
           </div>
           <a 
             href="https://my-portfolio-7mch.onrender.com/api/download-cv" 
             className="btn-primary mt-6 inline-block"
             download
           >
             Download CV
           </a>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section 
        {...fadeInUp}
        className="py-20"
      >
         <div className="flex flex-col md:flex-row gap-20">
            <div className="md:w-1/2 space-y-6">
                <p className="text-primary font-medium tracking-widest uppercase text-sm">Expertise</p>
                <h2 className="text-5xl font-bold">Comprehensive technical stack for modern web development.</h2>
                <p className="text-secondary leading-relaxed">
                   I have extensive experience with JavaScript and its ecosystem, focusing on the MERN stack to deliver robust and efficient full-stack solutions.
                </p>
            </div>
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-8 pt-10"
            >
                {Object.keys(categorizedSkills).map(category => (
                  <motion.div 
                    variants={fadeInUp}
                    key={category} 
                    className="space-y-4"
                  >
                    <h3 className="text-xl font-bold text-primary border-b border-primary border-opacity-20 pb-2">{category}</h3>
                    <div className="space-y-4">
                      {categorizedSkills[category].slice(0, 4).map((skill) => (
                        <div key={skill._id} className="space-y-2">
                          <div className="flex justify-between text-sm font-medium">
                            <span>{skill.name}</span>
                            <span>{skill.level}%</span>
                          </div>
                          <div className="h-1 w-full bg-accent bg-opacity-30 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              transition={{ duration: 1, delay: 0.5 }}
                              className="h-full bg-primary"
                            ></motion.div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
            </motion.div>
         </div>
      </motion.section>

      {/* Portfolio Section */}
      <section className="py-20 space-y-12">
         <motion.div {...fadeInUp} className="text-center space-y-2">
            <p className="text-primary font-medium tracking-widest uppercase text-sm">Portfolio</p>
            <h2 className="text-5xl font-bold">My Featured Works</h2>
         </motion.div>
         <motion.div 
           variants={staggerContainer}
           initial="initial"
           whileInView="whileInView"
           viewport={{ once: true }}
           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
         >
            {projects.map((project) => (
               <motion.div 
                 variants={fadeInUp}
                 whileHover={{ y: -10 }}
                 key={project._id} 
                 className="group relative aspect-video bg-accent rounded-2xl overflow-hidden shadow-xl border border-secondary border-opacity-10"
               >
                  <img 
                    src={getImageUrl(project.images[0])} 
                    alt={project.title} 
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-primary bg-opacity-95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-8 text-center space-y-4">
                     <h4 className="text-2xl font-bold">{project.title}</h4>
                     <p className="text-sm line-clamp-3">{project.description}</p>
                     <div className="flex flex-wrap justify-center gap-2">
                        {project.techStack?.slice(0, 3).map(tech => (
                          <span key={tech} className="bg-white bg-opacity-20 px-2 py-1 rounded text-[10px] uppercase font-bold tracking-tighter">{tech}</span>
                        ))}
                     </div>
                     <div className="flex gap-4 pt-2">
                        {project.links?.github && <a href={project.links.github} className="p-2 border border-white rounded-full hover:bg-white hover:text-primary transition-colors"><FaGithub size={18} /></a>}
                        {project.links?.live && <a href={project.links.live} className="p-2 border border-white rounded-full hover:bg-white hover:text-primary transition-colors"><FaExternalLinkAlt size={18} /></a>}
                     </div>
                  </div>
               </motion.div>
            ))}
         </motion.div>
      </section>

      {/* Experience Section */}
      <section className="py-20">
         <motion.div {...fadeInUp} className="text-center space-y-2 mb-16">
            <p className="text-primary font-medium tracking-widest uppercase text-sm">Professional History</p>
            <h2 className="text-5xl font-bold">My Experience</h2>
         </motion.div>
         <motion.div 
           variants={staggerContainer}
           initial="initial"
           whileInView="whileInView"
           viewport={{ once: true }}
           className="max-w-4xl mx-auto space-y-12 pl-4 border-l border-secondary border-opacity-20"
         >
            {experience.map((exp, index) => (
              <motion.div variants={fadeInUp} key={exp._id} className="relative">
                <div className="absolute -left-[21px] top-0 w-4 h-4 rounded-full bg-background border-2 border-primary"></div>
                <motion.div 
                  whileHover={{ x: 10 }}
                  className="bg-accent bg-opacity-10 p-8 rounded-2xl border border-secondary border-opacity-5 hover:border-opacity-20 transition-all"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                    <h4 className="text-2xl font-bold text-primary">{exp.title}</h4>
                    <span className="text-sm text-secondary font-medium uppercase tracking-widest bg-accent bg-opacity-20 px-3 py-1 rounded-full">
                      {exp.from ? new Date(exp.from).getFullYear() : ''} - {exp.current ? 'Present' : (exp.to ? new Date(exp.to).getFullYear() : '')}
                    </span>
                  </div>
                  <p className="text-lg font-medium mt-1">{exp.company}</p>
                  <p className="mt-4 text-secondary leading-relaxed">{exp.description}</p>
                </motion.div>
              </motion.div>
            ))}
         </motion.div>
      </section>

      {/* Contact Section */}
      <motion.section 
        {...fadeInUp}
        className="py-20 grid md:grid-cols-2 gap-20"
      >
         <div className="space-y-8">
            <h2 className="text-5xl font-bold">Let's Connect</h2>
            <p className="text-secondary text-lg">Interested in working together? Drop me a message below!</p>
            <form onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const data = Object.fromEntries(formData.entries());
              try {
                await axios.post('https://my-portfolio-7mch.onrender.com/api/contacts', data);
                alert('Message sent successfully!');
                e.target.reset();
              } catch (err) {
                alert('Failed to send message.');
              }
            }} className="space-y-6">
               <input type="text" name="name" placeholder="Your Name" required className="w-full bg-accent bg-opacity-20 border border-secondary border-opacity-20 p-4 rounded-xl focus:outline-none focus:border-primary transition-colors" />
               <input type="email" name="email" placeholder="Your Email" required className="w-full bg-accent bg-opacity-20 border border-secondary border-opacity-20 p-4 rounded-xl focus:outline-none focus:border-primary transition-colors" />
               <input type="text" name="subject" placeholder="Your Subject" required className="w-full bg-accent bg-opacity-20 border border-secondary border-opacity-20 p-4 rounded-xl focus:outline-none focus:border-primary transition-colors" />
               <textarea name="message" placeholder="Your Message" required rows="5" className="w-full bg-accent bg-opacity-20 border border-secondary border-opacity-20 p-4 rounded-xl focus:outline-none focus:border-primary transition-colors"></textarea>
               <button type="submit" className="btn-primary w-full py-4 rounded-xl uppercase tracking-widest font-bold shadow-lg shadow-primary/20">Send Message</button>
            </form>
         </div>
         <div className="space-y-12">
            <h2 className="text-5xl font-bold invisible md:visible">Contact Info</h2>
            <div className="space-y-8 pt-10">
               <motion.div whileHover={{ x: 5 }} className="flex gap-6">
                  <div className="w-14 h-14 bg-accent bg-opacity-20 rounded-full flex items-center justify-center text-primary border border-secondary border-opacity-10 shadow-inner"><FaEnvelope size={24} /></div>
                  <div>
                     <h4 className="text-xl font-bold">Email</h4>
                     <p className="text-secondary hover:text-primary transition-colors">
                        <a href="mailto:magdelzalameh6@gmail.com">magdelzalameh6@gmail.com</a>
                     </p>
                  </div>
               </motion.div>
               <motion.div whileHover={{ x: 5 }} className="flex gap-6">
                  <div className="w-14 h-14 bg-accent bg-opacity-20 rounded-full flex items-center justify-center text-primary border border-secondary border-opacity-10 shadow-inner"><FaPhone size={24} /></div>
                  <div>
                     <h4 className="text-xl font-bold">WhatsApp</h4>
                     <p className="text-secondary hover:text-primary transition-colors">
                        <a href="https://wa.me/96176326960" target="_blank" rel="noopener noreferrer">+961 76 326 960</a>
                     </p>
                  </div>
               </motion.div>
               <motion.div whileHover={{ x: 5 }} className="flex gap-6">
                  <div className="w-14 h-14 bg-accent bg-opacity-20 rounded-full flex items-center justify-center text-primary border border-secondary border-opacity-10 shadow-inner"><FaMapMarkerAlt size={24} /></div>
                  <div>
                     <h4 className="text-xl font-bold">Address</h4>
                     <p className="text-secondary">Kousba, El Koura - North Lebanon</p>
                     <p className="text-secondary">Mar Elias Street</p>
                  </div>
               </motion.div>
            </div>
         </div>
      </motion.section>
    </div>
  );
};

export default Home;
xt-secondary">Kousba, El Koura - North Lebanon</p>
                     <p className="text-secondary">Mar Elias Street</p>
                  </div>
               </motion.div>
            </div>
         </div>
      </motion.section>
    </div>
  );
};

export default Home;
