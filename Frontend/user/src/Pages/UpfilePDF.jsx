import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileCheck2, Loader2, FileText, MoreVertical, Edit, Trash2, X } from 'lucide-react';
import ApiService from '../api/api';
import { motion } from 'framer-motion'

const UpfilePDF = ({ onFileHistoryChange }) => {
  // State management
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileHistory, setFileHistory] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [renameFileId, setRenameFileId] = useState(null);
  const [newFileName, setNewFileName] = useState('');

  // Refs
  const historyRef = useRef(null);
  const menuRefs = useRef([]);
  const navigate = useNavigate();

  // Load file history from localStorage
  useEffect(() => {
    const loadHistory = () => {
      try {
        const savedHistory = localStorage.getItem('fileHistory');
        if (savedHistory) {
          const parsedHistory = JSON.parse(savedHistory);
          if (Array.isArray(parsedHistory)) {
            setFileHistory(parsedHistory);
          }
        }
      } catch (error) {
        console.error('Error loading history:', error);
      }
    };
    loadHistory();
  }, []);

  // Save file history to localStorage
  useEffect(() => {
    if (fileHistory.length > 0) {
      localStorage.setItem('fileHistory', JSON.stringify(fileHistory));
      onFileHistoryChange?.(fileHistory);
    }
  }, [fileHistory, onFileHistoryChange]);

  const handleFileProcessing = async (file) => {
    if (!file || file.type !== 'application/pdf' || isUploading) return;
  // Handle file processing with backend API
  const handleFileProcessing = async (file) => {
    if (!file || !isValidFileType(file)) return;
    if (isUploading) return;

    setSelectedFile(file);
    setIsUploading(true);
    setUploadProgress(0);

    try {
      const result = await ApiService.analyzePDF(file);
      setUploadProgress(100);

      console.log('Backend response:', JSON.stringify(result, null, 2));

      if (!result?.success) throw new Error('Invalid response from server');

      const { content = {}, images = [], metadata = {} } = result.data || {};

      // Chuyển file PDF thành base64 để lưu
      const reader = new FileReader();
      const base64Promise = new Promise((resolve) => {
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
      const base64Data = await base64Promise;

      const newFileEntry = {
        id: Date.now() + Math.random().toString(36).substring(2, 9),
        name: file.name,
        uploadDate: new Date().toISOString(),
        content: content,
        sections: content.sections || [],
        pages: content.pages || [],
        images: images.map(img => ({
          ...img,
          data: img.data || img.base64 || '',
          page: img.page || 1,
        })),
        metadata: {
          ...metadata,
          fileInfo: {
            size: file.size,
            type: file.type,
            lastModified: file.lastModified,
            data: base64Data, // Lưu base64 của file PDF
          },
        },
      };

      console.log('New file entry sections:', JSON.stringify(newFileEntry.sections, null, 2));
      updateFileHistory(newFileEntry);
      navigate('/translatepdf', { state: { file: newFileEntry } });
    } catch (error) {
      console.error('Processing error:', error);
      alert(`Error: ${error.message}`);
      // Simulate progress (replace with actual progress events if needed)
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 300);

      // Send to backend API
      const result = await ApiService.analyzePDF(file, progressEvent => {
        const progress = Math.round((progressEvent.loaded / progressEvent.total) * 90);
        setUploadProgress(progress);
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      // Create new file entry
      const newFileEntry = createFileEntry(file, result);
      updateFileHistory(newFileEntry);

      // Navigate to translation page
      navigate('/translatepdf', { state: { file: newFileEntry } });
    } catch (error) {
      console.error('Processing error:', error);
      alert(`Error: ${error.response?.data?.error || error.message}`);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      setSelectedFile(null);
    }
  };


  // Helper functions
  const isValidFileType = (file) => {
    return file?.type === 'application/pdf';
  };

  const createFileEntry = (file, apiResult) => ({
    id: Date.now() + Math.random().toString(36).substring(2, 9),
    name: file.name,
    uploadDate: new Date().toISOString(),
    content: apiResult.originalText,
    pages: [{ pageNumber: 1, content: apiResult.originalText }],
    metadata: {
      size: file.size,
      type: file.type,
      lastModified: file.lastModified
    }
  });

  const updateFileHistory = (newEntry) => {
    setFileHistory(prev => [newEntry, ...prev]);
  };

  // Event handlers
  const handleFileChange = async (e) => {
    await handleFileProcessing(e.target.files?.[0]);
    e.target.value = '';
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setDragActive(false);
    await handleFileProcessing(e.dataTransfer.files?.[0]);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const formatDate = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  const handleRenameConfirm = () => {
    if (!renameFileId || !newFileName) return;
    setFileHistory(prev =>
      prev.map(file =>
        file.id === renameFileId ? { ...file, name: newFileName } : file
      )
    );
    setShowRenameModal(false);
  };

  const handleDelete = (id) => {
    setFileHistory(prev => prev.filter(file => file.id !== id));
  };

  // Render
  return (
    <section className="flex flex-col items-center py-12 px-6 min-h-screen bg-gradient-to-b from-purple-100 to-white font-sans">
      {/* Upload Area */}
      <div
        className={`border-2 border-purple-200 rounded-3xl w-full max-w-[90%] min-h-[420px] p-12 flex flex-col items-center justify-center text-center bg-gradient-to-br from-purple-50/90 to-pink-50/90 backdrop-blur-md shadow-xl ${dragActive ? 'border-purple-300 bg-purple-100/90' :
          isUploading ? 'border-pink-300 bg-pink-100/90' :
            selectedFile ? 'border-pink-300 bg-pink-100/90' :
              'hover:border-purple-300'
          }`}
      >
        <input
          type="file"
          id="file-upload"
          className="hidden"
          accept=".pdf"
          onChange={handleFileChange}
          disabled={isUploading}
        />

        <div className="mb-10">
          {isUploading ? (
            <Loader2 className="animate-spin text-purple-600" size={60} />
          ) : selectedFile ? (
            <FileCheck2 className="text-pink-500" size={60} />
          ) : (
            <Upload className="text-purple-500" size={60} />
          )}
        </div>

        {isUploading ? (
          <div className="w-full max-w-lg space-y-5">
            <p className="font-semibold text-purple-800 text-2xl tracking-tight">
              Đang tải lên {selectedFile?.name}
Resolving conflicts between Commit and main and committing changes  Commit
1 conflicting file
UpfilePDF.jsx
Frontend/user/src/Pages/UpfilePDF.jsx
Frontend/user/src/Pages/UpfilePDF.jsx
            </p>
            <div className="w-full bg-purple-100 rounded-full h-5 overflow-hidden shadow-inner">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-5 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        ) : selectedFile ? (
          <p className="font-semibold text-pink-600 text-2xl tracking-tight">
            Tài liệu đã sẵn sàng để xử lý!
          </p>
        ) : (
          <>
            <p className="font-bold text-purple-900 text-3xl tracking-tight">
              Kéo & thả PDF của bạn tại đây
            </p>
            <p className="text-lg text-gray-600 mt-4 max-w-xl leading-relaxed">
              Hoặc nhấn để chọn tệp PDF (tối đa 50MB) và khám phá ngay!
            </p>
          </>
        )}

        <label
          htmlFor="file-upload"
          className={`mt-12 px-12 py-5 rounded-full shadow-xl flex items-center gap-5 cursor-pointer font-semibold text-xl bg-gradient-to-r ${isUploading
            ? 'from-gray-300 to-gray-400 text-gray-600 cursor-not-allowed'
            : 'from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
            }`}
        >
          {isUploading ? (
            <Loader2 className="animate-spin" size={28} />
          ) : (
            <Upload size={28} />
          )}
          {isUploading ? 'Đang xử lý...' : 'Chọn tệp PDF'}
        </label>
      </div>

      {/* File History */}
      <div
        ref={historyRef}
        className="w-full max-w-6xl mt-16 mx-auto"
      >
        <div className="bg-gradient-to-br from-white to-purple-50/20 backdrop-blur-md rounded-3xl shadow-lg p-10 border border-purple-100/20">
          <h2 className="text-5xl font-semibold text-purple-900 mb-10 text-center tracking-wide">

          {fileHistory.length === 0 ? (
            <p className="text-gray-500 text-center text-xl font-light py-12 tracking-wide">
              📁 Chưa có tài liệu nào được tìm thấy
            Tài liệu đã tải lên
          </h2>
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {fileHistory.map((file, index) => (
                <motion.div
                  key={file.id}
                  className="relative bg-white rounded-2xl border border-purple-100/30 hover:border-purple-200 hover:shadow-md transition-all duration-500 ease-out cursor-pointer group p-6"
                  onClick={() => navigate('/translatepdf', { state: { file } })}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <FileText className="text-purple-600 flex-shrink-0" size={28} />
                      <div className="min-w-0">
                        <span className="font-medium text-purple-900 truncate block text-lg">
                          {file.name}
                        </span>
                        <span className="text-xs text-gray-400 block mt-1">
                          {formatDate(file.uploadDate)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        className="p-1.5 hover:bg-purple-50/50 rounded-full transition-colors duration-300 ease-out"
                        onClick={(e) => {
                          e.stopPropagation();
                          setRenameFileId(file.id);
                          setNewFileName(file.name);
                          setShowRenameModal(true);
                        }}
                      >
                        <Edit size={20} className="text-purple-600" />
                      </button>
                      <button
                        className="p-1.5 hover:bg-red-50/50 rounded-full transition-colors duration-300 ease-out"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(file.id);
                        }}
                      >
                        <Trash2 size={20} className="text-red-500" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <style jsx>{`
    .custom-scrollbar::-webkit-scrollbar {
      width: 8px;
    }

    .custom-scrollbar::-webkit-scrollbar-track {
      background: #fafaff;
      border-radius: 4px;
    }

    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #c4b5fd;
      border-radius: 4px;
    }

    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: #a78bfa;
    }
  `}</style>
      </div>

      {/* Rename Modal */}
      {showRenameModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 w-full max-w-md shadow-xl border border-purple-100/20"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-medium text-purple-900 tracking-wide">Đổi tên tài liệu</h3>
              <button onClick={() => setShowRenameModal(false)}>
                <X size={24} className="text-gray-500 hover:text-gray-700 transition-colors duration-300" />
              </button>
            </div>
            <input
              type="text"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              className="w-full p-4 border border-purple-100/50 rounded-xl bg-purple-50/20 text-purple-800 placeholder-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all duration-300"
              placeholder="Tên tài liệu mới"
            />
            <div className="flex justify-end gap-3 mt-6">
              <button
                className="px-6 py-2.5 border border-purple-100/50 rounded-xl text-purple-700 text-base font-medium hover:bg-purple-50/30 transition-colors duration-300"
                onClick={() => setShowRenameModal(false)}
              >
                Hủy
              </button>
              <buttonConfirm}
              >
                className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl text-base font-medium hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 transition-colors duration-300"
                disabled={!newFileName.trim()}
                onClick={handleRename
                Xác nhận
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default UpfilePDF; 