import React from 'react';
import { HiX } from 'react-icons/hi';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm">
      <div className="bg-background border border-secondary border-opacity-20 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-6 border-b border-secondary border-opacity-10">
          <h3 className="text-xl font-bold">{title}</h3>
          <button onClick={onClose} className="text-secondary hover:text-white transition-colors">
            <HiX size={24} />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
