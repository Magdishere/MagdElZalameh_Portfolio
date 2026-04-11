import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaEye, FaTrash } from 'react-icons/fa';
import { CgSpinner } from 'react-icons/cg';
import { fetchMessages, deleteMessage } from '../../features/dataSlice';
import Modal from '../../components/Modal';

const Messages = () => {
  const dispatch = useDispatch();
  const { messages, isLoading } = useSelector((state) => state.data);
  
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentMsg, setCurrentMsg] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  // Pagination Logic
  const sortedMessages = [...messages].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedMessages.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(messages.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleViewClick = (msg) => {
    setCurrentMsg(msg);
    setIsViewModalOpen(true);
  };

  const handleDeleteClick = (msg) => {
    setCurrentMsg(msg);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    dispatch(deleteMessage(currentMsg._id));
    setIsDeleteModalOpen(false);
    setCurrentMsg(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Messages</h2>
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
                <th className="p-4 font-semibold uppercase text-xs tracking-wider text-secondary">Sender</th>
                <th className="p-4 font-semibold uppercase text-xs tracking-wider text-secondary">Subject</th>
                <th className="p-4 font-semibold uppercase text-xs tracking-wider text-secondary">Date</th>
                <th className="p-4 font-semibold uppercase text-xs tracking-wider text-secondary text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary divide-opacity-10">
              {currentItems.length > 0 ? currentItems.map((msg) => (
                <tr key={msg._id} className="hover:bg-white hover:bg-opacity-5 transition-colors">
                  <td className="p-4">
                    <div className="font-medium">{msg.name}</div>
                    <div className="text-xs text-secondary">{msg.email}</div>
                  </td>
                  <td className="p-4 text-secondary">{msg.subject}</td>
                  <td className="p-4 text-secondary text-sm">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right space-x-4">
                    <button 
                      onClick={() => handleViewClick(msg)}
                      className="text-primary hover:text-white transition-colors" 
                      title="View"
                    >
                      <FaEye size={18} />
                    </button>
                    <button 
                      onClick={() => handleDeleteClick(msg)}
                      className="text-red-400 hover:text-red-300 transition-colors" 
                      title="Delete"
                    >
                      <FaTrash size={18} />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-secondary">No messages found.</td>
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

      {/* View Message Modal */}
      <Modal 
        isOpen={isViewModalOpen} 
        onClose={() => setIsViewModalOpen(false)} 
        title="View Message"
      >
        {currentMsg && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-secondary uppercase tracking-widest text-[10px] font-bold">From</p>
                <p className="font-bold">{currentMsg.name}</p>
              </div>
              <div>
                <p className="text-secondary uppercase tracking-widest text-[10px] font-bold">Email</p>
                <p className="font-bold">{currentMsg.email}</p>
              </div>
            </div>
            <div>
              <p className="text-secondary uppercase tracking-widest text-[10px] font-bold">Subject</p>
              <p className="font-bold text-lg">{currentMsg.subject}</p>
            </div>
            <div className="bg-white bg-opacity-5 p-4 rounded-xl border border-secondary border-opacity-10">
              <p className="text-secondary uppercase tracking-widest text-[10px] font-bold mb-2">Message</p>
              <p className="whitespace-pre-wrap">{currentMsg.message}</p>
            </div>
            <div className="text-right text-xs text-secondary">
              Received on {new Date(currentMsg.createdAt).toLocaleString()}
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)} 
        title="Confirm Delete"
      >
        <div className="space-y-6 text-center">
          <p className="text-lg">Are you sure you want to delete this message from <span className="font-bold text-primary">{currentMsg?.name}</span>?</p>
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

export default Messages;
