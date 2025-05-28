import '../animation.css';
import React, { useState, useEffect, useRef, memo } from 'react';
import { FaRobot, FaFilePdf, FaSearchPlus } from 'react-icons/fa';

const ZoomScrollSection = memo(({ children, isActive, innerRef }) => (
  <div
    ref={innerRef}
    className={`
      absolute w-full h-screen flex items-center justify-center px-6 sm:px-10
      transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]
      ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none'}
    `}
    style={{ top: '60px' }}
  >
    <div className="relative z-10 max-w-5xl w-full text-center">
      {children}
    </div>
  </div>
));

const FeatureTab = memo(({ tab, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`
      relative flex items-center gap-4 p-4 rounded-xl w-full max-w-sm
      transition-all duration-300 ease-in-out
      ${isActive
        ? `bg-gradient-to-r ${tab.colorClass} shadow-xl scale-105 text-white`
        : 'bg-gray-800/60 hover:bg-gray-700/80 text-gray-200 hover:scale-102'}
      group focus:outline-none focus:ring-2 focus:ring-white/30
    `}
  >
    <div className="flex-shrink-0">
      {React.cloneElement(tab.icon, { className: 'h-10 w-10' })}
    </div>
    <div className="text-left">
      <span className="block text-base font-semibold">Tính năng {tab.number}</span>
      <span className="text-xl font-bold">{tab.title}</span>
    </div>
    <div
      className={`absolute inset-0 rounded-xl bg-gradient-to-r ${tab.colorClass} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
    />
  </button>
));

const FeatureContent = memo(({ tab, isActive }) => (
  <div
    className={`
      absolute w-full px-6 sm:px-8 py-10 transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]
      ${isActive ? 'opacity-100 translate-x-0 animate-fadeInUp' : 'opacity-0 translate-x-12 pointer-events-none'}
    `}
  >
    <div className="flex flex-col md:flex-row items-center gap-8 max-w-5xl mx-auto">
      <img
        src={tab.image}
        alt={tab.title}
        className="w-full md:w-1/2 h-72 object-cover rounded-lg shadow-lg"
      />
      <div className="text-center md:text-left">
        <h3
          className={`text-3xl sm:text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r ${tab.colorClass}`}
        >
          {tab.title}
        </h3>
        <p className="text-xl sm:text-2xl text-gray-200 max-w-lg mx-auto md:mx-0">
          {tab.description}
        </p>
      </div>
    </div>
  </div>
));

const SiderFeatureTabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    {
      number: 1,
      title: "AI Chat Đa Năng",
      description: "Tương tác với chatbot AI thông minh, giải đáp mọi thắc mắc, hỗ trợ sáng tạo nội dung và học tập 24/7.",
      icon: <FaRobot />,
      colorClass: 'from-pink-500 to-purple-600',
      image: 'https://via.placeholder.com/400x250?text=AI+Chat',
    },
    {
      number: 2,
      title: "Dịch PDF Chuyên Nghiệp",
      description: "Dịch tài liệu PDF sang hơn 100 ngôn ngữ với độ chính xác cao, giữ nguyên định dạng và bố cục.",
      icon: <FaFilePdf />,
      colorClass: 'from-purple-500 to-pink-600',
      image: 'https://via.placeholder.com/400x250?text=PDF+Translation',
    },
    {
      number: 3,
      title: "Tóm Tắt & Phân Tích PDF",
      description: "Trích xuất thông tin quan trọng, tóm tắt nội dung dài và trả lời câu hỏi từ PDF nhanh chóng.",
      icon: <FaSearchPlus />,
      colorClass: 'from-pink-400 to-purple-700',
      image: 'https://via.placeholder.com/400x250?text=PDF+Analysis',
    },
  ];

  return (
    <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 max-w-6xl mx-auto">
      <div className="absolute top-0 left-0 w-48 h-48 bg-pink-500 opacity-10 rounded-full filter blur-3xl -translate-x-1/4 -translate-y-1/4"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-500 opacity-10 rounded-full filter blur-3xl translate-x-1/4 translate-y-1/4"></div>
      <div className="relative flex flex-col gap-6">
        <div className="flex justify-center gap-4">
          {tabs.map((tab, index) => (
            <FeatureTab
              key={index}
              tab={tab}
              isActive={activeTab === index}
              onClick={() => setActiveTab(index)}
            />
          ))}
        </div>
        <div className="relative min-h-[450px]">
          {tabs.map((tab, index) => (
            <FeatureContent key={index} tab={tab} isActive={activeTab === index} />
          ))}
        </div>
      </div>
    </div>
  );
};

const TypewriterText = memo(({ text, isActive, className, delay = 0 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let timeout, interval;
    if (isActive) {
      timeout = setTimeout(() => {
        interval = setInterval(() => {
          setCurrentIndex((prev) => {
            if (prev < text.length) {
              setDisplayedText(text.slice(0, prev + 1));
              return prev + 1;
            }
            clearInterval(interval);
            return prev;
          });
        }, 40);
      }, delay * 1000);
    } else if (displayedText.length > 0) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev > 0) {
            setDisplayedText(text.slice(0, prev - 1));
            return prev - 1;
          }
          clearInterval(interval);
          return 0;
        });
      }, 20);
    }
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [isActive, text, delay]);

  return <span className={className}>{displayedText}</span>;
});

const SparkleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      opacity: Math.random() * 0.4 + 0.2,
      twinkleSpeed: Math.random() * 0.02 + 0.01,
      phase: Math.random() * Math.PI * 2,
    }));

    let animationFrameId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        const opacity =
          particle.opacity + Math.sin(particle.phase + performance.now() * particle.twinkleSpeed) * 0.2;
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, Math.min(0.7, opacity))})`;
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
  const [currentSection, setCurrentSection] = useState(0);
  const containerRef = useRef();
  const sectionRefs = useRef([]);
  const isScrolling = useRef(false);
  const isCapturingScroll = useRef(true);
  const lastScrollTime = useRef(0);

  const sections = [
    {
      content: (
        <div className="max-w-5xl mx-auto text-center px-6 sm:px-8">
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-12 leading-tight">
            <TypewriterText
              text="Khám Phá Sider AI"
              isActive={currentSection === 0}
              className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-500"
            />
          </h2>
          <p className="text-xl sm:text-2xl text-gray-100 max-w-3xl mx-auto leading-relaxed mb-10 px-4">
            <TypewriterText
              text="Trải nghiệm sức mạnh của AI trong giao tiếp và xử lý tài liệu với công nghệ tiên tiến."
              isActive={currentSection === 0}
              delay={0.3}
            />
          </p>
        </div>
      ),
    },
    {
      content: (
        <div className="max-w-5xl mx-auto text-center px-6 sm:px-8">
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-12 leading-tight">
            <TypewriterText
              text="Tối Ưu Hóa Công Việc"
              isActive={currentSection === 1}
              className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
            />
          </h2>
          <p className="text-xl sm:text-2xl text-gray-100 max-w-3xl mx-auto leading-relaxed mb-10 px-4">
            <TypewriterText
              text="Sider AI giúp bạn làm việc hiệu quả hơn với các giải pháp thông minh, sáng tạo."
              isActive={currentSection === 1}
              delay={0.3}
            />
          </p>
        </div>
      ),
    },
    {
      content: <SiderFeatureTabs />,
    },
    {
      content: (
        <div className="max-w-5xl mx-auto text-center px-6 sm:px-8">
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-12 leading-tight">
            <TypewriterText
              text="Bắt Đầu Hành Trình AI"
              isActive={currentSection === 3}
              className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-500"
            />
          </h2>
          <p className="text-xl sm:text-2xl text-gray-100 max-w-3xl mx-auto leading-relaxed mb-10 px-4">
            <TypewriterText
              text="Tham gia ngay để khám phá tiềm năng vô hạn của trí tuệ nhân tạo với Sider!"
              isActive={currentSection === 3}
              delay={0.3}
            />
          </p>
          <button className="mt-6 px-12 py-5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-xl shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300">
            Dùng Thử Miễn Phí
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const handleWheel = (e) => {
      const currentTime = performance.now();
      if (currentTime - lastScrollTime.current < 50) return;
      lastScrollTime.current = currentTime;

      if (isCapturingScroll.current && !isScrolling.current) {
        e.preventDefault();
        isScrolling.current = true;
        const direction = e.deltaY > 0 ? 1 : -1;
        const sectionElement = sectionRefs.current[currentSection];

        if (sectionElement) {
          const { scrollTop, scrollHeight, clientHeight } = sectionElement;
          const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5;
          const isAtTop = scrollTop <= 5;

          if (direction > 0 && !isAtBottom) {
            // Scroll down within the current section if not at the bottom
            isScrolling.current = false;
            return;
          } else if (direction < 0 && !isAtTop) {
            // Scroll up within the current section if not at the top
            isScrolling.current = false;
            return;
          }
        }

        setCurrentSection((prev) => {
          const newSection = prev + direction;
          if (newSection >= 0 && newSection < sections.length) {
            // Reset scroll position of the new section
            if (sectionRefs.current[newSection]) {
              sectionRefs.current[newSection].scrollTop = 0;
            }
            // Chỉ cho phép cuộn xuống nội dung bên dưới nếu đang ở section cuối và đã cuộn đến cuối nội dung
            if (newSection === sections.length - 1 && direction > 0 && sectionElement?.scrollTop + sectionElement?.clientHeight >= sectionElement?.scrollHeight - 5) {
              isCapturingScroll.current = false;
            }
            return newSection;
          }
          // Nếu đang ở section cuối và cuộn xuống, cho phép cuộn xuống nội dung bên dưới
          if (prev === sections.length - 1 && direction > 0 && sectionElement?.scrollTop + sectionElement?.clientHeight >= sectionElement?.scrollHeight - 5) {
            isCapturingScroll.current = false;
          }
          // Nếu cuộn lên từ section 0, giữ nguyên logic
          if (newSection < 0) {
            return prev;
          }
          return prev;
        });

        setTimeout(() => {
          isScrolling.current = false;
        }, 800);
      }
    };

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Nếu cuộn ngược lại lên đầu và không còn capturing scroll, bật lại capturing
      if (scrollPosition <= 0 && !isCapturingScroll.current) {
        isCapturingScroll.current = true;
        setCurrentSection(0);
        if (sectionRefs.current[0]) {
          sectionRefs.current[0].scrollTop = 0;
        }
      }
    };

    const container = containerRef.current;
    container.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll);

    // Initialize refs for sections
    sectionRefs.current = sections.map(() => sectionRefs.current[sections.indexOf(sections[0])] || null);

    return () => {
      container.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sections.length]);

  return (
    <div
      ref={containerRef}
      className="relative h-screen bg-gray-900 font-sans text-white overflow-hidden"
      style={{ top: 0, position: 'sticky' }}
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-600 opacity-80 animate-gradient"
      ></div>
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <SparkleBackground />
      {sections.map((section, index) => (
        <ZoomScrollSection
          key={index}
          isActive={currentSection === index}
          innerRef={(el) => (sectionRefs.current[index] = el)}
        >
          {section.content}
        </ZoomScrollSection>
      ))}
    </div>
  );
};

const App = () => (
  <div>
    <FullScreenZoomScroll />
    <div className="min-h-screen bg-gray-800 text-white flex items-center justify-center">
      <div className="text-center px-6">
        <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-500">
          Sider: Đột Phá Công Nghệ AI
        </h2>
        <p className="text-xl sm:text-2xl max-w-3xl mx-auto">
          Kết nối trí thức toàn cầu với các giải pháp AI tiên tiến, từ giao tiếp đến xử lý tài liệu.
        </p>
      </div>
    </div>
  </div>
);

export default FullScreenZoomScroll;