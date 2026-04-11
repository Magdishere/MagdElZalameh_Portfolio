import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { CgSpinner } from 'react-icons/cg';
import { fetchSkills, createSkill, updateSkill, deleteSkill } from '../../features/dataSlice';
import Modal from '../../components/Modal';

const ManageSkills = () => {
  const dispatch = useDispatch();
  const { skills, isLoading } = useSelector((state) => state.data);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentSkill, setCurrentSkill] = useState(null);
  const [formData, setFormData] = useState({ name: '', level: 90, category: '' });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(fetchSkills());
  }, [dispatch]);

  // Pagination Logic
  const sortedSkills = [...skills].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedSkills.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(skills.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleOpenModal = (skill = null) => {
    if (skill) {
      setCurrentSkill(skill);
      setFormData({
        name: skill.name,
        level: skill.level,
        category: skill.category || ''
      });
    } else {
      setCurrentSkill(null);
      setFormData({ name: '', level: 90, category: '' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentSkill(null);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentSkill) {
      dispatch(updateSkill({ id: currentSkill._id, skillData: formData }));
    } else {
      dispatch(createSkill(formData));
    }
    handleCloseModal();
  };

  const handleDeleteClick = (skill) => {
    setCurrentSkill(skill);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    dispatch(deleteSkill(currentSkill._id));
    setIsDeleteModalOpen(false);
    setCurrentSkill(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Manage Skills</h2>
        <button 
          onClick={() => handleOpenModal()}
          className="btn-primary flex items-center gap-2 px-6 py-2 rounded-lg font-bold uppercase tracking-wider text-sm"
        >
          <FaPlus size={18} /> Add Skill
        </button>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-20">
          <CgSpinner className="animate-spin text-primary" size={40} />
        </div>
      ) : (
        <div className="glass-card overflow-x-auto rounded-xl bg-accent bg-opacity-10 border border-secondary border-opacity-10">
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead className="bg-white bg-opacity-5 border-b border-secondary border-opacity-10">
              <tr>
                <th className="p-4 font-semibold uppercase text-xs tracking-wider text-secondary">Skill Name</th>
                <th className="p-4 font-semibold uppercase text-xs tracking-wider text-secondary">Level (%)</th>
                <th className="p-4 font-semibold uppercase text-xs tracking-wider text-secondary">Category</th>
                <th className="p-4 font-semibold uppercase text-xs tracking-wider text-secondary text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary divide-opacity-10">
              {currentItems.length > 0 ? currentItems.map((skill) => (
                <tr key={skill._id} className="hover:bg-white hover:bg-opacity-5 transition-colors">
                  <td className="p-4 font-medium">{skill.name}</td>
                  <td className="p-4 text-secondary">{skill.level}%</td>
                  <td className="p-4 text-secondary">{skill.category || 'N/A'}</td>
                  <td className="p-4 text-right space-x-4">
                    <button 
                      onClick={() => handleOpenModal(skill)}
                      className="text-primary hover:text-white transition-colors" 
                      title="Edit"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button 
                      onClick={() => handleDeleteClick(skill)}
                      className="text-red-400 hover:text-red-300 transition-colors" 
                      title="Delete"
                    >
                      <FaTrash size={18} />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-secondary">No skills found. Add your first skill!</td>
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
        title={currentSkill ? 'Edit Skill' : 'Add New Skill'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Skill Name</label>
            <input 
              type="text" name="name" value={formData.name} onChange={handleInputChange} required
              className="w-full bg-background border border-secondary border-opacity-20 p-3 rounded-lg focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Level (%)</label>
            <input 
              type="number" name="level" value={formData.level} onChange={handleInputChange} min="0" max="100" required
              className="w-full bg-background border border-secondary border-opacity-20 p-3 rounded-lg focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Category (e.g., Frontend, Backend, Tools)</label>
            <input 
              type="text" name="category" value={formData.category} onChange={handleInputChange}
              className="w-full bg-background border border-secondary border-opacity-20 p-3 rounded-lg focus:outline-none focus:border-primary"
            />
          </div>
          <div className="pt-4">
            <button type="submit" className="btn-primary w-full py-3 rounded-lg font-bold uppercase tracking-widest">
              {currentSkill ? 'Update Skill' : 'Create Skill'}
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
          <p className="text-lg">Are you sure you want to delete <span className="font-bold text-primary">{currentSkill?.name}</span>?</p>
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

export default ManageSkills;
