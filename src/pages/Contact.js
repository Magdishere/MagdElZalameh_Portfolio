import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaWhatsapp } from 'react-icons/fa';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });
    try {
      await axios.post('https://my-portfolio-7mch.onrender.com/api/contacts', formData);
      setStatus({ loading: false, success: true, error: null });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus({ loading: false, success: false, error: 'Failed to send message. Please try again.' });
    }
  };

  return (
    <div className="py-20 space-y-12">
      <div className="text-center space-y-2">
        <p className="text-primary font-medium tracking-widest uppercase">Get In Touch</p>
        <h2 className="text-5xl font-bold">Contact Me</h2>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="bg-accent bg-opacity-10 p-8 rounded-2xl border border-secondary border-opacity-10 text-center space-y-4">
          <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center text-primary mx-auto">
            <FaEnvelope size={24} />
          </div>
          <h3 className="text-xl font-bold">Email</h3>
          <p className="text-secondary hover:text-primary transition-colors">
            <a href="mailto:magdelzalameh6@gmail.com">magdelzalameh6@gmail.com</a>
          </p>
        </div>
        
        <div className="bg-accent bg-opacity-10 p-8 rounded-2xl border border-secondary border-opacity-10 text-center space-y-4">
          <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center text-primary mx-auto">
            <FaWhatsapp size={24} />
          </div>
          <h3 className="text-xl font-bold">WhatsApp</h3>
          <p className="text-secondary hover:text-primary transition-colors">
            <a href="https://wa.me/96176326960" target="_blank" rel="noopener noreferrer">+961 76 326 960</a>
          </p>
        </div>
        
        <div className="bg-accent bg-opacity-10 p-8 rounded-2xl border border-secondary border-opacity-10 text-center space-y-4">
          <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center text-primary mx-auto">
            <FaMapMarkerAlt size={24} />
          </div>
          <h3 className="text-xl font-bold">Location</h3>
          <p className="text-secondary">Kousba, El Koura - North Lebanon</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto glass-card p-10 rounded-2xl bg-accent bg-opacity-10 border border-secondary border-opacity-10">
        <p className="text-secondary text-lg text-center mb-10">
          Feel free to reach out for collaborations or just a friendly hello!
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input 
              type="text" name="name" value={formData.name} onChange={handleChange} required
              placeholder="Name" className="w-full bg-background border border-secondary border-opacity-20 p-4 rounded-xl focus:outline-none focus:border-primary transition-colors" 
            />
            <input 
              type="email" name="email" value={formData.email} onChange={handleChange} required
              placeholder="Email" className="w-full bg-background border border-secondary border-opacity-20 p-4 rounded-xl focus:outline-none focus:border-primary transition-colors" 
            />
          </div>
          <input 
            type="text" name="subject" value={formData.subject} onChange={handleChange} required
            placeholder="Subject" className="w-full bg-background border border-secondary border-opacity-20 p-4 rounded-xl focus:outline-none focus:border-primary transition-colors" 
          />
          <textarea 
            name="message" value={formData.message} onChange={handleChange} required
            placeholder="Message" rows="5" className="w-full bg-background border border-secondary border-opacity-20 p-4 rounded-xl focus:outline-none focus:border-primary transition-colors"
          ></textarea>
          
          {status.success && <p className="text-green-500 text-center font-medium">Message sent successfully!</p>}
          {status.error && <p className="text-red-500 text-center font-medium">{status.error}</p>}
          
          <button 
            type="submit" 
            disabled={status.loading}
            className="btn-primary w-full py-4 rounded-xl uppercase tracking-widest font-bold flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <FaPaperPlane /> {status.loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
