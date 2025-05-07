import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'fr', name: 'French' },
  { code: 'es', name: 'Spanish' },
  { code: 'de', name: 'German' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'ru', name: 'Russian' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ar', name: 'Arabic' },
  { code: 'hi', name: 'Hindi' },
  { code: 'tr', name: 'Turkish' },
  { code: 'nl', name: 'Dutch' },
  { code: 'pl', name: 'Polish' },
  { code: 'sv', name: 'Swedish' },
  { code: 'fi', name: 'Finnish' },
  { code: 'no', name: 'Norwegian' },
  { code: 'da', name: 'Danish' },
];

export default function TranslatePDF() {
  const [translated, setTranslated] = useState(false);
  const [language, setLanguage] = useState('vi');
  const location = useLocation();
  const navigate = useNavigate();
  const file = location.state?.file;

  console.log('Dữ liệu file nhận được:', file);

  // Nếu không có file, hiển thị thông báo lỗi
  if (!file) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900 font-sans relative">
        <div className="w-full px-4 py-12">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800">Thông Tin File PDF</h2>
              <button
                onClick={() => navigate('/')}
                className="text-blue-600 hover:text-blue-800 text-lg font-semibold transition-colors duration-200"
              >
                Quay lại
              </button>
            </div>
            <p className="text-red-500 text-center text-xl font-medium">
              Không có file nào được upload. Vui lòng quay lại và thử lại.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Language selection handler
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const formatDate = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900 font-sans relative">
      {/* File History Table */}
      <div className="w-full px-4 py-12">
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Thông Tin File PDF</h2>
            <button
              onClick={() => navigate('/')}
              className="text-blue-600 hover:text-blue-800 text-lg font-semibold transition-colors duration-200"
            >
              Quay lại
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Tên File</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Ngày tải lên</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">{file.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{formatDate(file.uploadDate)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* PDF Viewer Header */}
      <div className="w-full px-6 py-4 bg-white rounded-t-2xl border border-gray-100 shadow-md flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800 truncate">{file.name}</h2>
        <div>
          <button className="text-sm text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm">
            ⬇ Tải xuống
          </button>
        </div>
      </div>

      {/* Language Translation Dropdown and Button */}
      <div className="w-full px-6 py-4 bg-gray-50 border-x border-gray-100 flex items-center justify-between">
        <span className="font-medium text-gray-700">Dịch Toàn Bộ Văn Bản</span>
        <div className="flex items-center gap-3">
          <select
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            value={language}
            onChange={handleLanguageChange}
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
          <button
            onClick={() => setTranslated(true)}
            className="text-sm bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-sm"
          >
            Dịch
          </button>
        </div>
      </div>

      {/* Main Content with PDF Pages, Translation, and ChatBot */}
      <div className="w-full">
        <div className="flex bg-white rounded-b-2xl border border-gray-100 shadow-md">
          {/* Left: PDF Pages Display */}
          <div className="w-[35%] p-4 border-r border-gray-100 overflow-auto h-[calc(100vh-144px)]">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Các Trang PDF</h3>
            {file.pages && file.pages.length > 0 ? (
              <div className="space-y-4">
                {file.pages.map((page) => (
                  <div key={page.pageNumber} className="p-2 border border-gray-200 rounded-lg bg-gray-50 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <h4 className="text-md font-medium text-gray-800">Trang {page.pageNumber}</h4>
                    <p className="text-sm text-gray-700 mt-2">{page.content || 'Không có nội dung'}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-red-500 italic">Không thể đọc nội dung file PDF. Vui lòng kiểm tra file hoặc thử lại.</p>
            )}
          </div>

          {/* Middle: Translation Panel */}
          <div className="w-[35%] p-4 border-r border-gray-100 bg-gray-50 h-[calc(100vh-144px)] overflow-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Bản Dịch</h3>
            {!translated ? (
              <p className="text-sm text-gray-500 italic">Bản dịch sẽ hiển thị ở đây.</p>
            ) : (
              <div className="space-y-4">
                {file.pages && file.pages.length > 0 ? (
                  file.pages.map((page) => (
                    <div key={page.pageNumber} className="p-2 border border-gray-200 rounded-lg bg-white shadow-sm">
                      <h4 className="text-md font-medium text-gray-800">Trang {page.pageNumber}</h4>
                      <p className="text-sm text-gray-700 mt-2">{page.content || 'Không có nội dung để dịch'}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-red-500 italic">Không thể đọc nội dung file PDF để dịch.</p>
                )}
              </div>
            )}
          </div>

          {/* Right: ChatBot Panel */}
          <div className="w-[30%] p-4 bg-white h-[calc(100vh-144px)] overflow-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Chat với tài liệu</h3>
            {/* <div className="bg-gray-50 p-3 rounded-lg shadow-sm mb-3">
              <p className="text-sm text-gray-700">
                {file.pages && file.pages.length > 0 ? file.pages[0].content || 'Không có nội dung' : 'Nội dung chat sẽ hiển thị sau khi upload.'}
              </p>
            </div> */}
            <div className="text-sm text-purple-700 font-semibold mt-4 mb-1">Câu hỏi liên quan</div>
            <ul className="list-disc ml-5 text-sm text-blue-600 space-y-1">
              <li><a href="#" className="hover:underline">What are the key skills in the document?</a></li>
              <li><a href="#" className="hover:underline">What experience is mentioned?</a></li>
              <li><a href="#" className="hover:underline">What are the career objectives?</a></li>
            </ul>
            <div className="mt-4">
              <input
                type="text"
                className="w-full border border-gray-300 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                placeholder="Gõ một tin nhắn..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}