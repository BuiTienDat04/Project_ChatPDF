import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { MessageCircle, FileText, Globe, Star, Zap, BookOpen, Rocket } from 'lucide-react';

const HomePage = ({ currentUser, setCurrentUser }) => {
  // Thêm logic xử lý nếu cần dựa trên currentUser (ví dụ: hiển thị nút nếu đã đăng nhập)
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 font-sans">
      <main className="pt-20 w-full relative z-10">
        <Navigation />
        {/* Hero Section */}
        <section className="relative flex flex-col items-center text-center px-4 py-24 md:py-32 overflow-hidden bg-gradient-to-br from-pink-50 to-purple-100">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <svg
              className="w-full h-full scale-125"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="url(#heroBlob)"
                d="M44.7,-76.4C58.8,-69.2,71.7,-58.2,79.2,-44.2C86.7,-30.2,88.8,-15.1,86.9,-0.7C85,13.7,79.1,27.4,70.1,39.7C61.1,52,49.1,62.9,35.7,69.4C22.3,75.9,7.5,78,-7.7,77.2C-22.9,76.4,-38.7,72.7,-51.7,64.2C-64.7,55.7,-74.9,42.4,-79.7,27.7C-84.5,13,-83.9,-3.2,-78.7,-18.2C-73.5,-33.2,-63.7,-47,-50.7,-58.2C-37.7,-69.4,-21.7,-78,-5.7,-77.2C10.3,-76.4,25.7,-66.2,44.7,-76.4Z"
                transform="translate(100 100)"
              />
              <defs>
                <linearGradient id="heroBlob" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#F472B6', stopOpacity: 0.7 }} />
                  <stop offset="100%" style={{ stopColor: '#A78BFA', stopOpacity: 0.5 }} />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="relative z-10 pt-28 sm:pt-32 md:pt-36 pb-16 px-4 sm:px-6 lg:px-8 scroll-mt-16">
            <div className="max-w-4xl mx-auto text-center">
              <h1
                className="text-4xl sm:text-5xl md:text-6xl font-semibold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent mb-6 animate-text-slide-up hover:scale-[1.03] transition-transform duration-300"
                style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
              >
                Sider: Khám Phá AI với Chatbot & ChatPDF
              </h1>
              <p
                className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed animate-text-slide-up hover:-translate-y-[2px] transition-transform duration-300"
                style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
              >
                Biến ý tưởng thành hiện thực với Sider! Trò chuyện thông minh, dịch tài liệu PDF sang hơn 100 ngôn ngữ, và mở khóa tri thức toàn cầu chỉ trong vài giây. Sider là người bạn đồng hành cho mọi hành trình sáng tạo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/chatbot"
                  className="px-8 py-3 bg-gradient-to-r from-pink-400 to-purple-500 text-white font-medium rounded-full shadow-sm transition-all duration-300 hover:from-pink-500 hover:to-purple-600 hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-pink-300 animate-text-slide-up"
                  style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
                >
                  Trò chuyện ngay
                </Link>
                <Link
                  to="/pdf-chat"
                  className="px-8 py-3 bg-transparent border-2 border-purple-400 text-purple-400 font-medium rounded-full transition-all duration-300 hover:bg-purple-400 hover:text-white hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-purple-300 animate-text-slide-up"
                  style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}
                >
                  Dịch PDF
                </Link>
              </div>
              <div className="flex flex-col items-center text-purple-500 mt-16 animate-pulse">
                <svg
                  className="w-6 h-6 mb-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
                <span
                  className="text-sm font-medium animate-text-slide-up hover:-translate-y-[2px] transition-transform duration-300"
                  style={{ animationDelay: '1s', animationFillMode: 'forwards' }}
                >
                  Khám phá thêm về Sider
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-white py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent text-center mb-6 animate-text-slide-up hover:scale-105 transition-transform duration-300"
              style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
            >
              Vì Sao Sider Là Lựa Chọn Hoàn Hảo?
            </h2>
            <p
              className="text-center text-gray-700 max-w-2xl mx-auto mb-12 animate-text-slide-up hover:translate-y-[-2px] transition-transform duration-300"
              style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
            >
              Sider mang đến công nghệ AI tiên tiến, giúp bạn giao tiếp thông minh và dịch thuật tài liệu dễ dàng, nhanh chóng.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="flex flex-col items-center text-center p-8 bg-pink-50 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
                <MessageCircle size={56} className="text-pink-500 mb-6" />
                <h3
                  className="text-2xl font-semibold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent mb-4 animate-text-slide-up hover:scale-105 transition-transform duration-300"
                  style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
                >
                  Chatbot Thông Minh
                </h3>
                <p
                  className="text-gray-700 leading-relaxed animate-text-slide-up hover:translate-y-[-2px] transition-transform duration-300"
                  style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}
                >
                  Gặp gỡ chatbot của Sider – người bạn AI hiểu bạn như thật. Đặt câu hỏi, tìm ý tưởng sáng tạo, hoặc giải quyết vấn đề với câu trả lời tự nhiên, chính xác, hỗ trợ 24/7.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-8 bg-purple-50 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
                <FileText size={56} className="text-purple-500 mb-6" />
                <h3
                  className="text-2xl font-semibold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent mb-4 animate-text-slide-up hover:scale-105 transition-transform duration-300"
                  style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
                >
                  ChatPDF: Dịch Toàn Cầu
                </h3>
                <p
                  className="text-gray-700 leading-relaxed animate-text-slide-up hover:translate-y-[-2px] transition-transform duration-300"
                  style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}
                >
                  Dịch tài liệu PDF sang bất kỳ ngôn ngữ nào – từ tiếng Nhật đến tiếng Pháp – với độ chính xác cao, giữ nguyên định dạng. Lý tưởng cho học tập, công việc, và khám phá văn hóa.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-purple-50 to-pink-100">
          <div className="max-w-6xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent text-center mb-6 animate-text-slide-up hover:scale-105 transition-transform duration-300"
              style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
            >
              Sider Hoạt Động Ra Sao?
            </h2>
            <p
              className="text-center text-gray-700 max-w-2xl mx-auto mb-12 animate-text-slide-up hover:translate-y-[-2px] transition-transform duration-300"
              style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
            >
              Chỉ vài bước đơn giản để khai thác sức mạnh AI của Sider cho giao tiếp và dịch thuật.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6">
                <Zap size={48} className="text-pink-500 mb-4" />
                <h3
                  className="text-xl font-semibold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent mb-2 animate-text-slide-up hover:scale-105 transition-transform duration-300"
                  style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
                >
                  Trò Chuyện Tức Thì
                </h3>
                <p
                  className="text-gray-700 animate-text-slide-up hover:translate-y-[-2px] transition-transform duration-300"
                  style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}
                >
                  Nhập câu hỏi hoặc ý tưởng, Sider sẽ trả lời ngay lập tức với thông tin chính xác và gợi ý sáng tạo.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6">
                <BookOpen size={48} className="text-purple-500 mb-4" />
                <h3
                  className="text-xl font-semibold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent mb-2 animate-text-slide-up hover:scale-105 transition-transform duration-300"
                  style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
                >
                  Tải Lên & Dịch PDF
                </h3>
                <p
                  className="text-gray-700 animate-text-slide-up hover:translate-y-[-2px] transition-transform duration-300"
                  style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}
                >
                  Tải tài liệu PDF, chọn ngôn ngữ, và nhận bản dịch giữ nguyên định dạng trong tích tắc.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6">
                <Rocket size={48} className="text-pink-500 mb-4" />
                <h3
                  className="text-xl font-semibold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent mb-2 animate-text-slide-up hover:scale-105 transition-transform duration-300"
                  style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
                >
                  Khám Phá Không Giới Hạn
                </h3>
                <p
                  className="text-gray-700 animate-text-slide-up hover:translate-y-[-2px] transition-transform duration-300"
                  style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}
                >
                  Dùng Sider để học tập, làm việc, hoặc khám phá văn hóa mới – tất cả trong một nền tảng dễ dùng.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ChatPDF Demo Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-pink-100 to-purple-200">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 animate-fade-in">
                Dịch PDF Dễ Dàng với ChatPDF
              </h2>
              <p className="text-gray-600 mb-8 max-w-lg leading-relaxed animate-fade-in" style={{ animationDelay: '0.3s' }}>
                Phá vỡ rào cản ngôn ngữ! Tải lên PDF, chọn từ hơn 100 ngôn ngữ, và nhận bản dịch chính xác, giữ nguyên định dạng – từ hợp đồng đến giáo trình, chỉ trong vài giây.
              </p>
              <Link
                to="/pdf-chat" // Thay đổi từ "/chatpdf" thành "/pdf-chat" để nhất quán
                className="px-8 py-3 bg-purple-500 text-white font-semibold rounded-full shadow-md
                  transition-all duration-300 hover:bg-purple-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-300 animate-fade-in"
                style={{ animationDelay: '0.6s' }}
              >
                Thử ChatPDF ngay
              </Link>
            </div>
            <div className="md:w-1/2 mt-10 md:mt-0">
              <div className="relative bg-white p-6 rounded-xl shadow-2xl transform hover:scale-105 transition">
                <div className="flex items-center justify-between bg-purple-50 p-3 rounded-t">
                  <span className="text-sm font-medium text-gray-700">document.pdf</span>
                  <Globe size={28} className="text-purple-500" />
                </div>
                <div className="h-80 bg-gradient-to-b from-gray-50 to-purple-50 flex items-center justify-center rounded-b">
                  <p className="text-gray-500 italic text-lg">Xem trước bản dịch PDF</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-6 animate-fade-in">
              Người Dùng Nói Gì Về Sider
            </h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              Hàng ngàn người đã trải nghiệm Sider. Dưới đây là những câu chuyện của họ!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 bg-pink-50 rounded-xl shadow-md hover:shadow-lg transition">
                <div className="flex mb-4">
                  <Star size={24} className="text-yellow-400" />
                  <Star size={24} className="text-yellow-400" />
                  <Star size={24} className="text-yellow-400" />
                  <Star size={24} className="text-yellow-400" />
                  <Star size={24} className="text-yellow-400" />
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  "ChatPDF đã dịch giáo trình 200 trang sang tiếng Pháp trong phút chốc. Định dạng hoàn hảo, tiết kiệm bao thời gian!"
                </p>
                <p className="text-sm font-semibold text-gray-800">Lan Nguyễn, Sinh viên</p>
              </div>
              <div className="p-8 bg-purple-50 rounded-xl shadow-md hover:shadow-lg transition">
                <div className="flex mb-4">
                  <Star size={24} className="text-yellow-400" />
                  <Star size={24} className="text-yellow-400" />
                  <Star size={24} className="text-yellow-400" />
                  <Star size={24} className="text-yellow-400" />
                  <Star size={24} className="text-yellow-400" />
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  "Chatbot Sider như người cố vấn, gợi ý ý tưởng khởi nghiệp sáng tạo chỉ sau vài phút trò chuyện!"
                </p>
                <p className="text-sm font-semibold text-gray-800">Hùng Trần, Doanh nhân</p>
              </div>
              <div className="p-8 bg-pink-50 rounded-xl shadow-md hover:shadow-lg transition">
                <div className="flex mb-4">
                  <Star size={24} className="text-yellow-400" />
                  <Star size={24} className="text-yellow-400" />
                  <Star size={24} className="text-yellow-400" />
                  <Star size={24} className="text-yellow-400" />
                  <Star size={24} className="text-yellow-400" />
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  "Dịch hợp đồng sang tiếng Nhật với ChatPDF – nhanh, chính xác, và giao diện siêu dễ dùng!"
                </p>
                <p className="text-sm font-semibold text-gray-800">Mai Phạm, Nhân viên kinh doanh</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 text-center bg-gradient-to-r from-purple-100 to-pink-200">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 animate-fade-in">
            Bắt Đầu Hành Trình Với Sider Ngay Hôm Nay!
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.3s' }}>
            Tham gia cộng đồng Sider để trải nghiệm trò chuyện thông minh, dịch PDF dễ dàng, và khám phá tri thức không giới hạn. Hãy thử ngay!
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link
              to="/pricing"
              className="px-8 py-3 bg-gradient-to-r from-pink-400 to-purple-500 text-white font-semibold rounded-full shadow-lg
                transition-all duration-300 hover:from-pink-500 hover:to-purple-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-300 animate-fade-in"
              style={{ animationDelay: '0.6s' }}
            >
              Tham gia ngay
            </Link>
            <Link
              to="/chatbot"
              className="px-8 py-3 bg-transparent border-2 border-pink-500 text-pink-500 font-semibold rounded-full
                transition-all duration-300 hover:bg-pink-500 hover:text-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-300 animate-fade-in"
              style={{ animationDelay: '0.9s' }}
            >
              Trải nghiệm miễn phí
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;