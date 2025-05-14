import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronRight, Download, ArrowLeft, ArrowRight, List, AlignLeft, BookOpen, FileText, Image } from 'lucide-react';

const languages = [
  { code: 'vi', name: 'Vietnamese' },
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'zh', name: 'Chinese' },
];

export default function TranslatePDF() {
  const [translated, setTranslated] = useState(false);
  const [language, setLanguage] = useState('en');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesToShow, setPagesToShow] = useState(1); // Hiển thị 1 trang tại một thời điểm
  const [isTranslating, setIsTranslating] = useState(false);
  const [showDocumentStructure, setShowDocumentStructure] = useState(true);
  const [pdfStructure, setPdfStructure] = useState(null);
  const [activeTab, setActiveTab] = useState('pages');

  const contentRef = useRef(null);
  const translationRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const file = location.state?.file || {};

  useEffect(() => {
    console.log('File data received in TranslatePDF:', JSON.stringify(file, null, 2));
    if (file && (file.content || file.sections || file.pages)) {
      analyzePdfStructure(file);
    } else {
      console.error('No valid content, sections, or pages in file data:', file);
    }
  }, [file]);

  const analyzePdfStructure = (fileData) => {
    if (!fileData || (!fileData.pages && !fileData.sections && !fileData.content?.text)) {
      console.error('Invalid file data for structure analysis:', fileData);
      return;
    }

    const structure = {
      totalPages: fileData.metadata?.pages || (fileData.pages?.length || (fileData.sections?.length ? Math.max(...fileData.sections.map(s => s.page || 1)) : 1)),
      pageCount: fileData.metadata?.pages || (fileData.pages?.length || (fileData.sections?.length ? Math.max(...fileData.sections.map(s => s.page || 1)) : 1)),
      pages: {},
      headings: [],
      paragraphs: 0,
      lists: 0,
      images: fileData.images?.length || 0,
      contentTypes: {},
    };

    const pages = fileData.pages || fileData.sections.map((s, i) => ({
      pageNumber: s.page || i + 1,
      sections: [s],
    })) || [{ pageNumber: 1, sections: [{ type: 'text', content: fileData.content?.text || 'No content' }] }];

    pages.forEach(page => {
      const pageNum = page.pageNumber;
      structure.pages[pageNum] = {
        headings: 0,
        paragraphs: 0,
        lists: 0,
        images: 0,
        totalContent: 0,
        sections: page.sections || [],
        images: (fileData.images || []).filter(img => img.page === pageNum),
      };

      (page.sections || []).forEach(section => {
        if (section.type === 'heading') {
          structure.headings.push({ content: section.content, page: pageNum });
          structure.pages[pageNum].headings++;
        } else if (section.type === 'text') {
          structure.paragraphs++;
          structure.pages[pageNum].paragraphs++;
        } else if (section.type === 'list') {
          structure.lists++;
          structure.pages[pageNum].lists++;
        }
        structure.contentTypes[section.type] = (structure.contentTypes[section.type] || 0) + 1;
      });

      structure.pages[pageNum].images = (fileData.images || []).filter(img => img.page === pageNum).length;
      structure.pages[pageNum].totalContent = structure.pages[pageNum].headings + structure.pages[pageNum].paragraphs + structure.pages[pageNum].lists + structure.pages[pageNum].images;
    });

    setPdfStructure(structure);
    console.log('PDF Structure after analysis:', JSON.stringify(structure, null, 2));
  };

  if (!file.name) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900 font-sans relative">
        <div className="w-full px-4 py-12">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800">Thông Tin File PDF</h2>
              <button onClick={() => navigate('/')} className="text-blue-600 hover:text-blue-800 text-lg font-semibold transition-colors duration-200">Quay lại</button>
            </div>
            <p className="text-red-500 text-center text-xl font-medium">Không có file nào được upload. Vui lòng quay lại và thử lại.</p>
          </div>
        </div>
      </div>
    );
  }

  const handleLanguageChange = (e) => setLanguage(e.target.value);

  const formatDate = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  const translateContent = () => {
    setIsTranslating(true);
    setTimeout(() => {
      setTranslated(true);
      setIsTranslating(false);
    }, 1500);
  };

  const handleDownload = () => alert('Chức năng tải xuống sẽ được triển khai sau.');

  const renderPageStructure = (pageNum) => {
    if (!pdfStructure || !pdfStructure.pages[pageNum]) return null;
    const pageData = pdfStructure.pages[pageNum];
    return (
      <div className="mb-4 border border-gray-200 rounded-lg p-4 bg-white">
        <h3 className="font-semibold text-gray-800 mb-2">Trang {pageNum}</h3>
        <div className="grid grid-cols-4 gap-2 mb-2">
          <div className="bg-blue-50 p-2 rounded-md"><div className="text-xs text-gray-500">Tiêu đề</div><div className="font-semibold">{pageData.headings}</div></div>
          <div className="bg-green-50 p-2 rounded-md"><div className="text-xs text-gray-500">Đoạn văn</div><div className="font-semibold">{pageData.paragraphs}</div></div>
          <div className="bg-yellow-50 p-2 rounded-md"><div className="text-xs text-gray-500">Danh sách</div><div className="font-semibold">{pageData.lists}</div></div>
          <div className="bg-purple-50 p-2 rounded-md"><div className="text-xs text-gray-500">Hình ảnh</div><div className="font-semibold">{pageData.images}</div></div>
        </div>
      </div>
    );
  };

  const renderContent = (sections = [], images = [], pageRange, isTranslation = false) => {
    const startPage = (pageRange - 1) * pagesToShow + 1;
    const endPage = Math.min(startPage + pagesToShow - 1, pdfStructure?.pageCount || 1);

    // Sử dụng sections và images từ file
    const allSections = sections.length > 0 ? sections : (file.sections || []);
    const allImages = images.length > 0 ? images : (file.images || []);

    // Lọc sections và images theo phạm vi trang
    const filteredSections = allSections.filter(s => s.page >= startPage && s.page <= endPage);
    const filteredImages = allImages.filter(img => img.page >= startPage && img.page <= endPage);

    console.log(`Rendering content for pages ${startPage}-${endPage} (isTranslation: ${isTranslation})`);
    console.log('All sections:', JSON.stringify(allSections, null, 2));
    console.log('Filtered sections:', JSON.stringify(filteredSections, null, 2));
    console.log('All images:', JSON.stringify(allImages, null, 2));
    console.log('Filtered images:', JSON.stringify(filteredImages, null, 2));

    // Nếu không có section hoặc hình ảnh, hiển thị nội dung mặc định từ file.content.text
    if (filteredSections.length === 0 && filteredImages.length === 0) {
      const fallbackText = isTranslation
        ? (translated ? file.content?.text || 'Không có nội dung để dịch.' : 'Vui lòng nhấn "Dịch" để hiển thị.')
        : (file.content?.text || 'Không có nội dung để hiển thị.');
      return (
        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-700 mb-4 whitespace-pre-wrap leading-relaxed">{fallbackText}</p>
        </div>
      );
    }

    // Render sections
    const sectionElements = filteredSections.map((section, idx) => {
      const sectionId = `section-${idx}`;
      // Giả lập dịch (nếu là bản dịch)
      const content = isTranslation && translated ? `[Translated to ${language}] ${section.content}` : section.content;
      if (section.type === 'heading') {
        return (
          <div key={sectionId} className="mb-4 pb-2 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800">
              {content || 'No heading content'}
              <span className="ml-2 text-xs text-gray-400">Trang {section.page || 1}</span>
            </h2>
          </div>
        );
      } else if (section.type === 'list') {
        return (
          <div key={sectionId} className="mb-4 ml-5">
            <div className="flex items-center text-gray-600 text-sm mb-1">
              <List className="w-4 h-4 mr-1" />
              <span>Danh sách • Trang {section.page || 1}</span>
            </div>
            <ul className="list-disc text-gray-700">
              {(section.items || []).map((item, i) => (
                <li key={i} className="mb-2">
                  {isTranslation && translated ? `[Translated to ${language}] ${item}` : (item || 'No item')}
                </li>
              ))}
            </ul>
          </div>
        );
      } else {
        return (
          <div key={sectionId} className="mb-4">
            <div className="flex items-center text-gray-600 text-sm mb-1">
              <AlignLeft className="w-4 h-4 mr-1" />
              <span>Đoạn văn • Trang {section.page || 1}</span>
            </div>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {content || 'No content'}
            </p>
          </div>
        );
      }
    });

    // Render images
    const imageElements = filteredImages.map((img, idx) => {
      if (!img || !img.data) {
        console.warn(`Image at index ${idx} has no data or is invalid:`, img);
        return null;
      }
      try {
        let base64String;
        if (Buffer.isBuffer(img.data)) {
          base64String = img.data.toString('base64');
        } else if (img.data instanceof Uint8Array) {
          base64String = btoa(String.fromCharCode(...img.data));
        } else if (typeof img.data === 'string' && img.data.startsWith('data:')) {
          base64String = img.data.split(',')[1];
        } else if (typeof img.data === 'string') {
          base64String = img.data;
        } else {
          console.error('Unknown image data format for image:', img);
          return null;
        }
        return (
          <div key={`img-${idx}`} className="mb-6">
            <div className="flex items-center text-gray-600 text-sm mb-1">
              <Image className="w-4 h-4 mr-1" />
              <span>Hình ảnh • Trang {img.page || 1}</span>
            </div>
            <img
              src={`data:image/jpeg;base64,${base64String}`}
              alt={`Image from page ${img.page || 1}`}
              className="max-w-full h-auto rounded-lg shadow-md border border-gray-200"
              loading="lazy"
            />
          </div>
        );
      } catch (error) {
        console.error('Error rendering image:', error, 'Image data:', img.data);
        return null;
      }
    }).filter(img => img);

    // Kết hợp sections và images
    return [...sectionElements, ...imageElements];
  };

  const renderDocumentStructure = () => {
    if (!pdfStructure) return <p>Đang phân tích cấu trúc...</p>;
    return (
      <div className="bg-white rounded-lg border border-gray-200 h-full flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex space-x-4">
            <button className={`px-4 py-2 rounded-md ${activeTab === 'pages' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => setActiveTab('pages')}>
              <div className="flex items-center space-x-2"><BookOpen className="w-4 h-4" /><span>Trang</span></div>
            </button>
            <button className={`px-4 py-2 rounded-md ${activeTab === 'headings' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => setActiveTab('headings')}>
              <div className="flex items-center space-x-2"><FileText className="w-4 h-4" /><span>Tiêu đề</span></div>
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'pages' && (
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Tổng quan tài liệu</h3>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-blue-50 p-3 rounded-md"><div className="text-xs text-gray-500">Tổng số trang</div><div className="font-semibold text-xl">{pdfStructure.pageCount}</div></div>
                <div className="bg-green-50 p-3 rounded-md"><div className="text-xs text-gray-500">Tổng đoạn văn</div><div className="font-semibold text-xl">{pdfStructure.paragraphs}</div></div>
                <div className="bg-yellow-50 p-3 rounded-md"><div className="text-xs text-gray-500">Tổng tiêu đề</div><div className="font-semibold text-xl">{pdfStructure.headings.length}</div></div>
                <div className="bg-purple-50 p-3 rounded-md"><div className="text-xs text-gray-500">Tổng hình ảnh</div><div className="font-semibold text-xl">{pdfStructure.images}</div></div>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Cấu trúc theo trang</h3>
              <div className="space-y-2">{Object.keys(pdfStructure.pages).map(pageNum => renderPageStructure(parseInt(pageNum)))}</div>
            </div>
          )}
          {activeTab === 'headings' && (
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Danh sách tiêu đề</h3>
              {pdfStructure.headings.length > 0 ? (
                <ul className="space-y-2">{pdfStructure.headings.map((heading, idx) => (
                  <li key={idx} className="border-b border-gray-100 pb-2">
                    <div className="flex justify-between"><span className="font-medium">{heading.content}</span><span className="text-xs text-gray-500">Trang {heading.page}</span></div>
                  </li>
                ))}</ul>
              ) : <p className="text-gray-500 italic">Không tìm thấy tiêu đề trong tài liệu.</p>}
            </div>
          )}
        </div>
      </div>
    );
  };

  const totalPages = pdfStructure?.pageCount || 1;

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      if (contentRef.current) contentRef.current.scrollTop = 0;
      if (translationRef.current) translationRef.current.scrollTop = 0;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900 font-sans relative">
      <div className="w-full px-4 py-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Thông Tin PDF</h2>
            <button onClick={() => navigate('/')} className="text-blue-600 hover:text-blue-800 text-lg font-semibold transition-colors duration-200">Quay lại</button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead><tr className="bg-gray-50 border-b border-gray-200"><th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Tên File</th><th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Ngày tải lên</th><th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Số trang</th><th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Kích thước</th></tr></thead>
              <tbody><tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"><td className="px-6 py-3 text-sm text-gray-900 font-medium">{file.name}</td><td className="px-6 py-3 text-sm text-gray-600">{formatDate(file.uploadDate)}</td><td className="px-6 py-3 text-sm text-gray-600">{file.metadata?.pages || 'N/A'}</td><td className="px-6 py-3 text-sm text-gray-600">{file.metadata?.fileInfo?.size ? `${(file.metadata.fileInfo.size / 1024 / 1024).toFixed(2)} MB` : 'N/A'}</td></tr></tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="w-full px-6 py-4 bg-white rounded-t-2xl border border-gray-200 shadow-md flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-gray-800 truncate">{file.name}</h2>
          <button onClick={() => setShowDocumentStructure(!showDocumentStructure)} className={`p-2 rounded-md ${showDocumentStructure ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`} title={showDocumentStructure ? "Ẩn cấu trúc tài liệu" : "Hiện cấu trúc tài liệu"}><List className="w-5 h-5" /></button>
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={handleDownload} className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm flex items-center"><Download className="w-4 h-4 mr-1" /> Tải xuống</button>
        </div>
      </div>

      <div className="w-full px-6 py-4 bg-gray-50 border-x border-gray-200 flex items-center justify-between">
        <span className="font-medium text-gray-700">Dịch Toàn Bộ Văn Bản</span>
        <div className="flex items-center gap-3">
          <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200" value={language} onChange={handleLanguageChange} disabled={isTranslating}>
            {languages.map((lang) => <option key={lang.code} value={lang.code}>{lang.name}</option>)}
          </select>
          <button onClick={translateContent} disabled={isTranslating || translated} className={`text-sm px-4 py-2 rounded-lg shadow-sm flex items-center space-x-2 ${isTranslating ? 'bg-gray-400 text-gray-100 cursor-not-allowed' : translated ? 'bg-green-600 text-white' : 'bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800'} transition-all duration-200`}>
            {isTranslating ? (<><svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg><span>Đang dịch...</span></>) : translated ? <span>Đã dịch xong</span> : <span>Dịch</span>}
          </button>
        </div>
      </div>

      <div className="w-full flex">
        {showDocumentStructure && <div className="w-64 border-r border-gray-200 bg-white">{renderDocumentStructure()}</div>}
        <div className={`flex-1 flex flex-col md:flex-row bg-white rounded-b-2xl border border-gray-200 shadow-md ${showDocumentStructure ? '' : 'w-full'}`}>
          <div ref={contentRef} className="w-full md:w-1/2 p-6 border-r border-gray-200 overflow-auto" style={{ height: 'calc(100vh - 300px)' }}>
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Nội Dung PDF</h3>
            {renderContent(file.sections || [], file.images || [], currentPage).length > 0 ? (
              renderContent(file.sections || [], file.images || [], currentPage)
            ) : (
              <p className="text-gray-500 italic">Không có nội dung ở trang {currentPage}.</p>
            )}
          </div>
          <div ref={translationRef} className="w-full md:w-1/2 p-6 bg-gray-50 overflow-auto" style={{ height: 'calc(100vh - 300px)' }}>
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Bản Dịch</h3>
            {isTranslating ? (
              <div className="flex flex-col items-center justify-center h-32">
                <svg className="animate-spin h-10 w-10 text-purple-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-gray-600">Đang dịch nội dung, vui lòng đợi...</p>
              </div>
            ) : (
              renderContent(file.sections || [], file.images || [], currentPage, true)
            )}
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center py-4 bg-white border-x border-b border-gray-200 rounded-b-2xl shadow-md">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="flex items-center px-4 py-2 mx-2 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"><ArrowLeft className="w-4 h-4 mr-1" />Trang trước</button>
        <span className="flex items-center px-4 py-2 text-gray-700">Trang {currentPage} / {totalPages}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="flex items-center px-4 py-2 mx-2 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200">Trang sau<ArrowRight className="w-4 h-4 ml-1" /></button>
      </div>
    </div>
  );
}