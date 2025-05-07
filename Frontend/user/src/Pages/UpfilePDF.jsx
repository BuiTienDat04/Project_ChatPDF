import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileCheck2, Loader2, FileText, MoreVertical, Edit, Trash2, X } from 'lucide-react';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist/build/pdf';

// Sử dụng worker từ CDN với phiên bản khớp với pdfjs-dist (5.2.133)
GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/5.2.133/pdf.worker.min.js';

const UpfilePDF = ({ onFileHistoryChange }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileHistory, setFileHistory] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [renameFileId, setRenameFileId] = useState(null);
  const [newFileName, setNewFileName] = useState('');

  const historyRef = useRef(null);
  const menuRefs = useRef([]);
  const navigate = useNavigate();

  // Đọc fileHistory từ localStorage khi component mount
  useEffect(() => {
    const loadHistory = () => {
      try {
        const savedHistory = localStorage.getItem('fileHistory');
        console.log('Đọc từ localStorage khi mount:', savedHistory);
        if (savedHistory) {
          const parsedHistory = JSON.parse(savedHistory);
          if (Array.isArray(parsedHistory)) {
            setFileHistory(parsedHistory);
            console.log('Khôi phục fileHistory:', parsedHistory);
          } else {
            console.warn('Dữ liệu trong localStorage không phải mảng, khởi tạo lại.');
            setFileHistory([]);
          }
        } else {
          console.log('Không có dữ liệu trong localStorage, khởi tạo rỗng.');
          setFileHistory([]);
        }
      } catch (error) {
        console.error('Lỗi khi đọc localStorage:', error);
        setFileHistory([]);
      }
    };
    loadHistory();
  }, []);

  // Lưu fileHistory vào localStorage mỗi khi nó thay đổi
  useEffect(() => {
    if (fileHistory.length > 0) {
      try {
        console.log('Lưu fileHistory vào localStorage:', fileHistory);
        localStorage.setItem('fileHistory', JSON.stringify(fileHistory));
        console.log('Dữ liệu sau khi lưu:', localStorage.getItem('fileHistory'));
        if (onFileHistoryChange) {
          onFileHistoryChange(fileHistory);
        }
      } catch (error) {
        console.error('Lỗi khi lưu vào localStorage:', error);
      }
    }
  }, [fileHistory, onFileHistoryChange]);

  const extractTextFromPDF = async (file) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await getDocument({ data: arrayBuffer }).promise;
      const pages = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ');
        pages.push({
          pageNumber: i,
          content: pageText || `Không thể trích xuất nội dung trang ${i}`,
        });
      }
      console.log('Nội dung các trang PDF:', pages);
      return pages;
    } catch (error) {
      console.error('Lỗi khi trích xuất nội dung PDF:', error.message);
      return [{ pageNumber: 1, content: 'Lỗi: ' + error.message }];
    }
  };

  const handleFileProcessing = async (file) => {
    if (!file || !isValidFileType(file)) {
      console.warn("File không hợp lệ.");
      setSelectedFile(null);
      return;
    }

    if (isUploading) {
      console.log("Đang upload, vui lòng đợi.");
      return;
    }

    setSelectedFile(file);
    setIsUploading(true);

    try {
      const pages = await extractTextFromPDF(file);
      const newFileEntry = {
        id: Date.now() + Math.random(),
        name: file.name,
        uploadDate: new Date().toISOString(),
        pages: pages,
      };
      console.log('File mới với nội dung thực tế:', newFileEntry);
      const newHistory = [newFileEntry, ...fileHistory];
      console.log('Cập nhật fileHistory:', newHistory);
      setFileHistory(newHistory);
      setSelectedFile(null);

      navigate('/translatepdf', { state: { file: newFileEntry } });
    } catch (error) {
      console.error('Lỗi khi xử lý file:', error);
      setSelectedFile(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    await handleFileProcessing(file);
    e.target.value = '';
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    await handleFileProcessing(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const isValidFileType = (file) => {
    const allowedTypes = ['application/pdf'];
    const isValid = allowedTypes.includes(file.type);
    if (!isValid) {
      console.warn(`Loại file không hợp lệ: ${file.type}. Các loại được hỗ trợ: ${allowedTypes.join(', ')}`);
    }
    return isValid;
  };

  const formatDate = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  const formatFileSize = (size) => {
    if (size === null || size === undefined) return '';
    if (size < 1024) return `${size} B`;
    else if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    else if (size < 1024 * 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(1)} MB`;
    else return `${(size / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  };

  const handleMenuToggle = (index) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  const handleRenameClick = (id, currentName) => {
    setRenameFileId(id);
    setNewFileName(currentName);
    setShowRenameModal(true);
    setOpenMenuIndex(null);
  };

  const handleRenameConfirm = () => {
    if (!renameFileId || !newFileName) return;

    const updatedHistory = fileHistory.map(file =>
      file.id === renameFileId ? { ...file, name: newFileName } : file
    );
    console.log('Cập nhật fileHistory sau khi đổi tên:', updatedHistory);
    setFileHistory(updatedHistory);
    setShowRenameModal(false);
    setRenameFileId(null);
    setNewFileName('');
  };

  const handleRenameCancel = () => {
    setShowRenameModal(false);
    setRenameFileId(null);
    setNewFileName('');
  };

  const handleDelete = (id) => {
    const updatedHistory = fileHistory.filter(file => file.id !== id);
    console.log('Cập nhật fileHistory sau khi xóa:', updatedHistory);
    setFileHistory(updatedHistory);
    setOpenMenuIndex(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (historyRef.current && !historyRef.current.contains(event.target)) {
        const isMenuButton = event.target.closest('.menu-button');
        const isMenu = event.target.closest('.options-menu');
        if (!isMenuButton && !isMenu) {
          setOpenMenuIndex(null);
        }
      }
    };

    if (openMenuIndex !== null) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openMenuIndex]);

  useEffect(() => {
    if (openMenuIndex !== null && menuRefs.current[openMenuIndex]) {
      const menu = menuRefs.current[openMenuIndex];
      const rect = menu.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (rect.bottom > viewportHeight) {
        menu.style.top = 'auto';
        menu.style.bottom = '0';
      } else {
        menu.style.top = '0';
        menu.style.bottom = 'auto';
      }
    }
  }, [openMenuIndex]);

  return (
    <section className="flex flex-col items-center py-8 px-4 min-h-screen">
      {/* Khu vực upload */}
      <div
        className={`border-2 transition-all duration-300 ease-in-out rounded-xl w-full md:w-3/4 lg:w-2/3 min-h-80 p-6 flex flex-col items-center justify-center text-center relative shadow-md
          ${dragActive
            ? 'border-blue-500 bg-blue-50'
            : isUploading
            ? 'border-blue-300 bg-blue-50'
            : selectedFile
            ? 'border-green-500 bg-green-50'
            : 'border-dashed border-gray-300 bg-white hover:border-gray-400'}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="file-upload"
          className="hidden"
          accept=".pdf"
          onChange={handleFileChange}
          disabled={isUploading}
        />

        <div className="mb-6 relative">
          {isUploading ? (
            <div className="animate-spin">
              <Loader2 size={48} className="text-blue-500" />
            </div>
          ) : selectedFile ? (
            <FileCheck2 size={48} className="text-green-500 animate-bounce" />
          ) : (
            <Upload size={48} className={`text-gray-400 ${dragActive ? 'animate-pulse' : ''}`} />
          )}
        </div>

        {isUploading ? (
          <div className="text-center">
            <p className="font-semibold text-lg text-blue-600 mb-2">Đang xử lý file...</p>
            <p className="text-sm text-gray-600">Vui lòng chờ trong giây lát</p>
          </div>
        ) : selectedFile ? (
          <div className="text-center">
            <p className="font-semibold text-lg text-gray-800 mb-2">Tải lên thành công!</p>
          </div>
        ) : (
          <div className="text-center">
            <p className="font-semibold text-lg text-gray-800">Nhấp hoặc kéo tệp vào đây để tải lên</p>
            <p className="text-sm text-gray-500 mt-2">Định dạng hỗ trợ: PDF</p>
          </div>
        )}
        <label
          htmlFor="file-upload"
          className={`mt-6 px-6 py-3 rounded-lg shadow-md flex items-center gap-2 cursor-pointer font-medium transition-all duration-200
            ${isUploading
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'}`}
          disabled={isUploading}
        >
          {isUploading ? <Loader2 size={20} className="animate-spin" /> : <Upload size={20} />}
          {isUploading ? 'Đang tải lên...' : 'Chọn file'}
        </label>

        {dragActive && (
          <div className="absolute inset-0 w-full h-full bg-blue-500/20 rounded-xl pointer-events-none" />
        )}
      </div>

      {/* Khu vực lịch sử file */}
      <div ref={historyRef} className="w-full md:w-4/5 lg:w-3/4 mt-8 mx-auto px-0 md:px-6">
        <div className="border border-gray-200 rounded-lg p-6 bg-gradient-to-br from-white to-gray-50 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Hộp Thư AI</h2>
          </div>

          {fileHistory.length === 0 ? (
            <p className="text-gray-500 text-center text-lg">Chưa có file nào được tải lên.</p>
          ) : (
            <div className="flex space-x-6 pb-6 overflow-x-auto custom-scrollbar">
              {fileHistory.map((file, index) => (
                <div
                  key={file.id}
                  className="relative flex-shrink-0 w-56 p-5 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer hover:bg-gray-50"
                  onClick={() => navigate('/translatepdf', { state: { file } })}
                >
                  <div className="flex items-center gap-4 mb-3">
                    <FileText size={24} className="text-blue-600 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <span className="text-gray-900 font-semibold text-base truncate block">{file.name}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>{formatDate(file.uploadDate)}</span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <button
                      className="p-2 rounded-full hover:bg-gray-200 menu-button transition-colors duration-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMenuToggle(index);
                      }}
                      aria-label="Tùy chọn file"
                    >
                      <MoreVertical size={20} className="text-gray-600" />
                    </button>

                    {openMenuIndex === index && (
                      <div
                        ref={(el) => (menuRefs.current[index] = el)}
                        className="options-menu absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 transform translate-x-2 border border-gray-200"
                        style={{ position: 'absolute' }}
                      >
                        <div className="py-2" role="menu" aria-orientation="vertical">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRenameClick(file.id, file.name);
                            }}
                            className="flex items-center px-4 py-2 text-base text-gray-700 hover:bg-gray-100 w-full text-left transition-colors duration-200"
                            role="menuitem"
                          >
                            <Edit size={18} className="mr-3 text-gray-600" />
                            Đổi tên
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(file.id);
                            }}
                            className="flex items-center px-4 py-2 text-base text-gray-700 hover:bg-gray-100 w-full text-left transition-colors duration-200"
                            role="menuitem"
                          >
                            <Trash2 size={18} className="mr-3 text-gray-600" />
                            Xóa
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal đổi tên file */}
      {showRenameModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Đổi tên file</h3>
              <button
                onClick={handleRenameCancel}
                className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                aria-label="Đóng modal"
              >
                <X size={24} />
              </button>
            </div>
            <div className="mb-6">
              <label htmlFor="newFileName" className="block text-sm font-medium text-gray-700 mb-2">
                Tên file mới
              </label>
              <input
                type="text"
                id="newFileName"
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                placeholder="Nhập tên file mới"
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={handleRenameCancel}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-medium"
              >
                Hủy
              </button>
              <button
                onClick={handleRenameConfirm}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                disabled={!newFileName.trim()}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default UpfilePDF;