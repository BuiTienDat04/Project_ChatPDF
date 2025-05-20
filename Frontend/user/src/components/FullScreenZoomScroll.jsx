import React, { useRef, useEffect, useState } from 'react';

const ZoomScrollSection = ({ children, backgroundGradient }) => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.35 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`
        relative w-full h-screen flex items-center justify-center p-6
        snap-center overflow-hidden
        transition-all duration-800 ease-[cubic-bezier(0.4,0,0.2,1)]
        ${isVisible ? 'opacity-100' : 'opacity-20'}
      `}
      style={{ willChange: 'opacity' }}
    >
      {/* Gradient Background */}
      <div
        className={`absolute inset-0 ${backgroundGradient} opacity-60 animate-gradient-pulse`}
        style={{
          backgroundSize: '200% 200%',
          animation: 'gradient-pulse 15s ease infinite',
        }}
      ></div>
      {/* Particle Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_70%)] animate-pulse-slow"></div>
      </div>
      {/* Main Content */}
      <div className="relative z-10 max-w-5xl text-center p-6">
        <div className={`space-y-6 ${isVisible ? 'animate-zoomFromCenter' : 'scale-0'}`}>
          {children}
        </div>
      </div>
    </section>
  );
};

const SiderFeatureTabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      number: 1,
      title: "Trò Chuyện AI Đa Năng",
      description: "Giải đáp mọi thắc mắc, viết nội dung sáng tạo, và hỗ trợ học tập với chatbot AI thông minh của Sider. Luôn sẵn sàng phục vụ bạn 24/7.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      colorClass: 'from-purple-500 to-pink-400',
    },
    {
      number: 2,
      title: "Dịch PDF Chuẩn Xác",
      description: "Dịch tài liệu PDF sang hơn 100 ngôn ngữ, giữ nguyên định dạng, bố cục và hình ảnh. Phá vỡ rào cản ngôn ngữ trong nghiên cứu và công việc.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      colorClass: 'from-indigo-500 to-purple-400',
    },
    {
      number: 3,
      title: "Phân Tích & Tóm Tắt PDF",
      description: "Trích xuất thông tin quan trọng, tóm tắt nội dung dài, và trả lời câu hỏi trực tiếp từ tài liệu PDF. Tiết kiệm thời gian đọc và tăng cường hiểu biết.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      colorClass: 'from-rose-500 to-red-400',
    },
  ];

  return (
    <div className="flex flex-col md:flex-row bg-white/5 backdrop-blur-3xl rounded-3xl shadow-lg overflow-hidden w-full max-w-5xl mx-auto border border-white/10 p-6 h-auto md:h-[480px] relative">
      {/* Glowing Corner Effects */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-purple-400 opacity-8 rounded-full filter blur-3xl animate-pulse-light -translate-x-1/4 -translate-y-1/4"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-pink-400 opacity-8 rounded-full filter blur-3xl animate-pulse-light delay-500 -translate-x-1/4 -translate-y-1/4"></div>

      {/* Left Side: Number Tabs */}
      <div className="flex md:flex-col justify-center md:justify-start space-x-4 md:space-x-0 md:space-y-8 p-4 md:pr-10 md:border-r border-white/10 flex-shrink-0 z-10">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`
              relative h-14 w-14 md:h-16 md:w-16 rounded-full flex items-center justify-center
              transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer
              ${activeTab === index
                ? `bg-gradient-to-br ${tab.colorClass} shadow-lg ring-4 ring-white/20 transform scale-110`
                : 'bg-gray-800/60 hover:bg-gray-700/70 text-gray-300 hover:text-white transform hover:scale-105'}
              group focus:outline-none focus:ring-2 focus:ring-white/30
            `}
          >
            <span className={`text-2xl font-bold transition-colors duration-400 ${activeTab === index ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
              {tab.number}
            </span>
            <div className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-15 transition-opacity duration-400 bg-gradient-to-br ${tab.colorClass}`}></div>
          </button>
        ))}
      </div>

      {/* Right Side: Content */}
      <div className="flex-1 p-6 md:p-8 relative min-h-[280px] md:min-h-0 flex items-center justify-center overflow-hidden z-10">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`
              absolute w-full px-4
              transition-opacity duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
              text-white text-center
              ${activeTab === index
                ? 'opacity-100 relative'
                : 'opacity-0 pointer-events-none absolute'}
            `}
          >
            <div className="flex flex-col items-center justify-center">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-gradient-to-br ${tab.colorClass} shadow-lg ${activeTab === index ? 'animate-zoomFromCenter' : 'scale-0'}`}
                style={{ animationDelay: '0.1s', transformOrigin: 'center' }}
              >
                {tab.icon}
              </div>
              <h3
                className={`text-2xl md:text-3xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-200 drop-shadow-sm ${activeTab === index ? 'animate-zoomFromCenter' : 'scale-0'}`}
                style={{ animationDelay: '0.2s', transformOrigin: 'center' }}
              >
                {tab.title}
              </h3>
              <p
                className={`text-base md:text-lg leading-relaxed text-gray-200 max-w-lg md:max-w-xl mx-auto ${activeTab === index ? 'animate-zoomFromCenter' : 'scale-0'}`}
                style={{ animationDelay: '0.3s', transformOrigin: 'center' }}
              >
                {tab.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const FullScreenZoomScroll = () => {
  return (
    <div className="snap-y snap-mandatory h-screen overflow-y-scroll scroll-smooth bg-gray-900 font-sans">
      <ZoomScrollSection backgroundGradient="bg-gradient-to-br from-purple-950 via-gray-900 to-pink-950">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight drop-shadow-md">
          Chào Mừng Đến Với Sider AI
        </h2>
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-sm">
          Khám phá sức mạnh của trí tuệ nhân tạo trong việc xử lý ngôn ngữ và tài liệu.
        </p>
      </ZoomScrollSection>

      <ZoomScrollSection backgroundGradient="bg-gradient-to-br from-fuchsia-950 via-gray-900 to-indigo-950">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight drop-shadow-md">
          Tăng Cường Hiệu Suất Cá Nhân & Doanh Nghiệp
        </h2>
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-sm">
          Sider AI mang đến các giải pháp đột phá để tối ưu công việc hàng ngày của bạn.
        </p>
      </ZoomScrollSection>

      <ZoomScrollSection backgroundGradient="bg-gradient-to-br from-violet-950 via-gray-900 to-rose-950">
        <SiderFeatureTabs />
      </ZoomScrollSection>

      <ZoomScrollSection backgroundGradient="bg-gradient-to-br from-blue-950 via-gray-900 to-purple-950">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight drop-shadow-md">
          Sẵn Sàng Trải Nghiệm?
        </h2>
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-sm">
          Bắt đầu hành trình khám phá AI cùng Sider ngay hôm nay!
        </p>
      </ZoomScrollSection>
    </div>
  );
};

export default FullScreenZoomScroll;

// Tailwind CSS custom styles
<style jsx global>{`
  @keyframes gradient-pulse {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @keyframes pulse-slow {
    0%, 100% { opacity: 0.08; }
    50% { opacity: 0.12; }
  }

  @keyframes pulse-light {
    0%, 100% { opacity: 0.08; }
    50% { opacity: 0.12; }
  }

  @keyframes zoomFromCenter {
    from {
      opacity: 0;
      transform: scale(0);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .animate-zoomFromCenter {
    animation: zoomFromCenter 0.6s ease-[cubic-bezier(0.4,0,0.2,1)] forwards;
    transform-origin: center;
  }
`}</style>