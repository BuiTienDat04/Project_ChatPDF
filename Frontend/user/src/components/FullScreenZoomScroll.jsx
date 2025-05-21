import React, { useRef, useEffect, useState } from 'react';
import { FaRobot, FaFilePdf, FaSearchPlus } from 'react-icons/fa';
import '../animation.css';

const ZoomScrollSection = ({ children, backgroundGradient, isFirstSection }) => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(isFirstSection ? true : false);

  useEffect(() => {
    if (isFirstSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isFirstSection]);

  return (
    <section
      ref={sectionRef}
      className={`
        relative w-full h-screen flex items-center justify-center p-8
        snap-center overflow-hidden
        transition-all duration-1000 ease-[cubic-bezier(0.33,1,0.68,1)]
        ${isVisible ? 'opacity-100 scale-100' : 'opacity-50 scale-95'}
      `}
      style={{ willChange: 'opacity, transform' }}
    >
      <div
        className={`absolute inset-0 ${backgroundGradient} opacity-80 animate-wave-flow`}
        style={{ backgroundSize: '200% 200%' }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-15"></div>
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_80%)] animate-pulse-glow"></div>
      </div>
      <div className="relative z-10 max-w-6xl w-full text-center p-8">
        <div className={`space-y-8 ${isVisible ? 'animate-slide-up' : 'translate-y-10 opacity-0'}`}>
          {children}
        </div>
      </div>
    </section>
  );
};

const FeatureTab = ({ tab, isActive, onClick }) => (
  <button
    key={tab.number}
    onClick={onClick}
    className={`
      relative h-16 w-16 md:h-20 md:w-20 rounded-full flex items-center justify-center
      transition-all duration-400 ease-[cubic-bezier(0.33,1,0.68,1)] cursor-pointer
      ${isActive
        ? `bg-gradient-to-br ${tab.colorClass} shadow-xl ring-4 ring-white/30 scale-110`
        : 'bg-gray-800/70 hover:bg-gray-700/80 text-gray-200 hover:text-white hover:scale-105'}
      group focus:outline-none focus:ring-2 focus:ring-white/40
    `}
  >
    <span className={`text-2xl md:text-3xl font-extrabold ${isActive ? 'text-white' : 'text-gray-200 group-hover:text-white'}`}>
      {tab.number}
    </span>
    <div className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-25 transition-opacity duration-400 bg-gradient-to-br ${tab.colorClass}`}></div>
  </button>
);

const FeatureContent = ({ tab, isActive }) => (
  <div
    className={`
      absolute w-full px-6 py-8 transition-all duration-600 ease-[cubic-bezier(0.33,1,0.68,1)]
      text-white text-center
      ${isActive ? 'opacity-100 translate-y-0 relative' : 'opacity-0 translate-y-10 pointer-events-none absolute'}
    `}
  >
    <div className="flex flex-col items-center justify-center">
      <div
        className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 bg-gradient-to-br ${tab.colorClass} shadow-xl ${isActive ? 'animate-slide-up' : 'scale-0'}`}
        style={{ animationDelay: '0.2s' }}
      >
        {React.cloneElement(tab.icon, { className: 'h-10 w-10 text-white' })}
      </div>
      <h3 className={`text-3xl md:text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-100 drop-shadow-md ${isActive ? 'animate-slide-up' : 'scale-0'}`} style={{ animationDelay: '0.3s' }}>
        {tab.title}
      </h3>
      <p className={`text-lg md:text-xl leading-relaxed text-gray-100 max-w-2xl mx-auto ${isActive ? 'animate-slide-up' : 'scale-0'}`} style={{ animationDelay: '0.4s' }}>
        {tab.description}
      </p>
    </div>
  </div>
);

const SiderFeatureTabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      number: 1,
      title: "Trò Chuyện AI Đa Năng",
      description: "Giải đáp mọi thắc mắc, viết nội dung sáng tạo, và hỗ trợ học tập với chatbot AI thông minh của Sider. Luôn sẵn sàng phục vụ bạn 24/7.",
      icon: <FaRobot />,
      colorClass: 'from-pink-300 to-purple-300',
    },
    {
      number: 2,
      title: "Dịch PDF Chuẩn Xác",
      description: "Dịch tài liệu PDF sang hơn 100 ngôn ngữ, giữ nguyên định dạng, bố cục và hình ảnh. Phá vỡ rào cản ngôn ngữ trong nghiên cứu và công việc.",
      icon: <FaFilePdf />,
      colorClass: 'from-purple-300 to-indigo-300',
    },
    {
      number: 3,
      title: "Phân Tích & Tóm Tắt PDF",
      description: "Trích xuất thông tin quan trọng, tóm tắt nội dung dài, và trả lời câu hỏi trực tiếp từ tài liệu PDF. Tiết kiệm thời gian đọc và tăng cường hiểu biết.",
      icon: <FaSearchPlus />,
      colorClass: 'from-rose-300 to-pink-300',
    },
  ];

  return (
    <div className="relative flex flex-col md:flex-row bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 p-8 max-w-6xl mx-auto">
      <div className="absolute top-0 left-0 w-64 h-64 bg-pink-300 opacity-20 rounded-full filter blur-3xl animate-glow -translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-300 opacity-20 rounded-full filter blur-3xl animate-glow delay-300 translate-x-1/3 translate-y-1/3"></div>

      <div className="relative z-10 flex md:flex-col justify-center md:justify-start space-x-6 md:space-x-0 md:space-y-8 p-6 md:pr-12 md:border-r border-white/20 flex-shrink-0">
        {tabs.map((tab, index) => (
          <FeatureTab key={index} tab={tab} isActive={activeTab === index} onClick={() => setActiveTab(index)} />
        ))}
      </div>

      <div className="relative z-10 flex-1 p-8 min-h-[360px] flex items-center justify-center overflow-hidden">
        {tabs.map((tab, index) => (
          <FeatureContent key={index} tab={tab} isActive={activeTab === index} />
        ))}
      </div>
    </div>
  );
};

const FullScreenZoomScroll = () => {
  return (
    <div className="snap-y snap-mandatory h-screen overflow-y-scroll scroll-smooth bg-gray-950 font-sans text-white">
      <ZoomScrollSection backgroundGradient="bg-gradient-to-br from-pink-200 to-purple-200" isFirstSection={true}>
        <h2 className="text-5xl md:text-6xl font-extrabold mb-8 leading-tight drop-shadow-lg animate-slide-up" style={{ animationDelay: '0.1s' }}>
          Chào Mừng Đến Với <span className="text-pink-400">Sider AI</span>
        </h2>
        <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto leading-relaxed font-medium drop-shadow-md animate-slide-up" style={{ animationDelay: '0.2s' }}>
          Khám phá sức mạnh của trí tuệ nhân tạo trong việc xử lý ngôn ngữ và tài liệu. Trải nghiệm sự khác biệt ngay hôm nay!
        </p>
      </ZoomScrollSection>

      <ZoomScrollSection backgroundGradient="bg-gradient-to-br from-purple-200 to-indigo-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-8 leading-tight drop-shadow-lg animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Tăng Cường Hiệu Suất
          </h2>
          <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto leading-relaxed font-medium drop-shadow-md animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Sider AI mang đến các giải pháp thông minh để tối ưu hóa công việc cá nhân và doanh nghiệp của bạn.
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="bg-white/10 rounded-xl p-6 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
              <FaRobot className="h-12 w-12 text-pink-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Trợ Lý AI</h3>
              <p className="text-gray-200">Hỗ trợ thông minh, luôn sẵn sàng 24/7.</p>
            </div>
            <div className="bg-white/10 rounded-xl p-6 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
              <FaFilePdf className="h-12 w-12 text-purple-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Xử Lý PDF</h3>
              <p className="text-gray-200">Dịch và phân tích tài liệu dễ dàng.</p>
            </div>
            <div className="bg-white/10 rounded-xl p-6 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
              <FaSearchPlus className="h-12 w-12 text-rose-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Tìm Kiếm</h3>
              <p className="text-gray-200">Trích xuất thông tin nhanh chóng.</p>
            </div>
          </div>
        </div>
      </ZoomScrollSection>

      <ZoomScrollSection backgroundGradient="bg-gradient-to-br from-rose-200 to-pink-200">
        <SiderFeatureTabs />
      </ZoomScrollSection>

      <ZoomScrollSection backgroundGradient="bg-gradient-to-br from-blue-200 to-purple-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-8 leading-tight drop-shadow-lg animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Sẵn Sàng Trải Nghiệm?
          </h2>
          <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto leading-relaxed font-medium drop-shadow-md animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Tham gia Sider AI để khám phá tiềm năng vô hạn của trí tuệ nhân tạo ngay hôm nay!
          </p>
          <button className="mt-10 px-8 py-4 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            Dùng Thử Miễn Phí
          </button>
        </div>
      </ZoomScrollSection>
    </div>
  );
};

export default FullScreenZoomScroll;