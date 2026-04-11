import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { CgSpinner } from 'react-icons/cg';
import { fetchExperience, createExperience, updateExperience, deleteExperience } from '../../features/dataSlice';
import Modal from '../../components/Modal';

const ManageExperience = () => {
  const dispatch = useDispatch();
  const { experience, isLoading } = useSelector((state) => state.data);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentExp, setCurrentExp] = useState(null);
  const [formData, setFormData] = useState({ title: '', company: '', location: '', from: '', to: '', current: false, description: '' });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(fetchExperience());
  }, [dispatch]);

  // Pagination Logic
  const sortedExperience = [...experience].sort((a, b) => {
    if (a.current && !b.current) return -1;
    if (!a.current && b.current) return 1;
    return new Date(b.from) - new Date(a.from);
  });
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedExperience.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(experience.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleOpenModal = (exp = null) => {
    if (exp) {
      setCurrentExp(exp);
      setFormData({
        title: exp.title,
        company: exp.company,
        location: exp.location || '',
        from: exp.from ? exp.from.split('T')[0] : '',
        to: exp.to ? exp.to.split('T')[0] : '',
        current: exp.current || false,
        description: exp.description || ''
      });
    } else {
      setCurrentExp(null);
      setFormData({ title: '', company: '', location: '', from: '', to: '', current: false, description: '' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentExp(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentExp) {
      dispatch(updateExperience({ id: currentExp._id, expData: formData }));
    } else {
      dispatch(createExperience(formData));
    }
    handleCloseModal();
  };

  const handleDeleteClick = (exp) => {
    setCurrentExp(exp);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    dispatch(deleteExperience(currentExp._id));
    setIsDeleteModalOpen(false);
    setCurrentExp(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Manage Experience</h2>
        <button 
          onClick={() => handleOpenModal()}
          className="btn-primary flex items-center gap-2 px-6 py-2 rounded-lg font-bold uppercase tracking-wider text-sm"
        >
          <FaPlus size={18} /> Add Experience
        </button>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-20">
          <CgSpinner className="animate-spin text-primary" size={40} />
        </div>
      ) : (
        <div className="glass-card overflow-x-auto rounded-xl bg-accent bg-opacity-10 border border-secondary border-opacity-10">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead className="bg-white bg-opacity-5 border-b border-secondary border-opacity-10">
              <tr>
                <th className="p-4 font-semibold uppercase text-xs tracking-wider text-secondary">Title</th>
                <th className="p-4 font-semibold uppercase text-xs tracking-wider text-secondary">Company</th>
                <th className="p-4 font-semibold uppercase text-xs tracking-wider text-secondary">Period</th>
                <th className="p-4 font-semibold uppercase text-xs tracking-wider text-secondary text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary divide-opacity-10">
              {currentItems.length > 0 ? currentItems.map((exp) => (
                <tr key={exp._id} className="hover:bg-white hover:bg-opacity-5 transition-colors">
                  <td className="p-4 font-medium">{exp.title}</td>
                  <td className="p-4 text-secondary">{exp.company}</td>
                  <td className="p-4 text-secondary text-sm">
                    {exp.from ? new Date(exp.from).toLocaleDateString() : 'N/A'} - {exp.current ? 'Present' : (exp.to ? new Date(exp.to).toLocaleDateString() : 'N/A')}
                  </td>
                  <td className="p-4 text-right space-x-4">
                    <button 
                      onClick={() => handleOpenModal(exp)}
                      className="text-primary hover:text-white transition-colors" 
                      title="Edit"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button 
                      onClick={() => handleDeleteClick(exp)}
                      className="text-red-400 hover:text-red-300 transition-colors" 
                      title="Delete"
                    >
                      <FaTrash size={18} />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-secondary">No experience found. Add your first experience!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Controls */}
      {!isLoading && totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-4">
          <button 
            onClick={() => paginate(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg bg-accent bg-opacity-20 border border-secondary border-opacity-10 disabled:opacity-30 hover:bg-opacity-40 transition-all"
          >
            Prev
          </button>
          
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx + 1}
              onClick={() => paginate(idx + 1)}
              className={`w-10 h-10 rounded-lg border transition-all ${
                currentPage === idx + 1 
                ? 'bg-primary border-primary text-black font-bold' 
                : 'bg-accent bg-opacity-20 border-secondary border-opacity-10 hover:bg-opacity-40'
              }`}
            >
              {idx + 1}
            </button>
          ))}

          <button 
            onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg bg-accent bg-opacity-20 border border-secondary border-opacity-10 disabled:opacity-30 hover:bg-opacity-40 transition-all"
          >
            Next
          </button>
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        title={currentExp ? 'Edit Experience' : 'Add New Experience'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">Job Title</label>
              <input 
                type="text" name="title" value={formData.title} onChange={handleInputChange} required
                className="w-full bg-background border border-secondary border-opacity-20 p-3 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">Company</label>
              <input 
                type="text" name="company" value={formData.company} onChange={handleInputChange} required
                className="w-full bg-background border border-secondary border-opacity-20 p-3 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Location</label>
            <input 
              type="text" name="location" value={formData.location} onChange={handleInputChange}
              className="w-full bg-background border border-secondary border-opacity-20 p-3 rounded-lg focus:outline-none focus:border-primary"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">From Date</label>
              <input 
                type="date" name="from" value={formData.from} onChange={handleInputChange} required
                className="w-full bg-background border border-secondary border-opacity-20 p-3 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">To Date</label>
              <input 
                type="date" name="to" value={formData.to} onChange={handleInputChange} disabled={formData.current}
                className="w-full bg-background border border-secondary border-opacity-20 p-3 rounded-lg focus:outline-none focus:border-primary disabled:opacity-50"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input 
              type="checkbox" name="current" checked={formData.current} onChange={handleInputChange} id="current"
              className="w-4 h-4 accent-primary"
            />
            <label htmlFor="current" className="text-sm font-medium text-secondary">Current Position</label>
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Description</label>
            <textarea 
              name="description" value={formData.description} onChange={handleInputChange} rows="3"
              className="w-full bg-background border border-secondary border-opacity-20 p-3 rounded-lg focus:outline-none focus:border-primary"
            ></textarea>
          </div>
          <div className="pt-4">
            <button type="submit" className="btn-primary w-full py-3 rounded-lg font-bold uppercase tracking-widest">
              {currentExp ? 'Update Experience' : 'Create Experience'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)} 
        title="Confirm Delete"
      >
        <div className="space-y-6 text-center">
          <p className="text-lg">Are you sure you want to delete <span className="font-bold text-primary">{currentExp?.title}</span> at <span className="font-bold text-primary">{currentExp?.company}</span>?</p>
          <div className="flex gap-4">
            <button 
              onClick={() => setIsDeleteModalOpen(false)}
              className="flex-1 px-6 py-3 border border-secondary border-opacity-20 rounded-lg hover:bg-white hover:bg-opacity-5 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={confirmDelete}
              className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-bold transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ManageExperience;
