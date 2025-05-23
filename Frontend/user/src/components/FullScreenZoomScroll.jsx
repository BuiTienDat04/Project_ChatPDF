
import '../animation.css';

import React, { useRef, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { FaRobot, FaFilePdf, FaSearchPlus } from 'react-icons/fa';

const ZoomScrollSection = ({ children, isActive }) => {
  return (
    <div
      className={`
            absolute w-full h-screen flex items-center justify-center p-8
            transition-opacity duration-1000 ease-in-out
            ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}
          `}
    >
      <div className="relative z-10 max-w-6xl w-full text-center p-8">
        <div className="space-y-8">
          {children}
        </div>
      </div>
    </div>
  );
};

const FeatureTab = ({ tab, isActive, onClick }) => (
  <button
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
        className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 bg-gradient-to-br ${tab.colorClass} shadow-xl`}
      >
        {React.cloneElement(tab.icon, { className: 'h-10 w-10 text-white' })}
      </div>
      <h3 className={`text-3xl md:text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r ${tab.colorClass.replace('bg-gradient-to-br', '')}`}>
        {tab.title}
      </h3>
      <p className="text-lg md:text-xl leading-relaxed text-gray-100 max-w-2xl mx-auto">
        {tab.description}
      </p>
    </div>
  </div>
);

const SiderFeatureTabs = () => {
  const [activeTab, setActiveTab] = React.useState(0);

  const tabs = [
    {
      number: 1,
      title: "Trò Chuyện AI Đa Năng",
      description: "Giải đáp mọi thắc mắc, viết nội dung sáng tạo, và hỗ trợ học tập với chatbot AI thông minh của Sider. Luôn sẵn sàng phục vụ bạn 24/7.",
      icon: <FaRobot />,
      colorClass: 'from-pink-400 to-purple-400',
    },
    {
      number: 2,
      title: "Dịch PDF Chuẩn Xác",
      description: "Dịch tài liệu PDF sang hơn 100 ngôn ngữ, giữ nguyên định dạng, bố cục và hình ảnh. Phá vỡ rào cản ngôn ngữ trong nghiên cứu và công việc.",
      icon: <FaFilePdf />,
      colorClass: 'from-purple-400 to-blue-400',
    },
    {
      number: 3,
      title: "Phân Tích & Tóm Tắt PDF",
      description: "Trích xuất thông tin quan trọng, tóm tắt nội dung dài, và trả lời câu hỏi trực tiếp từ tài liệu PDF. Tiết kiệm thời gian đọc và tăng cường hiểu biết.",
      icon: <FaSearchPlus />,
      colorClass: 'from-blue-400 to-pink-400',
    },
  ];

  return (
    <div className="relative flex flex-col md:flex-row bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 p-8 max-w-6xl mx-auto">
      <div className="absolute top-0 left-0 w-64 h-64 bg-pink-400 opacity-20 rounded-full filter blur-3xl -translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-400 opacity-20 rounded-full filter blur-3xl translate-x-1/3 translate-y-1/3"></div>
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

const TypewriterText = ({ text, isActive, className, delay = 0 }) => {
  const [displayedText, setDisplayedText] = React.useState('');
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isDeleting, setIsDeleting] = React.useState(false);

  React.useEffect(() => {
    let timeout;
    let interval;

    if (isActive) {
      timeout = setTimeout(() => {
        interval = setInterval(() => {
          setCurrentIndex((prev) => {
            if (prev < text.length) {
              setDisplayedText(text.slice(0, prev + 1));
              return prev + 1;
            } else {
              clearInterval(interval);
              return prev;
            }
          });
        }, 40);
      }, delay * 1000);
    } else if (!isActive && displayedText.length > 0) {
      setIsDeleting(true);
      interval = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev > 0) {
            setDisplayedText(text.slice(0, prev - 1));
            return prev - 1;
          } else {
            setIsDeleting(false);
            clearInterval(interval);
            return 0;
          }
        });
      }, 50);
    }

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [isActive, text, delay]);

  return (
    <span className={`${className} transition-opacity duration-300`}>
      {displayedText}
    </span>
  );
};

const SparkleBackground = () => {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.01,
        phase: Math.random() * Math.PI * 2,
      });
    }

    let animationFrameId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        const opacity = particle.opacity + Math.sin(particle.phase + performance.now() * particle.twinkleSpeed) * 0.3;
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, Math.min(0.8, opacity))})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 5 }} />;
};

const FullScreenZoomScroll = () => {
  const [currentSection, setCurrentSection] = React.useState(0);
  const containerRef = React.useRef();
  const isScrolling = React.useRef(false);
  const isCapturingScroll = React.useRef(true);
  const accumulatedDelta = React.useRef(0);
  const lastScrollTime = React.useRef(0);
  const animationFrameId = React.useRef(null);

  const sections = [
    {
      content: (
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-8 leading-tight">
            <TypewriterText
              text="Chào Mừng Đến Với Sider AI"
              isActive={currentSection === 0}
              className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400"
            />
          </h2>
          <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto leading-relaxed font-medium">
            <TypewriterText
              text="Khám phá sức mạnh của trí tuệ nhân tạo trong việc xử lý ngôn ngữ và tài liệu. Trải nghiệm sự khác biệt ngay hôm nay!"
              isActive={currentSection === 0}
              delay={0.4}
            />
          </p>
        </div>
      )
    },
    {
      content: (
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-8 leading-tight">
            <TypewriterText
              text="Tăng Cường Hiệu Suất"
              isActive={currentSection === 1}
              className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400"
            />
          </h2>
          <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto leading-relaxed font-medium">
            <TypewriterText
              text="Sider AI mang đến các giải pháp thông minh để tối ưu hóa công việc cá nhân và doanh nghiệp của bạn."
              isActive={currentSection === 1}
              delay={0.4}
            />
          </p>
        </div>
      )
    },
    {
      content: <SiderFeatureTabs />
    },
    {
      content: (
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-8 leading-tight">
            <TypewriterText
              text="Sẵn Sàng Trải Nghiệm?"
              isActive={currentSection === 3}
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400"
            />
          </h2>
          <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto leading-relaxed font-medium">
            <TypewriterText
              text="Tham gia Sider AI để khám phá tiềm năng vô hạn của trí tuệ nhân tạo ngay hôm nay!"
              isActive={currentSection === 3}
              delay={0.4}
            />
          </p>
          <button className="mt-10 px-8 py-4 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
            Dùng Thử Miễn Phí
          </button>
        </div>
      )
    }
  ];

  const smoothScroll = () => {
    if (Math.abs(accumulatedDelta.current) > 0) {
      const friction = 0.9; // Damping factor for smooth deceleration
      const scrollAmount = accumulatedDelta.current * 0.1; // Scroll speed factor
      window.scrollBy(0, scrollAmount);
      accumulatedDelta.current *= friction;

      if (Math.abs(accumulatedDelta.current) < 1) {
        accumulatedDelta.current = 0;
      }
      animationFrameId.current = requestAnimationFrame(smoothScroll);
    } else {
      cancelAnimationFrame(animationFrameId.current);
    }
  };

  React.useEffect(() => {
    const handleWheel = (e) => {
      const currentTime = performance.now();
      if (currentTime - lastScrollTime.current < 50) return; // Debounce wheel events
      lastScrollTime.current = currentTime;

      if (isCapturingScroll.current) {
        e.preventDefault();
        if (!isScrolling.current) {
          isScrolling.current = true;
          const direction = e.deltaY > 0 ? 1 : -1;

          setCurrentSection(prev => {
            const newSection = prev + direction;

            if (newSection > sections.length - 1 && direction > 0) {
              isCapturingScroll.current = false;
              accumulatedDelta.current += e.deltaY;
              animationFrameId.current = requestAnimationFrame(smoothScroll);
              return prev;
            }

            if (newSection < 0 && direction < 0) {
              isCapturingScroll.current = false;
              accumulatedDelta.current += e.deltaY;
              animationFrameId.current = requestAnimationFrame(smoothScroll);
              return prev;
            }

            return Math.min(Math.max(newSection, 0), sections.length - 1);
          });

          setTimeout(() => {
            isScrolling.current = false;
          }, 1000);
        }
      } else {
        accumulatedDelta.current += e.deltaY;
        if (!animationFrameId.current) {
          animationFrameId.current = requestAnimationFrame(smoothScroll);
        }
      }
    };

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition <= 0 && !isCapturingScroll.current) {
        isCapturingScroll.current = true;
        setCurrentSection(0);
        accumulatedDelta.current = 0;
        cancelAnimationFrame(animationFrameId.current);
      }
      if (scrollPosition < window.innerHeight && scrollPosition > 0 && !isCapturingScroll.current) {
        isCapturingScroll.current = true;
        setCurrentSection(sections.length - 1);
        window.scrollTo({ top: 0 });
        accumulatedDelta.current = 0;
        cancelAnimationFrame(animationFrameId.current);
      }
    };

    const container = containerRef.current;
    container.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, [sections.length]);

  return (
    <div
      ref={containerRef}
      className="relative h-screen bg-gray-900 font-sans text-white"
      style={{ top: 0, position: 'sticky' }}
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-pink-300 to-blue-500 opacity-80"
        style={{ backgroundSize: '200% 200%' }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <SparkleBackground />
      {sections.map((section, index) => (
        <ZoomScrollSection
          key={index}
          isActive={currentSection === index}
        >
          {section.content}
        </ZoomScrollSection>
      ))}
    </div>
  );
};

const App = () => {
  return (
    <div>
      <FullScreenZoomScroll />
      <div className="min-h-screen bg-gray-800 text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Sider: Đột Phá Công Nghệ AI</h2>
          <p className="text-xl max-w-2xl mx-auto">
            Sider AI mang đến trải nghiệm giao tiếp và dịch thuật vượt trội, kết nối trí thức toàn cầu với công nghệ tiên tiến.
          </p>
        </div>
      </div>
    </div>
  );
};



export default FullScreenZoomScroll;