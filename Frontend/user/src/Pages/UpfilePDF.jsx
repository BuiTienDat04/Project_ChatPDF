import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileCheck2, Loader2, FileText, MoreVertical, Edit, Trash2, X } from 'lucide-react';
import ApiService from '../api/api';

const UpfilePDF = ({ onFileHistoryChange }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileHistory, setFileHistory] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [renameFileId, setRenameFileId] = useState(null);
  const [newFileName, setNewFileName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadHistory = () => {
      try {
        const savedHistory = localStorage.getItem('fileHistory');
        if (savedHistory) {
          const parsedHistory = JSON.parse(savedHistory);
          if (Array.isArray(parsedHistory)) setFileHistory(parsedHistory);
        }
      } catch (error) {
        console.error('Error loading history:', error);
      }
    };
    loadHistory();
  }, []);

  useEffect(() => {
    if (fileHistory.length > 0) {
      localStorage.setItem('fileHistory', JSON.stringify(fileHistory));
      onFileHistoryChange?.(fileHistory);
    }
  }, [fileHistory, onFileHistoryChange]);

  const handleFileProcessing = async (file) => {
    if (!file || !isValidFileType(file) || isUploading) return;

    setSelectedFile(file);
    setIsUploading(true);
    setUploadProgress(0);

    try {
      const result = await ApiService.analyzePDF(file);
      setUploadProgress(100);

      console.log('Backend response:', JSON.stringify(result, null, 2));

      if (!result || !result.success) throw new Error('Invalid response from server');

      const content = result.content || {};
      const images = result.images || [];
      const metadata = result.metadata || {};

      const newFileEntry = {
        id: Date.now() + Math.random().toString(36).substring(2, 9),
        name: file.name,
        uploadDate: new Date().toISOString(),
        content: content,
        sections: content.sections || (content.pages?.flatMap(p => p.sections) || []),
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
          },
        },
      };

      console.log('New file entry:', JSON.stringify(newFileEntry, null, 2));
      updateFileHistory(newFileEntry);
      navigate('/translatepdf', { state: { file: newFileEntry } });
    } catch (error) {
      console.error('Processing error:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      setSelectedFile(null);
    }
  };

  const isValidFileType = (file) => file?.type === 'application/pdf' || file?.name.toLowerCase().endsWith('.pdf');

  const updateFileHistory = (newEntry) => {
    setFileHistory(prev => [newEntry, ...prev].slice(0, 50));
  };

  const handleFileChange = async (e) => {
    await handleFileProcessing(e.target.files?.[0]);
    e.target.value = '';
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files.length > 1) {
      alert('Only one file can be processed at a time.');
      return;
    }
    await handleFileProcessing(e.dataTransfer.files?.[0]);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const formatDate = (isoString) => (isoString ? new Date(isoString).toLocaleString() : '');

  const handleRenameConfirm = () => {
    if (!renameFileId || !newFileName) return;
    setFileHistory(prev => prev.map(file => file.id === renameFileId ? { ...file, name: newFileName } : file));
    setShowRenameModal(false);
    setOpenMenuIndex(null);
  };

  const handleDelete = (id) => {
    setFileHistory(prev => prev.filter(file => file.id !== id));
    setOpenMenuIndex(null);
  };

  return (
    <section className="flex flex-col items-center py-8 px-4 min-h-screen">
      <div
        className={`border-2 rounded-xl w-full md:w-3/4 lg:w-2/3 min-h-80 p-6 flex flex-col items-center justify-center text-center relative shadow-md transition-all duration-300 ${
          dragActive ? 'border-blue-500 bg-blue-50' : isUploading ? 'border-blue-300 bg-blue-50' : selectedFile ? 'border-green-500 bg-green-50' : 'border-dashed border-gray-300 bg-white hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input type="file" id="file-upload" className="hidden" accept=".pdf" onChange={handleFileChange} disabled={isUploading} />
        <div className="mb-6">
          {isUploading ? <Loader2 className="animate-spin text-blue-500" size={48} /> : selectedFile ? <FileCheck2 className="text-green-500 animate-bounce" size={48} /> : <Upload className={`text-gray-400 ${dragActive ? 'animate-pulse' : ''}`} size={48} />}
        </div>
        {isUploading ? (
          <div className="w-full space-y-2">
            <p className="font-medium">Uploading {selectedFile?.name}</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5"><div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div></div>
          </div>
        ) : selectedFile ? (
          <p className="font-semibold">Ready to process</p>
        ) : (
          <>
            <p className="font-semibold">Drag & drop PDF or click to browse</p>
            <p className="text-sm text-gray-500 mt-2">Supports PDF files only</p>
          </>
        )}
        <label htmlFor="file-upload" className={`mt-6 px-6 py-3 rounded-lg shadow-md flex items-center gap-2 cursor-pointer font-medium transition-all ${isUploading ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
          {isUploading ? <Loader2 className="animate-spin" size={20} /> : <Upload size={20} />}
          {isUploading ? 'Processing...' : 'Select File'}
        </label>
      </div>

      <div className="w-full md:w-4/5 lg:w-3/4 mt-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Your Documents</h2>
          {fileHistory.length === 0 ? (
            <p className="text-gray-500 text-center">No documents yet</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {fileHistory.map((file, index) => (
                <div key={file.id} className="relative p-4 bg-gray-50 rounded-lg border hover:shadow-md transition-all cursor-pointer" onClick={() => navigate('/translatepdf', { state: { file } })}>
                  <div className="flex items-center gap-3 mb-3"><FileText className="text-blue-600 flex-shrink-0" /><span className="font-medium truncate">{file.name}</span></div>
                  <div className="text-sm text-gray-600">{formatDate(file.uploadDate)}</div>
                  <div className="text-xs text-gray-500 mt-1">{file.metadata?.pages || 0} pages</div>
                  <div className="absolute top-2 right-2">
                    <button className="p-1 hover:bg-gray-200 rounded-full" onClick={(e) => { e.stopPropagation(); setOpenMenuIndex(openMenuIndex === index ? null : index); }}><MoreVertical size={18} /></button>
                    {openMenuIndex === index && (
                      <div className="absolute right-0 mt-1 w-40 bg-white shadow-lg rounded-md border z-10">
                        <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center" onClick={(e) => { e.stopPropagation(); setRenameFileId(file.id); setNewFileName(file.name); setShowRenameModal(true); }}><Edit size={16} className="mr-2" /> Rename</button>
                        <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center text-red-600" onClick={(e) => { e.stopPropagation(); handleDelete(file.id); }}><Trash2 size={16} className="mr-2" /> Delete</button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showRenameModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4"><h3 className="text-lg font-semibold">Rename Document</h3><button onClick={() => setShowRenameModal(false)}><X size={24} /></button></div>
            <input type="text" value={newFileName} onChange={(e) => setNewFileName(e.target.value)} className="w-full p-2 border rounded mb-4" placeholder="New document name" />
            <div className="flex justify-end gap-2"><button className="px-4 py-2 border rounded" onClick={() => setShowRenameModal(false)}>Cancel</button><button className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50" disabled={!newFileName.trim()} onClick={handleRenameConfirm}>Confirm</button></div>
          </div>
        </div>
      )}
    </section>
  );
};

export default UpfilePDF;