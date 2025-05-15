import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronRight, Download, ArrowLeft, ArrowRight, List, AlignLeft, BookOpen, FileText, Image } from 'lucide-react';
import ApiService from '../api/api';

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
  const [pagesToShow, setPagesToShow] = useState(1);
  const [isTranslating, setIsTranslating] = useState(false);
  const [showDocumentStructure, setShowDocumentStructure] = useState(true);
  const [pdfStructure, setPdfStructure] = useState(null);
  const [activeTab, setActiveTab] = useState('pages');
  const [translatedContent, setTranslatedContent] = useState(null);
  const [translationError, setTranslationError] = useState(null);

  const contentRef = useRef(null);
  const translationRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const file = location.state?.file || {};

  useEffect(() => {
    console.log('File data received in TranslatePDF:', JSON.stringify(file, null, 2));
    if (file && (file.sections || file.pages || file.content?.text)) {
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
      totalPages: fileData.metadata?.pages || (fileData.pages?.length || Math.max(...(fileData.sections?.map(s => s.page || 1)) || [1])),
      pageCount: fileData.metadata?.pages || (fileData.pages?.length || Math.max(...(fileData.sections?.map(s => s.page || 1)) || [1])),
      pages: {},
      headings: [],
      paragraphs: 0,
      lists: 0,
      images: fileData.images?.length || 0,
    };

    const sections = fileData.sections || [];
    sections.forEach(section => {
      const pageNum = section.page || 1;
      structure.pages[pageNum] = structure.pages[pageNum] || { headings: 0, paragraphs: 0, lists: 0, images: 0, sections: [] };
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
      structure.pages[pageNum].sections.push(section);
    });

    fileData.images?.forEach(img => {
      const pageNum = img.page || 1;
      structure.pages[pageNum] = structure.pages[pageNum] || { headings: 0, paragraphs: 0, lists: 0, images: 0, sections: [] };
      structure.pages[pageNum].images++;
    });

    setPdfStructure(structure);
    console.log('PDF Structure after analysis:', JSON.stringify(structure, null, 2));
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    setTranslated(false);
    setTranslatedContent(null);
    setTranslationError(null);
  };

  const formatDate = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

 const translateContent = async () => {
  setIsTranslating(true);
  setTranslationError(null);
  try {
    const langName = languages.find(lang => lang.code === language)?.name || language;
    if (!file.originalFile || typeof file.originalFile !== 'object' || !(file.originalFile instanceof File)) {
      throw new Error('No valid original file available for translation');
    }
    const result = await ApiService.translatePDF(file.originalFile, language, langName);
    console.log('Translation response:', JSON.stringify(result, null, 2));

    if (!result.success) {
      throw new Error(result.error || 'Translation failed');
    }

    if (result.data && result.data[0] && result.data[0].translatedContent) {
      setTranslatedContent(result.data[0].translatedContent);
      setTranslated(true);
    } else {
      throw new Error('No translated content returned');
    }
  } catch (error) {
    console.error('Translation error:', error);
    setTranslationError(error.message || 'Failed to translate PDF');
  } finally {
    setIsTranslating(false);
  }
};

  const handleDownload = () => {
    alert('Download feature will be implemented soon.');
  };

  const renderContent = (sections = [], images = [], pageRange, isTranslation = false) => {
    const startPage = (pageRange - 1) * pagesToShow + 1;
    const endPage = Math.min(startPage + pagesToShow - 1, pdfStructure?.pageCount || 1);

    let contentToRender = sections.length > 0 ? sections : (file.sections || []);
    let imagesToRender = images.length > 0 ? images : (file.images || []);

    if (isTranslation && translatedContent) {
      contentToRender = translatedContent.paragraphs.map((para, idx) => ({
        type: 'text',
        content: para,
        page: Math.floor(idx / (translatedContent.paragraphs.length / (pdfStructure?.pageCount || 1))) + 1,
      }));
      imagesToRender = [];
    }

    // Xử lý văn bản bản gốc để cải thiện căn chỉnh
    if (!isTranslation) {
      contentToRender = contentToRender.map(section => {
        if (section.type === 'text') {
          // Tách đoạn văn dựa trên ký tự xuống dòng hoặc khoảng trắng thừa
          const paragraphs = section.content
            .split('\n')
            .map(p => p.trim())
            .filter(p => p.length > 0);
          return paragraphs.map((content, idx) => ({
            ...section,
            content,
            subIndex: idx, // Thêm subIndex để phân biệt các đoạn trong cùng section
          }));
        }
        return section;
      }).flat();
    }

    const filteredSections = contentToRender.filter(s => s.page >= startPage && s.page <= endPage);
    const filteredImages = imagesToRender.filter(img => img.page >= startPage && img.page <= endPage);

    console.log(`Rendering content for pages ${startPage}-${endPage} (isTranslation: ${isTranslation})`);
    console.log('Filtered sections:', JSON.stringify(filteredSections, null, 2));
    console.log('Filtered images:', JSON.stringify(filteredImages, null, 2));

    if (filteredSections.length === 0 && filteredImages.length === 0 && !isTranslation) {
      return (
        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-700 mb-4 whitespace-pre-wrap leading-relaxed">No content available for page {startPage}.</p>
        </div>
      );
    }

    if (isTranslation && translationError) {
      return (
        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <p className="text-red-500 mb-4 whitespace-pre-wrap leading-relaxed">Error: {translationError}</p>
        </div>
      );
    }

    if (isTranslation && !translatedContent) {
      return (
        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-500 mb-4 whitespace-pre-wrap leading-relaxed">Please click Translate to see the translated content.</p>
        </div>
      );
    }

    const sectionElements = filteredSections.map((section, idx) => {
      const content = section.content || (isTranslation && translatedContent ? translatedContent.text : 'No content');
      const key = section.subIndex ? `${idx}-${section.subIndex}` : idx; // Sử dụng subIndex nếu có
      if (section.type === 'heading') {
        return (
          <div key={key} className="mb-4 pb-2 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800">
              {content}
              <span className="ml-2 text-xs text-gray-400">Page {section.page || 1}</span>
            </h2>
          </div>
        );
      } else if (section.type === 'list') {
        return (
          <div key={key} className="mb-4 ml-5">
            <div className="flex items-center text-gray-600 text-sm mb-1">
              <List className="w-4 h-4 mr-1" />
              <span>List • Page {section.page || 1}</span>
            </div>
            <ul className="list-disc text-gray-700">
              {(section.items || []).map((item, i) => (
                <li key={i} className="mb-2">{item || 'No item'}</li>
              ))}
            </ul>
          </div>
        );
      } else {
        const lines = Array.isArray(content) ? content : content.split('\n').filter(line => line.trim());
        return (
          <div key={key} className="mb-4">
            <div className="flex items-center text-gray-600 text-sm mb-1">
              <AlignLeft className="w-4 h-4 mr-1" />
              <span>Paragraph • Page {section.page || 1}</span>
            </div>
            {lines.map((line, lineIdx) => (
              <p key={lineIdx} className="text-gray-700 leading-relaxed whitespace-pre-wrap">{line || 'No content'}</p>
            ))}
          </div>
        );
      }
    });

    const imageElements = filteredImages.map((img, idx) => {
      if (!img?.data) return null;
      let base64String = img.data;
      if (typeof img.data !== 'string' || !img.data.startsWith('data:')) {
        base64String = `data:image/jpeg;base64,${img.data}`;
      }
      return (
        <div key={idx} className="mb-6">
          <div className="flex items-center text-gray-600 text-sm mb-1">
            <Image className="w-4 h-4 mr-1" />
            <span>Image • Page {img.page || 1}</span>
          </div>
          <img
            src={base64String}
            alt={`Image from page ${img.page || 1}`}
            className="max-w-full h-auto rounded-lg shadow-md border border-gray-200"
            loading="lazy"
          />
        </div>
      );
    }).filter(img => img);

    return [...sectionElements, ...imageElements];
  };

  const renderDocumentStructure = () => {
    if (!pdfStructure) return <p>Analyzing structure...</p>;
    return (
      <div className="bg-white rounded-lg border border-gray-200 h-full flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex space-x-4">
            <button className={`px-4 py-2 rounded-md ${activeTab === 'pages' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => setActiveTab('pages')}>
              <div className="flex items-center space-x-2"><BookOpen className="w-4 h-4" /><span>Pages</span></div>
            </button>
            <button className={`px-4 py-2 rounded-md ${activeTab === 'headings' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => setActiveTab('headings')}>
              <div className="flex items-center space-x-2"><FileText className="w-4 h-4" /><span>Headings</span></div>
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'pages' && (
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Document Overview</h3>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-blue-50 p-3 rounded-md"><div className="text-xs text-gray-500">Total Pages</div><div className="font-semibold text-xl">{pdfStructure.pageCount}</div></div>
                <div className="bg-green-50 p-3 rounded-md"><div className="text-xs text-gray-500">Total Paragraphs</div><div className="font-semibold text-xl">{pdfStructure.paragraphs}</div></div>
                <div className="bg-yellow-50 p-3 rounded-md"><div className="text-xs text-gray-500">Total Headings</div><div className="font-semibold text-xl">{pdfStructure.headings.length}</div></div>
                <div className="bg-purple-50 p-3 rounded-md"><div className="text-xs text-gray-500">Total Images</div><div className="font-semibold text-xl">{pdfStructure.images}</div></div>
              </div>
            </div>
          )}
          {activeTab === 'headings' && (
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Heading List</h3>
              {pdfStructure.headings.length > 0 ? (
                <ul className="space-y-2">{pdfStructure.headings.map((heading, idx) => (
                  <li key={idx} className="border-b border-gray-100 pb-2">
                    <div className="flex justify-between"><span className="font-medium">{heading.content}</span><span className="text-xs text-gray-500">Page {heading.page}</span></div>
                  </li>
                ))}</ul>
              ) : <p className="text-gray-500 italic">No headings found in the document.</p>}
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

  if (!file.name) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900 font-sans relative">
        <div className="w-full px-4 py-12">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800">PDF Information</h2>
              <button onClick={() => navigate('/')} className="text-blue-600 hover:text-blue-800 text-lg font-semibold transition-colors duration-200">Back</button>
            </div>
            <p className="text-red-500 text-center text-xl font-medium">No file uploaded. Please go back and try again.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900 font-sans relative">
      <div className="w-full px-4 py-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">PDF Information</h2>
            <button onClick={() => navigate('/')} className="text-blue-600 hover:text-blue-800 text-lg font-semibold transition-colors duration-200">Back</button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead><tr className="bg-gray-50 border-b border-gray-200"><th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">File Name</th><th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Upload Date</th><th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Pages</th><th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Size</th></tr></thead>
              <tbody><tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"><td className="px-6 py-3 text-sm text-gray-900 font-medium">{file.name}</td><td className="px-6 py-3 text-sm text-gray-600">{formatDate(file.uploadDate)}</td><td className="px-6 py-3 text-sm text-gray-600">{file.metadata?.pages || 'N/A'}</td><td className="px-6 py-3 text-sm text-gray-600">{file.metadata?.fileInfo?.size ? `${(file.metadata.fileInfo.size / 1024 / 1024).toFixed(2)} MB` : 'N/A'}</td></tr></tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="w-full px-6 py-4 bg-white rounded-t-2xl border border-gray-200 shadow-md flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-gray-800 truncate">{file.name}</h2>
          <button onClick={() => setShowDocumentStructure(!showDocumentStructure)} className={`p-2 rounded-md ${showDocumentStructure ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`} title={showDocumentStructure ? "Hide document structure" : "Show document structure"}><List className="w-5 h-5" /></button>
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={handleDownload} className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm flex items-center"><Download className="w-4 h-4 mr-1" /> Download</button>
        </div>
      </div>

      <div className="w-full px-6 py-4 bg-gray-50 border-x border-gray-200 flex items-center justify-between">
        <span className="font-medium text-gray-700">Translate Entire Text</span>
        <div className="flex items-center gap-3">
          <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200" value={language} onChange={handleLanguageChange} disabled={isTranslating}>
            {languages.map((lang) => <option key={lang.code} value={lang.code}>{lang.name}</option>)}
          </select>
          <button onClick={translateContent} disabled={isTranslating} className={`text-sm px-4 py-2 rounded-lg shadow-sm flex items-center space-x-2 ${isTranslating ? 'bg-gray-400 text-gray-100 cursor-not-allowed' : translated ? 'bg-green-600 text-white' : 'bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800'} transition-all duration-200`}>
            {isTranslating ? (<><svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg><span>Translating...</span></>) : translated ? <span>Translated</span> : <span>Translate</span>}
          </button>
        </div>
      </div>

      <div className="w-full flex">
        {showDocumentStructure && <div className="w-64 border-r border-gray-200 bg-white">{renderDocumentStructure()}</div>}
        <div className={`flex-1 flex flex-col md:flex-row bg-white rounded-b-2xl border border-gray-200 shadow-md ${showDocumentStructure ? '' : 'w-full'}`}>
          <div ref={contentRef} className="w-full md:w-1/2 p-6 border-r border-gray-200 overflow-auto" style={{ height: 'calc(100vh - 300px)' }}>
            <h3 className="text-lg font-semibold text-gray-800 mb-6">PDF Content</h3>
            {renderContent(file.sections || [], file.images || [], currentPage).length > 0
              ? renderContent(file.sections || [], file.images || [], currentPage)
              : <p className="text-gray-500 italic">No content available for page {currentPage}.</p>}
          </div>
          <div ref={translationRef} className="w-full md:w-1/2 p-6 bg-gray-50 overflow-auto" style={{ height: 'calc(100vh - 300px)' }}>
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Translation</h3>
            {isTranslating ? (
              <div className="flex flex-col items-center justify-center h-32">
                <svg className="animate-spin h-10 w-10 text-purple-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-gray-600">Translating content, please wait...</p>
              </div>
            ) : (
              renderContent([], [], currentPage, true)
            )}
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center py-4 bg-white border-x border-b border-gray-200 rounded-b-2xl shadow-md">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="flex items-center px-4 py-2 mx-2 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"><ArrowLeft className="w-4 h-4 mr-1" /> Previous</button>
        <span className="flex items-center px-4 py-2 text-gray-700">Page {currentPage} / {totalPages}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="flex items-center px-4 py-2 mx-2 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200">Next <ArrowRight className="w-4 h-4 ml-1" /></button>
      </div>
    </div>
  );
}