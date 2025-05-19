import React, { useState } from 'react';
import { Users, Lightbulb, Heart } from 'lucide-react';

const OurVisionSection = () => {
  const [activeCard, setActiveCard] = useState(null);

  const handleCardClick = (index) => {
    setActiveCard(activeCard === index ? null : index);
  };

  const visionCards = [
    {
      icon: <Users size={64} className="text-pink-500 animate-float hover:scale-110 transition-transform duration-300" stroke="url(#iconGradient)" />,
      title: "Cộng Đồng Vũ Trụ",
      subtitle: "Kết nối tri thức, xóa tan rào cản",
      description: "Sider AI xây dựng một dải ngân hà tri thức, nơi hàng triệu tâm hồn hòa nhịp qua chatbot thông minh và bản dịch PDF đa ngôn ngữ, phá bỏ mọi giới hạn địa lý và ngôn ngữ.",
      expandedContent: (
        <div className="mt-4 text-gray-700 leading-relaxed text-base animate-fade-in-up font-inter">
          <p>Chatbot của Sider hoạt động 24/7, trả lời mọi thắc mắc từ học thuật đến sáng tạo, giúp người dùng trên toàn cầu kết nối dễ dàng. Công nghệ dịch PDF hỗ trợ hơn 100 ngôn ngữ, giữ nguyên định dạng, mang tri thức đến mọi ngóc ngách của thế giới.</p>
          <p className="mt-2 italic">“Sider đã giúp tôi trò chuyện với đối tác quốc tế mà không cần lo lắng về rào cản ngôn ngữ!” – Minh Anh, Nhà sáng tạo nội dung</p>
        </div>
      ),
    },
    {
      icon: <Lightbulb size={64} className="text-rose-500 animate-float hover:scale-110 transition-transform duration-300" stroke="url(#iconGradient)" />,
      title: "Sáng Tạo Vô Biên",
      subtitle: "Thắp sáng ý tưởng, dẫn đầu tương lai",
      description: "Sider AI tiên phong với chatbot sáng tạo và dịch thuật PDF nhanh như ánh sáng, mang đến những giải pháp đột phá, giúp bạn tỏa sáng trong mọi lĩnh vực.",
      expandedContent: (
        <div className="mt-4 text-gray-700 leading-relaxed text-base animate-fade-in-up font-inter">
          <p>Với khả năng trả lời tức thời và phân tích sâu sắc, chatbot Sider hỗ trợ từ việc xây dựng kế hoạch kinh doanh đến sáng tác nghệ thuật. Công cụ dịch PDF đảm bảo tài liệu của bạn sẵn sàng cho mọi thị trường quốc tế trong tích tắc.</p>
          <p className="mt-2 italic">“Sider đã truyền cảm hứng cho tôi viết một cuốn sách bằng ba ngôn ngữ chỉ trong một tuần!” – Hoàng Nam, Tác giả</p>
        </div>
      ),
    },
    {
      icon: <Heart size={64} className="text-pink-400 animate-float hover:scale-110 transition-transform duration-300" stroke="url(#iconGradient)" />,
      title: "Trao Quyền Vô Hạn",
      subtitle: "Chắp cánh giấc mơ, vươn tới ngôi sao",
      description: "Sider AI trao cho bạn đôi cánh tri thức với chatbot thông minh và dịch PDF chính xác, từ học tập, công việc đến khám phá những chân trời mới rực rỡ.",
      expandedContent: (
        <div className="mt-4 text-gray-700 leading-relaxed text-base animate-fade-in-up font-inter">
          <p>Sider hỗ trợ sinh viên dịch tài liệu học thuật, doanh nhân mở rộng thị trường toàn cầu, và nhà nghiên cứu khám phá kiến thức đa ngôn ngữ. Mỗi câu hỏi bạn đặt cho Sider là một bước tiến đến giấc mơ lớn hơn.</p>
          <p className="mt-2 italic">“Nhờ Sider, tôi đã dịch luận văn của mình sang năm ngôn ngữ và nhận được học bổng quốc tế!” – Linh Chi, Sinh viên</p>
        </div>
      ),
    },
  ];

  return (
    <section className="py-32 px-6 sm:px-12 bg-gradient-to-tr from-pink-100 to-pink-200 relative z-10">
      <div className="max-w-7xl mx-auto">
        <h2
          className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500 animate-fade-in-left tracking-tight text-shadow-glow max-w-4xl pl-4 font-inter"
          style={{ animationDelay: '0.3s', animationFillMode: 'forwards', lineHeight: '1.3' }}
        >
          Tầm Nhìn Của Sider
        </h2>
        <p
          className="text-2xl text-gray-700 max-w-5xl mt-6 mb-16 leading-relaxed animate-fade-in-up pl-4 font-inter italic"
          style={{ animationDelay: '0.5s', animationFillMode: 'forwards', lineHeight: '1.6' }}
        >
          Sider mơ về một vũ trụ nơi tri thức không có giới hạn, ngôn ngữ hòa quyện như ánh sao, và giấc mơ được chắp cánh bởi AI thông minh và sáng tạo.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {visionCards.map((card, index) => (
            <div
              key={index}
              className="relative p-12 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-pink-200/50 hover:bg-white/90 hover:shadow-xl transition-all duration-300 animate-zoom-in cursor-pointer"
              style={{ animationDelay: `${0.7 + index * 0.1}s` }}
              onClick={() => handleCardClick(index)}
            >
              {/* Ripple Effect on Click */}
              <div
                className={`absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500 ${
                  activeCard === index ? 'bg-pink-300/20 opacity-100 animate-ripple' : 'opacity-0'
                }`}
              ></div>
              {card.icon}
              <h3
                className="text-3xl font-bold text-gray-900 mb-2 animate-fade-in-up font-inter"
                style={{ animationDelay: `${0.9 + index * 0.1}s`, animationFillMode: 'forwards' }}
              >
                {card.title}
              </h3>
              <p
                className="text-lg text-pink-500 font-medium mb-4 animate-fade-in-up font-inter"
                style={{ animationDelay: `${1.0 + index * 0.1}s`, animationFillMode: 'forwards' }}
              >
                {card.subtitle}
              </p>
              <p
                className="text-gray-700 leading-relaxed text-base animate-fade-in-up font-inter"
                style={{ animationDelay: `${1.1 + index * 0.1}s`, animationFillMode: 'forwards' }}
              >
                {card.description}
              </p>
              {activeCard === index && (
                <div className="mt-4 animate-slide-down">
                  {card.expandedContent}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <style>
        {`
          @keyframes ripple {
            0% { transform: scale(0); opacity: 0.5; }
            50% { transform: scale(1); opacity: 0.3; }
            100% { transform: scale(2); opacity: 0; }
          }
          .animate-ripple {
            animation: ripple 0.6s ease-out;
          }
          @keyframes slide-down {
            0% { opacity: 0; transform: translateY(-10px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-slide-down {
            animation: slide-down 0.3s ease-out forwards;
          }
        `}
      </style>
      <svg className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <defs>
          <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#F9A8D4', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#FECACA', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
      </svg>
    </section>
  );
};

export default OurVisionSection;