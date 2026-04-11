import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaPlus, FaEdit, FaTrash, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { CgSpinner } from 'react-icons/cg';
import { fetchProjects, createProject, updateProject, deleteProject } from '../../features/dataSlice';
import Modal from '../../components/Modal';

const ManageProjects = () => {
  const dispatch = useDispatch();
  const { projects, isLoading } = useSelector((state) => state.data);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [formData, setFormData] = useState({ 
    title: '', 
    description: '', 
    techStack: '', 
    github: '', 
    live: '' 
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  // Pagination Logic
  const sortedProjects = [...projects].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedProjects.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(projects.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleOpenModal = (project = null) => {
    if (project) {
      setCurrentProject(project);
      setFormData({
        title: project.title,
        description: project.description || '',
        techStack: project.techStack ? project.techStack.join(', ') : '',
        github: project.links?.github || '',
        live: project.links?.live || ''
      });
      setExistingImages(project.images || []);
    } else {
      setCurrentProject(null);
      setFormData({ title: '', description: '', techStack: '', github: '', live: '' });
      setExistingImages([]);
    }
    setSelectedFiles([]);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentProject(null);
    setSelectedFiles([]);
    setExistingImages([]);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setSelectedFiles([...e.target.files]);
  };

  const removeExistingImage = (index) => {
    setExistingImages(existingImages.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('techStack', formData.techStack);
    data.append('links', JSON.stringify({
      github: formData.github,
      live: formData.live
    }));
    
    // Append new files
    selectedFiles.forEach(file => {
      data.append('images', file);
    });
    
    // Append existing images if editing
    if (currentProject) {
      data.append('existingImages', JSON.stringify(existingImages));
      dispatch(updateProject({ id: currentProject._id, projectData: data }));
    } else {
      dispatch(createProject(data));
    }
    handleCloseModal();
  };

  const handleDeleteClick = (project) => {
    setCurrentProject(project);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    dispatch(deleteProject(currentProject._id));
    setIsDeleteModalOpen(false);
    setCurrentProject(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Manage Projects</h2>
        <button 
          onClick={() => handleOpenModal()}
          className="btn-primary flex items-center gap-2 px-6 py-2 rounded-lg font-bold uppercase tracking-wider text-sm"
        >
          <FaPlus size={18} /> Add Project
        </button>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-20">
          <CgSpinner className="animate-spin text-primary" size={40} />
        </div>
      ) : (
        <div className="glass-card overflow-x-auto rounded-xl bg-accent bg-opacity-10 border border-secondary border-opacity-10">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead className="bg-white bg-opacity-5 border-b border-secondary border-opacity-10">
              <tr>
                <th className="p-4 font-semibold uppercase text-xs tracking-wider text-secondary">Title</th>
                <th className="p-4 font-semibold uppercase text-xs tracking-wider text-secondary">Tech Stack</th>
                <th className="p-4 font-semibold uppercase text-xs tracking-wider text-secondary text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary divide-opacity-10">
              {currentItems.length > 0 ? currentItems.map((project) => (
                <tr key={project._id} className="hover:bg-white hover:bg-opacity-5 transition-colors">
                  <td className="p-4 font-medium">{project.title}</td>
                  <td className="p-4 text-secondary text-sm">
                    {project.techStack?.slice(0, 3).join(', ')}{project.techStack?.length > 3 ? '...' : ''}
                  </td>
                  <td className="p-4 text-right space-x-4">
                    <button 
                      onClick={() => handleOpenModal(project)}
                      className="text-primary hover:text-white transition-colors" 
                      title="Edit"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button 
                      onClick={() => handleDeleteClick(project)}
                      className="text-red-400 hover:text-red-300 transition-colors" 
                      title="Delete"
                    >
                      <FaTrash size={18} />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="3" className="p-8 text-center text-secondary">No projects found. Add your first MERN stack project!</td>
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
        title={currentProject ? 'Edit Project' : 'Add New Project'}
      >
        <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Title</label>
            <input 
              type="text" name="title" value={formData.title} onChange={handleInputChange} required
              placeholder="e.g., E-Commerce Platform"
              className="w-full bg-background border border-secondary border-opacity-20 p-3 rounded-lg focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Tech Stack (comma separated)</label>
            <input 
              type="text" name="techStack" value={formData.techStack} onChange={handleInputChange}
              placeholder="e.g., MongoDB, Express, React, Node.js"
              className="w-full bg-background border border-secondary border-opacity-20 p-3 rounded-lg focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Description</label>
            <textarea 
              name="description" value={formData.description} onChange={handleInputChange} rows="3" required
              placeholder="Describe your MERN stack project..."
              className="w-full bg-background border border-secondary border-opacity-20 p-3 rounded-lg focus:outline-none focus:border-primary"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Project Images</label>
            
            {/* Existing Images */}
            {existingImages.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4 p-2 border border-secondary border-opacity-10 rounded-lg">
                {existingImages.map((img, idx) => (
                  <div key={idx} className="relative group">
                    <img 
                      src={getImageUrl(img)} 
                      alt={`Project ${idx}`} 
                      className="w-16 h-16 object-cover rounded border border-white/10" 
                    />
                    <button 
                      type="button"
                      onClick={() => removeExistingImage(idx)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <FaTrash size={10} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* New File Previews */}
            {selectedFiles.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4 p-2 border border-primary border-opacity-10 rounded-lg">
                {selectedFiles.map((file, idx) => (
                  <div key={idx} className="relative">
                    <img 
                      src={URL.createObjectURL(file)} 
                      alt={`New ${idx}`} 
                      className="w-16 h-16 object-cover rounded border border-primary/30" 
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-secondary border-dashed rounded-lg hover:border-primary transition-colors cursor-pointer relative">
              <div className="space-y-1 text-center">
                <svg className="mx-auto h-12 w-12 text-secondary" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="flex text-sm text-secondary">
                  <span className="relative cursor-pointer bg-transparent rounded-md font-medium text-primary hover:text-white">
                    Upload images
                  </span>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-secondary/60">PNG, JPG up to 10MB</p>
              </div>
              <input 
                type="file" multiple name="images" onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">GitHub Link</label>
              <div className="relative">
                <FaGithub size={18} className="absolute left-3 top-3.5 text-secondary" />
                <input 
                  type="text" name="github" value={formData.github} onChange={handleInputChange}
                  placeholder="GitHub Repo URL"
                  className="w-full bg-background border border-secondary border-opacity-20 p-3 pl-10 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">Live Demo Link</label>
              <div className="relative">
                <FaExternalLinkAlt size={18} className="absolute left-3 top-3.5 text-secondary" />
                <input 
                  type="text" name="live" value={formData.live} onChange={handleInputChange}
                  placeholder="Deployment URL"
                  className="w-full bg-background border border-secondary border-opacity-20 p-3 pl-10 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>
          <div className="pt-4">
            <button type="submit" className="btn-primary w-full py-3 rounded-lg font-bold uppercase tracking-widest">
              {currentProject ? 'Update Project' : 'Create Project'}
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
          <p className="text-lg">Are you sure you want to delete <span className="font-bold text-primary">{currentProject?.title}</span>?</p>
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

export default ManageProjects;
nt-bold transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ManageProjects;
