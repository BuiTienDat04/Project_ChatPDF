import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import OurVisionSection from '../components/OurVisionSection';
import { MessageCircle, FileText, Globe, Star, Zap, BookOpen, Rocket, Sparkles, Users, Heart, Trophy, Lightbulb, Target, LucideLink } from 'lucide-react';

const HomePage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-200 to-white font-inter overflow-x-hidden relative">
            {/* Subtle Starry Background with Light Pink Stars */}
            <div className="fixed inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Cdefs%3E%3Cpattern id=%22stars%22 width=%2250%22 height=%2250%22 patternUnits=%22userSpaceOnUse%22%3E%3Ccircle cx=%2210%22 cy=%2210%22 r=%221.5%22 fill=%22%23F9A8D4%22 filter=%22url(%23glow)%22/%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22 fill=%22%23FECACA%22 filter=%22url(%23glow)%22/%3E%3Ccircle cx=%2240%22 cy=%2215%22 r=%221%22 fill=%22%23F472B6%22 filter=%22url(%23glow)%22/%3E%3C/pattern%3E%3Cfilter id=%22glow%22%3E%3CfeGaussianBlur stdDeviation=%222%22/%3E%3CfeComponentTransfer%3E%3CfeFuncA type=%22linear%22 slope=%221.3%22/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3C/defs%3E%3Crect width=%22100%25%22 height=%22100%25%22 fill=%22url(%23stars)%22/%3E%3C/svg%3E')] opacity-20 pointer-events-none animate-twinkle"></div>
            <Navigation />
            <main className="w-full relative z-10">
                {/* Hero Section */}
                <section className="relative flex flex-col items-start px-6 overflow-hidden bg-gradient-to-tr from-pink-100 via-pink-200 to-white">
                    {/* Cosmic Blob with Softer Pink */}
                    <div className="absolute inset-0 opacity-30 pointer-events-none animate-blob-pulse">
                        <svg
                            className="w-full h-full scale-150 transform translate-y-10"
                            viewBox="0 0 200 200"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill="url(#heroBlob)"
                                d="M44.7,-76.2C58.5,-69.2,70.2,-54.2,76.2,-38.2C82.2,-22.2,82.5,-5.2,78.2,11.8C73.9,28.8,65,45.8,52.5,58.2C40,70.6,23.5,78.4,5.5,80.8C-12.5,83.2,-29.5,80.2,-44.5,73.2C-59.5,66.2,-72.5,55.2,-79.8,41.2C-87.1,27.2,-88.7,10.2,-84.2,-6.8C-79.7,-23.8,-69.1,-40.8,-56.5,-56.8C-43.9,-72.8,-29.5,-87.8,-13.5,-89.8C2.5,-91.8,18.5,-80.8,44.7,-76.2Z"
                                transform="translate(100 100)"
                                filter="url(#blobGlow)"
                            />
                            <defs>
                                <linearGradient id="heroBlob" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style={{ stopColor: '#F9A8D4', stopOpacity: 0.9 }} />
                                    <stop offset="100%" style={{ stopColor: '#FECACA', stopOpacity: 0.8 }} />
                                </linearGradient>
                                <filter id="blobGlow">
                                    <feGaussianBlur stdDeviation="3" />
                                    <feComponentTransfer>
                                        <feFuncA type="linear" slope="1.4" />
                                    </feComponentTransfer>
                                </filter>
                            </defs>
                        </svg>
                    </div>
                    {/* Enhanced Particles with Sparkle Effect */}
                    <div className="absolute inset-0 pointer-events-none animate-particle-float">
                        {[...Array(40)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute bg-gradient-to-r from-pink-200 to-rose-200 rounded-full opacity-50 animate-particle-sparkle"
                                style={{
                                    width: `${Math.random() * 12 + 6}px`,
                                    height: `${Math.random() * 12 + 6}px`,
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    animationDelay: `${Math.random() * 8}s`,
                                    animationDuration: `${Math.random() * 15 + 8}s`,
                                }}
                            ></div>
                        ))}
                    </div>
                    {/* Galactic Orb with Subtle Glow */}
                    <div className="absolute right-6 top-1/4 hidden lg:block animate-float">
                        <svg
                            className="w-64 h-64"
                            viewBox="0 0 100 100"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle cx="50" cy="50" r="40" fill="url(#orbGradient)" className="animate-pulse-glow" filter="url(#orbGlow)" />
                            <circle cx="50" cy="50" r="30" fill="none" stroke="url(#orbStroke)" strokeWidth="4" className="animate-spin-slow" />
                            <defs>
                                <linearGradient id="orbGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style={{ stopColor: '#F9A8D4', stopOpacity: 0.9 }} />
                                    <stop offset="100%" style={{ stopColor: '#FECACA', stopOpacity: 0.8 }} />
                                </linearGradient>
                                <linearGradient id="orbStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style={{ stopColor: '#F472B6', stopOpacity: 1 }} />
                                    <stop offset="100%" style={{ stopColor: '#FECACA', stopOpacity: 1 }} />
                                </linearGradient>
                                <filter id="orbGlow">
                                    <feGaussianBlur stdDeviation="4" />
                                    <feComponentTransfer>
                                        <feFuncA type="linear" slope="1.6" />
                                    </feComponentTransfer>
                                </filter>
                            </defs>
                        </svg>
                    </div>

                    <div className="relative z-20 pt-20 pb-28 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
                        <style>
                            {`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
                .font-inter { font-family: 'Inter', sans-serif; }
                @keyframes sparkle {
                  0%, 100% { opacity: 0.3; transform: scale(1); }
                  50% { opacity: 0.8; transform: scale(1.5); }
                }
                .animate-sparkle { animation: sparkle 3s infinite ease-in-out; }
                @keyframes pulse-shadow {
                  0% { box-shadow: 0 0 10px rgba(249, 168, 212, 0.5); }
                  50% { box-shadow: 0 0 20px rgba(249, 168, 212, 0.8); }
                  100% { box-shadow: 0 0 10px rgba(249, 168, 212, 0.5); }
                }
                .animate-pulse-shadow { animation: pulse-shadow 2s infinite ease-in-out; }
              `}
                        </style>
                        <div className="relative z-20 pt-20 pb-28 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
                            <span className="inline-block px-8 py-4 mb-6 text-lg font-bold text-white bg-gradient-to-r from-pink-400 to-rose-400 rounded-full shadow-lg font-inter">
                                Trí Tuệ Nhân Tạo Thế Hệ Mới
                            </span>

                            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500 mb-10 tracking-tight max-w-4xl font-inter">
                                Sider AI - Công Nghệ Chuyển Ngữ Thông Minh
                            </h1>

                            <p className="text-2xl md:text-3xl text-gray-700 max-w-5xl mb-12 leading-relaxed font-inter">
                                <span className="block mb-4">Tương tác đa ngôn ngữ với AI và</span>
                                <span className="bg-gradient-to-r from-pink-400 to-rose-400 text-white px-4 py-2 rounded-lg">Xử lý tài liệu thông minh</span>
                            </p>

                            <div className="flex flex-col sm:flex-row gap-8 mb-16">
                                <Link
                                    to="/chatbot"
                                    className="px-16 py-8 bg-gradient-to-r from-pink-400 to-rose-400 text-white font-bold text-xl rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 hover:brightness-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-pink-300/50 font-inter"
                                >
                                    Trò Chuyện Cùng AI
                                </Link>
                                <Link
                                    to="/chatpdf"
                                    className="px-16 py-8 bg-white border-2 border-pink-400 text-pink-400 font-bold text-xl rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 hover:bg-pink-50 hover:border-pink-500 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-pink-300/50 font-inter"
                                >
                                    Chat với PDF Đa Ngôn Ngữ
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 max-w-5xl">
                                <div className="flex flex-col items-center">
                                    <span className="text-5xl font-bold text-pink-500 font-inter">99%+</span>
                                    <p className="text-xl text-gray-700 text-center font-inter">Độ chính xác dịch thời gian thực</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="text-5xl font-bold text-rose-500 font-inter">50+</span>
                                    <p className="text-xl text-gray-700 text-center font-inter">Định dạng tài liệu hỗ trợ</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="text-5xl font-bold text-pink-400 font-inter">3s</span>
                                    <p className="text-xl text-gray-700 text-center font-inter">Tốc độ xử lý siêu tốc</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Wave Divider */}
                <svg className="w-full h-24 -mt-12" viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0 40C240 20 480 60 720 40C960 20 1200 60 1440 40V80H0V40Z"
                        fill="url(#waveGradient)"
                    />
                    <defs>
                        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style={{ stopColor: '#F9A8D4', stopOpacity: 0.8 }} />
                            <stop offset="100%" style={{ stopColor: '#FECACA', stopOpacity: 0.8 }} />
                        </linearGradient>
                    </defs>
                </svg>

                {/* Why Sider Shines Section */}
                <section className="py-32 px-6 sm:px-12 relative z-10">
                    <div className="max-w-7xl mx-auto">
                        <h2
                            className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-rose-500 tracking-tight max-w-4xl pl-4 font-inter animate-fade-in-left"
                            style={{ animationDelay: '0.3s', animationFillMode: 'forwards', lineHeight: '1.3' }}
                        >
                            Sider: Ngọn Lửa Rực Rỡ
                        </h2>
                        <p
                            className="text-2xl text-gray-700 max-w-5xl mt-6 mb-16 leading-relaxed animate-fade-in-up pl-4 font-inter italic"
                            style={{ animationDelay: '0.5s', animationFillMode: 'forwards', lineHeight: '1.6' }}
                        >
                            Sider không chỉ là công cụ, mà là ngọn gió thổi hồn vào tri thức, mang đến những trải nghiệm AI đầy cảm hứng và lấp lánh ánh sáng.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div className="p-12 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-pink-200/50 hover:bg-white/90 hover:shadow-xl transition-all duration-300 animate-zoom-in" style={{ animationDelay: '0.7s' }}>
                                <Target size={64} className="text-pink-500 mb-6 mx-auto animate-float hover:scale-110 transition-transform duration-300" stroke="url(#iconGradient)" />
                                <h3 className="text-3xl font-bold text-gray-900 mb-4 animate-fade-in-up font-inter" style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}>
                                    Chính Xác Như Ánh Sao
                                </h3>
                                <p className="text-gray-700 leading-relaxed text-base animate-fade-in-up font-inter" style={{ animationDelay: '1.1s', animationFillMode: 'forwards' }}>
                                    AI của Sider tỏa sáng như những vì sao, mang đến câu trả lời và bản dịch chính xác tuyệt đối, thắp sáng mọi hành trình tri thức.
                                </p>
                            </div>
                            <div className="p-12 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-pink-200/50 hover:bg-white/90 hover:shadow-xl transition-all duration-300 animate-zoom-in" style={{ animationDelay: '0.8s' }}>
                                <Zap size={64} className="text-rose-500 mb-6 mx-auto animate-float hover:scale-110 transition-transform duration-300" stroke="url(#iconGradient)" />
                                <h3 className="text-3xl font-bold text-gray-900 mb-4 animate-fade-in-up font-inter" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
                                    Nhanh Như Ánh Sáng
                                </h3>
                                <p className="text-gray-700 leading-relaxed text-base animate-fade-in-up font-inter" style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}>
                                    Trò chuyện và dịch thuật với tốc độ ánh sáng, Sider giúp bạn chinh phục thời gian và bay cao trong mọi thử thách.
                                </p>
                            </div>
                            <div className="p-12 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-pink-200/50 hover:bg-white/90 hover:shadow-xl transition-all duration-300 animate-zoom-in" style={{ animationDelay: '0.9s' }}>
                                <LucideLink size={64} className="text-pink-400 mb-6 mx-auto animate-float hover:scale-110 transition-transform duration-300" stroke="url(#iconGradient)" />
                                <h3 className="text-3xl font-bold text-gray-900 mb-4 animate-fade-in-up font-inter" style={{ animationDelay: '1.1s', animationFillMode: 'forwards' }}>
                                    Hòa Nhịp Vô Tận
                                </h3>
                                <p className="text-gray-700 leading-relaxed text-base animate-fade-in-up font-inter" style={{ animationDelay: '1.3s', animationFillMode: 'forwards' }}>
                                    Sider hòa quy-renew mượt mà với mọi công cụ bạn yêu thích, từ học tập đến công việc, tạo nên một vũ điệu tri thức đầy cảm hứng.
                                </p>
                            </div>
                        </div>
                    </div>
                    <svg className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                        <defs>
                            <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style={{ stopColor: '#F9A8D4', stopOpacity: 1 }} />
                                <stop offset="100%" style={{ stopColor: '#FECACA', stopOpacity: 1 }} />
                            </linearGradient>
                        </defs>
                    </svg>
                </section>

                {/* Wave Divider */}
                <svg className="w-full h-24 -mt-12" viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0 40C240 60 480 20 720 40C960 60 1200 20 1440 40V80H0V40Z"
                        fill="url(#waveGradient)"
                    />
                </svg>

                {/* Our Vision Section */}
                {/* Interactive Core Features Section */}
                <section className="py-32 px-6 sm:px-12 relative z-10">
                    <div className="max-w-7xl mx-auto">
                        <div className="mb-20 space-y-4 pl-4">
                            <h2 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600 tracking-tight font-inter animate-slide-in-left">
                                Thế Giới PDF Thuần Khiết
                            </h2>
                            <p className="text-2xl text-gray-700 max-w-3xl leading-relaxed font-inter animate-slide-in-left delay-100">
                                "Biến mọi tài liệu PDF thành tri thức sống động - Nơi công nghệ thấu hiểu ngôn ngữ của văn bản"
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Card 1 - Magic PDF Translator */}
                            <div className="bg-white/90 backdrop-blur-lg rounded-xl shadow-2xl hover:shadow-3xl border-2 border-transparent hover:border-pink-300 transition-all duration-300 cursor-pointer group relative overflow-hidden transform hover:-translate-y-2 h-[400px] flex flex-col">
                                <div className="p-8 flex-1">
                                    <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mb-6 transform group-hover:rotate-[360deg] transition-all duration-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4 font-inter bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                                        Dịch Thuật Tức Thời
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        <span className="highlight-text">Chuyển ngữ siêu tốc</span> PDF sang 100+ ngôn ngữ chỉ với 1 click, giữ nguyên mọi định dạng hình ảnh và bố cục
                                    </p>

                                    {/* Hidden PDF Details */}
                                    <div className="space-y-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="flex items-center text-sm text-pink-600 font-medium">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            <span>Hỗ trợ PDF scan chất lượng thấp</span>
                                        </div>
                                        <div className="flex items-center text-sm text-rose-600 font-medium">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
                                            </svg>
                                            <span>Bảo toàn layer hình ảnh/chữ</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-pink-50 p-4 text-center border-t border-pink-100">
                                    <span className="text-sm font-semibold text-pink-600">Độ chính xác 99.8%</span>
                                </div>
                            </div>

                            {/* Card 2 - Smart PDF Analyzer */}
                            <div className="bg-white/90 backdrop-blur-lg rounded-xl shadow-2xl hover:shadow-3xl border-2 border-transparent hover:border-rose-300 transition-all duration-300 cursor-pointer group relative overflow-hidden transform hover:-translate-y-2 h-[400px] flex flex-col">
                                <div className="p-8 flex-1">
                                    <div className="w-16 h-16 bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 transform group-hover:scale-125 transition-all duration-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4 font-inter bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                                        Phân Tích Thông Minh
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        <span className="highlight-text">AI thế hệ mới</span> hiểu sâu nội dung PDF, tự động tóm tắt, trích xuất dữ liệu và giải đáp mọi thắc mắc
                                    </p>

                                    {/* Interactive PDF Preview */}
                                    <div className="relative h-24 w-full bg-gray-100 rounded-lg overflow-hidden mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shine">
                                            <div className="pdf-mockup">
                                                <div className="pdf-line animate-pulse" />
                                                <div className="pdf-line animate-pulse delay-100" />
                                                <div className="pdf-line animate-pulse delay-200" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-rose-50 p-4 text-center border-t border-rose-100">
                                    <span className="text-sm font-semibold text-rose-600">Xử lý 500+ trang/phút</span>
                                </div>
                            </div>

                            {/* Card 3 - PDF Chat Assistant */}
                            <div className="bg-white/90 backdrop-blur-lg rounded-xl shadow-2xl hover:shadow-3xl border-2 border-transparent hover:border-pink-300 transition-all duration-300 cursor-pointer group relative overflow-hidden transform hover:-translate-y-2 h-[400px] flex flex-col">
                                <div className="p-8 flex-1">
                                    <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mb-6 transform group-hover:skew-y-12 transition-all duration-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4 font-inter bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                                        Trợ Lý PDF Ảo
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        <span className="highlight-text">Chat trực tiếp với tài liệu</span> - Đặt câu hỏi, yêu cầu chỉnh sửa hoặc tạo báo cáo tự động từ nội dung PDF
                                    </p>

                                    {/* Chat Bubble Effect */}
                                    <div className="space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="chat-bubble animate-float">
                                            <span className="text-sm">Bạn cần trích xuất dữ liệu nào?</span>
                                        </div>
                                        <div className="chat-bubble animate-float delay-150">
                                            <span className="text-sm">Tôi có thể tóm tắt tài liệu này!</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-pink-50 p-4 text-center border-t border-pink-100">
                                    <span className="text-sm font-semibold text-pink-600">Hỗ trợ 24/7</span>
                                </div>
                            </div>
                        </div>

                        {/* Animated Connector */}
                        <div className="hidden md:block absolute inset-x-0 mx-auto w-3/4 h-1 bg-gradient-to-r from-pink-200 to-rose-200 rounded-full opacity-50 -mt-8 animate-pulse-slow" />
                    </div>

                    <style jsx>{`
    .highlight-text {
      background-image: linear-gradient(120deg, #db2777 0%, #ec4899 100%);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      font-weight: 600;
    }
    .pdf-mockup .pdf-line {
      height: 4px;
      background: #f3f4f6;
      margin: 8px;
      border-radius: 2px;
    }
    .chat-bubble {
      background: #fce7f3;
      padding: 8px 12px;
      border-radius: 1rem;
      display: inline-block;
      position: relative;
      max-width: 80%;
    }
    .chat-bubble:before {
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid #fce7f3;
      border-top: 8px solid transparent;
      border-bottom: 8px solid transparent;
      left: -16px;
      top: 12px;
    }
    @keyframes shine {
      to {
        background-position: 200% center;
      }
    }
    .animate-shine {
      background-size: 200% auto;
      animation: shine 2s linear infinite;
    }
  `}</style>
                </section>
                {/* Wave Divider */}
                <svg className="w-full h-24 -mt-12" viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0 40C240 20 480 60 720 40C960 20 1200 60 1440 40V80H0V40Z"
                        fill="url(#waveGradient)"
                    />
                </svg>

                {/* Explore Possibilities Section */}
                <section className="py-32 px-6 sm:px-12 bg-gradient-to-tr from-white to-pink-100/50 backdrop-blur-lg relative z-10">
                    <div className="max-w-7xl mx-auto">
                        <h2
                            className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500 animate-fade-in-left tracking-tight text-shadow-glow max-w-4xl pl-4 font-inter"
                            style={{ animationDelay: '0.3s', animationFillMode: 'forwards', lineHeight: '1.3' }}
                        >
                            Khám Phá Vô Tận
                        </h2>
                        <p
                            className="text-2xl text-gray-700 max-w-5xl mt-6 mb-16 leading-relaxed animate-fade-in-up pl-4 font-inter italic"
                            style={{ animationDelay: '0.5s', animationFillMode: 'forwards', lineHeight: '1.6' }}
                        >
                            Sider là người bạn đồng hành, dẫn bạn qua những chân trời tri thức, từ học tập, kinh doanh đến nghiên cứu, mở ra những cơ hội lấp lánh như những vì sao.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div className="p-12 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-pink-200/50 hover:bg-white/90 hover:shadow-xl transition-all duration-300 animate-zoom-in" style={{ animationDelay: '0.7s' }}>
                                <BookOpen size={64} className="text-pink-500 mb-6 mx-auto animate-spin-slow hover:scale-110 transition-transform duration-300" stroke="url(#iconGradient)" />
                                <h3
                                    className="text-3xl font-bold text-gray-900 mb-4 animate-fade-in-up text-center font-inter"
                                    style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}
                                >
                                    Giáo Dục
                                </h3>
                                <p
                                    className="text-gray-700 leading-relaxed text-base animate-fade-in-up text-center font-inter"
                                    style={{ animationDelay: '1.1s', animationFillMode: 'forwards' }}
                                >
                                    Dịch tài liệu học thuật, trò chuyện với AI để thắp sáng con đường học vấn, biến tri thức thành những ngôi sao dẫn lối.
                                </p>
                            </div>
                            <div className="p-12 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-pink-200/50 hover:bg-white/90 hover:shadow-xl transition-all duration-300 animate-zoom-in" style={{ animationDelay: '0.8s' }}>
                                <Target size={64} className="text-rose-500 mb-6 mx-auto animate-spin-slow hover:scale-110 transition-transform duration-300" stroke="url(#iconGradient)" />
                                <h3
                                    className="text-3xl font-bold text-gray-900 mb-4 animate-fade-in-up text-center font-inter"
                                    style={{ animationDelay: '1s', animationFillMode: 'forwards' }}
                                >
                                    Kinh Doanh
                                </h3>
                                <p
                                    className="text-gray-700 leading-relaxed text-base animate-fade-in-up text-center font-inter"
                                    style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}
                                >
                                    Dịch hợp đồng, phân tích ý tưởng, và tối ưu hóa quy trình với AI thông minh, giúp bạn vươn xa trong thương trường rực rỡ.
                                </p>
                            </div>
                            <div className="p-12 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-pink-200/50 hover:bg-white/90 hover:shadow-xl transition-all duration-300 animate-zoom-in" style={{ animationDelay: '0.9s' }}>
                                <Lightbulb size={64} className="text-pink-400 mb-6 mx-auto animate-spin-slow hover:scale-110 transition-transform duration-300" stroke="url(#iconGradient)" />
                                <h3
                                    className="text-3xl font-bold text-gray-900 mb-4 animate-fade-in-up text-center font-inter"
                                    style={{ animationDelay: '1.1s', animationFillMode: 'forwards' }}
                                >
                                    Nghiên Cứu
                                </h3>
                                <p
                                    className="text-gray-700 leading-relaxed text-base animate-fade-in-up text-center font-inter"
                                    style={{ animationDelay: '1.3s', animationFillMode: 'forwards' }}
                                >
                                    Khai thác tài liệu đa ngôn ngữ, khám phá những chân trời tri thức mới với Sider, người bạn đồng hành trong hành trình sáng tạo.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Wave Divider */}
                <svg className="w-full h-24 -mt-12" viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0 40C240 60 480 20 720 40C960 60 1200 20 1440 40V80H0V40Z"
                        fill="url(#waveGradient)"
                    />
                </svg>

                {/* Features Section */}
                <section className="py-32 px-6 sm:px-12 bg-gradient-to-tr from-white to-pink-100/50 backdrop-blur-lg relative z-10">
                    <div className="max-w-7xl mx-auto">
                        <h2
                            className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500 animate-fade-in-left tracking-tight text-shadow-glow max-w-4xl pl-4 font-inter"
                            style={{ animationDelay: '0.3s', animationFillMode: 'forwards', lineHeight: '1.3' }}
                        >
                            Sider: Người Bạn Đồng Hành
                        </h2>
                        <p
                            className="text-2xl text-gray-700 max-w-4xl mt-6 mb-16 leading-relaxed animate-fade-in-up pl-4 font-inter italic"
                            style={{ animationDelay: '0.5s', animationFillMode: 'forwards', lineHeight: '1.6' }}
                        >
                            Sider là ngọn gió nâng bạn bay cao, là ánh sáng dẫn bạn qua những chân trời tri thức, và là người bạn đồng hành trong mọi giấc mơ.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="flex flex-col items-center text-center p-16 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-pink-200/50 hover:bg-white/90 hover:shadow-xl transition-all duration-300 animate-zoom-in" style={{ animationDelay: '0.7s' }}>
                                <div className="relative">
                                    <MessageCircle size={80} className="text-pink-500 mb-6 animate-spin-slow" stroke="url(#iconGradient)" />
                                    <Sparkles size={32} className="absolute -top-4 -right-4 text-pink-400 animate-pulse" />
                                </div>
                                <h3
                                    className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in-up font-inter"
                                    style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}
                                >
                                    Chatbot Kỳ Diệu
                                </h3>
                                <p
                                    className="text-gray-700 leading-relaxed text-base animate-fade-in-up font-inter"
                                    style={{ animationDelay: '1.1s', animationFillMode: 'forwards' }}
                                >
                                    Trò chuyện với Sider như một người bạn thân, thông minh và sáng tạo, luôn sẵn sàng thắp sáng ý tưởng của bạn bất kỳ lúc nào.
                                </p>
                            </div>
                            <div className="flex flex-col items-center text-center p-16 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-pink-200/50 hover:bg-white/90 hover:shadow-xl transition-all duration-300 animate-zoom-in" style={{ animationDelay: '0.8s' }}>
                                <div className="relative">
                                    <FileText size={80} className="text-rose-500 mb-6 animate-spin-slow" stroke="url(#iconGradient)" />
                                    <Sparkles size={32} className="absolute -top-4 -right-4 text-pink-400 animate-pulse" />
                                </div>
                                <h3
                                    className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in-up font-inter"
                                    style={{ animationDelay: '1s', animationFillMode: 'forwards' }}
                                >
                                    ChatPDF Toàn Cầu
                                </h3>
                                <p
                                    className="text-gray-700 leading-relaxed text-base animate-fade-in-up font-inter"
                                    style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}
                                >
                                    Biến PDF thành cầu nối tri thức với hơn 100 ngôn ngữ, giữ nguyên định dạng hoàn hảo, trong nháy mắt.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Wave Divider */}
                <svg className="w-full h-24 -mt-12" viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0 40C240 20 480 60 720 40C960 20 1200 60 1440 40V80H0V40Z"
                        fill="url(#waveGradient)"
                    />
                </svg>

                {/* How It Works Section */}
                <section className="py-32 px-6 sm:px-12 bg-gradient-to-tr from-pink-100 to-pink-200 relative z-10">
                    <div className="max-w-7xl mx-auto">
                        <h2
                            className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500 animate-fade-in-left tracking-tight text-shadow-glow max-w-4xl pl-4 font-inter"
                            style={{ animationDelay: '0.3s', animationFillMode: 'forwards', lineHeight: '1.3' }}
                        >
                            Sider Hoạt Động Ra Sao?
                        </h2>
                        <p
                            className="text-2xl text-gray-700 max-w-4xl mt-6 mb-16 leading-relaxed animate-fade-in-up pl-4 font-inter italic"
                            style={{ animationDelay: '0.5s', animationFillMode: 'forwards', lineHeight: '1.6' }}
                        >
                            Với vài bước đơn giản, Sider mở ra cánh cửa đến vũ trụ tri thức, giúp bạn giao tiếp, dịch thuật, và khám phá một cách kỳ diệu.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div className="flex flex-col items-center text-center p-12 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-pink-200/50 hover:bg-white/90 hover:shadow-xl transition-all duration-300 animate-zoom-in" style={{ animationDelay: '0.7s' }}>
                                <Zap size={64} className="text-pink-500 mb-6 animate-float hover:scale-110 transition-transform duration-300" stroke="url(#iconGradient)" />
                                <h3
                                    className="text-3xl font-bold text-gray-900 mb-4 animate-fade-in-up font-inter"
                                    style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}
                                >
                                    Trò Chuyện Tức Thời
                                </h3>
                                <p
                                    className="text-gray-700 leading-relaxed text-base animate-fade-in-up font-inter"
                                    style={{ animationDelay: '1.1s', animationFillMode: 'forwards' }}
                                >
                                    Đặt câu hỏi, nhận câu trả lời sáng tạo và chính xác ngay lập tức, như một tia sáng lóe lên trong đêm tối.
                                </p>
                            </div>
                            <div className="flex flex-col items-center text-center p-12 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-pink-200/50 hover:bg-white/90 hover:shadow-xl transition-all duration-300 animate-zoom-in" style={{ animationDelay: '0.8s' }}>
                                <BookOpen size={64} className="text-rose-500 mb-6 animate-float hover:scale-110 transition-transform duration-300" stroke="url(#iconGradient)" />
                                <h3
                                    className="text-3xl font-bold text-gray-900 mb-4 animate-fade-in-up font-inter"
                                    style={{ animationDelay: '1s', animationFillMode: 'forwards' }}
                                >
                                    Dịch PDF Nhanh Chóng
                                </h3>
                                <p
                                    className="text-gray-700 leading-relaxed text-base animate-fade-in-up font-inter"
                                    style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}
                                >
                                    Tải PDF, chọn ngôn ngữ, và nhận bản dịch hoàn hảo trong tích tắc, như một phép màu ngôn ngữ.
                                </p>
                            </div>
                            <div className="flex flex-col items-center text-center p-12 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-pink-200/50 hover:bg-white/90 hover:shadow-xl transition-all duration-300 animate-zoom-in" style={{ animationDelay: '0.9s' }}>
                                <Rocket size={64} className="text-pink-400 mb-6 animate-float hover:scale-110 transition-transform duration-300" stroke="url(#iconGradient)" />
                                <h3
                                    className="text-3xl font-bold text-gray-900 mb-4 animate-fade-in-up font-inter"
                                    style={{ animationDelay: '1.1s', animationFillMode: 'forwards' }}
                                >
                                    Khám Phá Vô Hạn
                                </h3>
                                <p
                                    className="text-gray-700 leading-relaxed text-base animate-fade-in-up font-inter"
                                    style={{ animationDelay: '1.3s', animationFillMode: 'forwards' }}
                                >
                                    Sider là cánh cửa dẫn bạn đến những chân trời mới, nơi học tập, làm việc và khám phá hòa quyện trong sắc màu kỳ diệu.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Wave Divider */}
                <svg className="w-full h-24 -mt-12" viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0 40C240 60 480 20 720 40C960 60 1200 20 1440 40V80H0V40Z"
                        fill="url(#waveGradient)"
                    />
                </svg>

                {/* Global Impact Section */}
                <section className="py-32 px-6 sm:px-12 bg-gradient-to-tr from-white to-pink-100/50 backdrop-blur-lg relative z-10">
                    <div className="max-w-7xl mx-auto">
                        <h2
                            className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500 animate-fade-in-left tracking-tight text-shadow-glow max-w-4xl pl-4 font-inter"
                            style={{ animationDelay: '0.3s', animationFillMode: 'forwards', lineHeight: '1.3' }}
                        >
                            Tầm Ảnh Hưởng Vũ Trụ
                        </h2>
                        <p
                            className="text-2xl text-gray-700 max-w-5xl mt-6 mb-16 leading-relaxed animate-fade-in-up pl-4 font-inter italic"
                            style={{ animationDelay: '0.5s', animationFillMode: 'forwards', lineHeight: '1.6' }}
                        >
                            Sider là dải ngân hà kết nối thế giới, mang tri thức đến mọi tâm hồn, thay đổi cách chúng ta học hỏi và sáng tạo.
                        </p>
                        <div className="flex flex-col items-center mb-16">
                            <svg
                                className="w-full max-w-4xl h-auto opacity-90 animate-zoom-in"
                                style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}
                                viewBox="0 0 1000 300"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M0 150C100 120, 200 90, 300 100C400 110, 500 140, 600 130C700 120, 800 90, 900 100C950 110, 1000 120, 1000 150C1000 180, 950 190, 900 200C800 220, 700 190, 600 170C500 150, 400 180, 300 200C200 220, 100 180, 0 150Z"
                                    fill="url(#worldMap)"
                                    filter="url(#mapGlow)"
                                />
                                <defs>
                                    <linearGradient id="worldMap" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" style={{ stopColor: '#F9A8D4', stopOpacity: 0.8 }} />
                                        <stop offset="100%" style={{ stopColor: '#FECACA', stopOpacity: 0.7 }} />
                                    </linearGradient>
                                    <filter id="mapGlow">
                                        <feGaussianBlur stdDeviation="2" />
                                        <feComponentTransfer>
                                            <feFuncA type="linear" slope="1.3" />
                                        </feComponentTransfer>
                                    </filter>
                                </defs>
                            </svg>
                            <p className="text-xl text-gray-700 mt-8 animate-fade-in-up font-inter" style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}>
                                Sider tỏa sáng tại <strong>190+ quốc gia</strong>, hỗ trợ <strong>100+ ngôn ngữ</strong>, và đồng hành cùng <strong>1.5M+ tâm hồn</strong>.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div className="p-12 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-pink-200/50 hover:bg-white/90 hover:shadow-xl transition-all duration-300 animate-zoom-in" style={{ animationDelay: '0.7s' }}>
                                <Globe size={64} className="text-pink-500 mb-6 mx-auto animate-spin-slow hover:scale-110 transition-transform duration-300" stroke="url(#iconGradient)" />
                                <h3
                                    className="text-3xl font-bold text-gray-900 mb-4 animate-fade-in-up font-inter"
                                    style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}
                                >
                                    Chạm Đến Toàn Cầu
                                </h3>
                                <p
                                    className="text-gray-700 leading-relaxed text-base animate-fade-in-up font-inter"
                                    style={{ animationDelay: '1.1s', animationFillMode: 'forwards' }}
                                >
                                    Sider phá tan mọi rào cản ngôn ngữ, mang tri thức đến từng góc nhỏ của vũ trụ, thắp sáng mọi tâm hồn.
                                </p>
                            </div>
                            <div className="p-12 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-pink-200/50 hover:bg-white/90 hover:shadow-xl transition-all duration-300 animate-zoom-in" style={{ animationDelay: '0.8s' }}>
                                <Users size={64} className="text-rose-500 mb-6 mx-auto animate-float hover:scale-110 transition-transform duration-300" stroke="url(#iconGradient)" />
                                <h3
                                    className="text-3xl font-bold text-gray-900 mb-4 animate-fade-in-up font-inter"
                                    style={{ animationDelay: '1s', animationFillMode: 'forwards' }}
                                >
                                    Cộng Đồng Rực Rỡ
                                </h3>
                                <p
                                    className="text-gray-700 leading-relaxed text-base animate-fade-in-up font-inter"
                                    style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}
                                >
                                    Hơn 1.5 triệu tâm hồn cùng hòa nhịp, chia sẻ tri thức và thắp sáng ước mơ trong cộng đồng Sider.
                                </p>
                            </div>
                            <div className="p-12 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-pink-200/50 hover:bg-white/90 hover:shadow-xl transition-all duration-300 animate-zoom-in" style={{ animationDelay: '0.9s' }}>
                                <Sparkles size={64} className="text-pink-400 mb-6 mx-auto animate-float hover:scale-110 transition-transform duration-300" stroke="url(#iconGradient)" />
                                <h3
                                    className="text-3xl font-bold text-gray-900 mb-4 animate-fade-in-up font-inter"
                                    style={{ animationDelay: '1.1s', animationFillMode: 'forwards' }}
                                >
                                    Đổi Mới Vô Tận
                                </h3>
                                <p
                                    className="text-gray-700 leading-relaxed text-base animate-fade-in-up font-inter"
                                    style={{ animationDelay: '1.3s', animationFillMode: 'forwards' }}
                                >
                                    Sider không ngừng tiến hóa với công nghệ AI tiên tiến, mang đến những trải nghiệm kỳ diệu mỗi ngày.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Wave Divider */}
                <svg className="w-full h-24 -mt-12" viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0 40C240 20 480 60 720 40C960 20 1200 60 1440 40V80H0V40Z"
                        fill="url(#waveGradient)"
                    />
                </svg>

                {/* Success Stories Section */}
                <section className="py-32 px-6 sm:px-12 bg-gradient-to-tr from-pink-100 to-pink-200 relative z-10">
                    <div className="max-w-7xl mx-auto">
                        <h2
                            className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500 animate-fade-in-left tracking-tight text-shadow-glow max-w-4xl pl-4 font-inter"
                            style={{ animationDelay: '0.3s', animationFillMode: 'forwards', lineHeight: '1.3' }}
                        >
                            Những Câu Chuyện Lấp Lánh
                        </h2>
                        <p
                            className="text-2xl text-gray-700 max-w-4xl mt-6 mb-16 leading-relaxed animate-fade-in-up pl-4 font-inter italic"
                            style={{ animationDelay: '0.5s', animationFillMode: 'forwards', lineHeight: '1.6' }}
                        >
                            Hàng triệu tâm hồn đã chạm đến giấc mơ của họ với Sider. Hãy lắng nghe những câu chuyện rực rỡ như những vì sao!
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="p-16 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-pink-200/50 hover:bg-white/90 hover:shadow-xl transition-all duration-300 animate-zoom-in" style={{ animationDelay: '0.7s' }}>
                                <div className="flex mb-6">
                                    <Star size={32} className="text-yellow-400 animate-pulse" />
                                    <Star size={32} className="text-yellow-400 animate-pulse" style={{ animationDelay: '0.2s' }} />
                                    <Star size={32} className="text-yellow-400 animate-pulse" style={{ animationDelay: '0.4s' }} />
                                    <Star size={32} className="text-yellow-400 animate-pulse" style={{ animationDelay: '0.6s' }} />
                                    <Star size={32} className="text-yellow-400 animate-pulse" style={{ animationDelay: '0.8s' }} />
                                </div>
                                <p className="text-gray-700 mb-6 leading-relaxed text-lg font-inter">
                                    "ChatPDF đã biến giáo trình 200 trang thành kiệt tác tiếng Pháp chỉ trong vài phút. Định dạng hoàn hảo, như một bức tranh tri thức!"
                                </p>
                                <div className="flex items-center">
                                    <svg className="w-12 h-12 mr-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="12" cy="12" r="12" fill="url(#avatarGradient)" />
                                        <path d="M12 14C14.2091 14 16 12.2091 16 10C16 7.79086 14.2091 6 12 6C9.79086 6 8 7.79086 8 10C8 12.2091 9.79086 14 12 14Z" fill="#1F2937" />
                                        <path d="M18 18C18 16.3431 15.3137 15 12 15C8.68629 15 6 16.3431 6 18V20H18V18Z" fill="#1F2937" />
                                        <defs>
                                            <linearGradient id="avatarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" style={{ stopColor: '#F9A8D4', stopOpacity: 0.8 }} />
                                                <stop offset="100%" style={{ stopColor: '#FECACA', stopOpacity: 0.8 }} />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                    <div>
                                        <p className="text-base font-bold text-gray-900 font-inter">Lan Nguyễn</p>
                                        <p className="text-sm text-gray-600 font-inter">Sinh viên</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-16 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-pink-200/50 hover:bg-white/90 hover:shadow-xl transition-all duration-300 animate-zoom-in" style={{ animationDelay: '0.8s' }}>
                                <div className="flex mb-6">
                                    <Star size={32} className="text-yellow-400 animate-pulse" />
                                    <Star size={32} className="text-yellow-400 animate-pulse" style={{ animationDelay: '0.2s' }} />
                                    <Star size={32} className="text-yellow-400 animate-pulse" style={{ animationDelay: '0.4s' }} />
                                    <Star size={32} className="text-yellow-400 animate-pulse" style={{ animationDelay: '0.6s' }} />
                                    <Star size={32} className="text-yellow-400 animate-pulse" style={{ animationDelay: '0.8s' }} />
                                </div>
                                <p className="text-gray-700 mb-6 leading-relaxed text-lg font-inter">
                                    "Chatbot Sider đã thắp lên những ý tưởng khởi nghiệp rực rỡ, giúp tôi vẽ nên kế hoạch kinh doanh chỉ trong vài giờ!"
                                </p>
                                <div className="flex items-center">
                                    <svg className="w-12 h-12 mr-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="12" cy="12" r="12" fill="url(#avatarGradient)" />
                                        <path d="M12 14C14.2091 14 16 12.2091 16 10C16 7.79086 14.2091 6 12 6C9.79086 6 8 7.79086 8 10C8 12.2091 9.79086 14 12 14Z" fill="#1F2937" />
                                        <path d="M18 18C18 16.3431 15.3137 15 12 15C8.68629 15 6 16.3431 6 18V20H18V18Z" fill="#1F2937" />
                                    </svg>
                                    <div>
                                        <p className="text-base font-bold text-gray-900 font-inter">Hùng Trần</p>
                                        <p className="text-sm text-gray-600 font-inter">Doanh nhân</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Wave Divider */}
                <svg className="w-full h-24 -mt-12" viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0 40C240 60 480 20 720 40C960 60 1200 20 1440 40V80H0V40Z"
                        fill="url(#waveGradient)"
                    />
                </svg>

                {/* ChatPDF Demo Section */}
                <section className="py-32 px-6 sm:px-12 bg-gradient-to-tr from-white to-pink-100/50 backdrop-blur-lg relative z-10">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
                        <div className="md:w-1/2">
                            <h2
                                className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500 animate-fade-in-left tracking-tight text-shadow-glow max-w-4xl font-inter"
                                style={{ animationDelay: '0.3s', animationFillMode: 'forwards', lineHeight: '1.3' }}
                            >
                                ChatPDF: Cầu Nối Ngôn Ngữ
                            </h2>
                            <p
                                className="text-2xl text-gray-700 mb-10 max-w-xl mt-6 leading-relaxed animate-fade-in-up font-inter italic"
                                style={{ animationDelay: '0.5s', animationFillMode: 'forwards', lineHeight: '1.6' }}
                            >
                                Tải PDF, chọn từ hơn 100 ngôn ngữ, và nhận bản dịch hoàn hảo giữ nguyên định dạng, như một phép màu ngôn ngữ chạm đến mọi tâm hồn.
                            </p>
                            <Link
                                to="/chatpdf"
                                className="px-16 py-8 bg-gradient-to-r from-pink-400 to-rose-400 text-white font-bold text-xl rounded-full shadow-xl transition-all duration-300 hover:brightness-125 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-pink-300/50 animate-pulse-shadow z-50 font-inter"
                                style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}
                                aria-label="Thử ChatPDF của Sider"
                            >
                                Khám Phá ChatPDF
                            </Link>
                        </div>
                        <div className="md:w-1/2 mt-10 md:mt-0">
                            <div className="relative bg-white/80 backdrop-blur-lg p-12 rounded-2xl shadow-xl border border-pink-200/50 transform hover:scale-105 transition duration-300">
                                <div className="flex items-center justify-between bg-pink-100/50 p-6 rounded-t-xl">
                                    <span className="text-lg font-bold text-gray-900 font-inter">document.pdf</span>
                                    <Globe size={40} className="text-pink-500 animate-spin-slow" stroke="url(#iconGradient)" />
                                </div>
                                <div className="h-[28rem] bg-gradient-to-b from-gray-50 to-pink-100/30 flex items-center justify-center rounded-b-xl relative overflow-hidden">
                                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                                        <p className="text-gray-800 text-xl font-medium animate-fade-in-up font-inter" style={{ animationDelay: '0.9s' }}>
                                            "Hello, World!"
                                        </p>
                                        <p className="text-gray-800 text-xl font-medium animate-fade-in-up font-inter" style={{ animationDelay: '1.1s' }}>
                                            "Xin chào, Thế giới!"
                                        </p>
                                        <p className="text-gray-800 text-xl font-medium animate-fade-in-up font-inter" style={{ animationDelay: '1.3s' }}>
                                            "¡Hola, Mundo!"
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Wave Divider */}
                <svg className="w-full h-24 -mt-12" viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0 40C240 20 480 60 720 40C960 20 1200 60 1440 40V80H0V40Z"
                        fill="url(#waveGradient)"
                    />
                </svg>

                {/* CTA Section */}
                <section className="py-32 px-6 sm:px-12 text-center bg-gradient-to-tr from-pink-100 to-pink-200 relative z-10">
                    <div className="max-w-7xl mx-auto">
                        <h2
                            className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500 animate-fade-in-left tracking-tight text-shadow-glow max-w-4xl mx-auto font-inter"
                            style={{ animationDelay: '0.3s', animationFillMode: 'forwards', lineHeight: '1.3' }}
                        >
                            Bay Cao Cùng Sider!
                        </h2>
                        <p
                            className="text-2xl text-gray-700 mb-10 max-w-5xl mx-auto mt-6 leading-relaxed animate-fade-in-up font-inter italic"
                            style={{ animationDelay: '0.5s', animationFillMode: 'forwards', lineHeight: '1.6' }}
                        >
                            Tham gia dải ngân hà Sider, nơi AI tiên tiến hòa quyện với tri thức vô tận, dẫn bạn đến những chân trời rực rỡ.
                        </p>
                        <div className="flex flex-col md:flex-row gap-8 justify-center">
                            <Link
                                to="/pricing"
                                className="px-16 py-8 bg-gradient-to-r from-pink-400 to-rose-400 text-white font-bold text-xl rounded-full shadow-xl transition-all duration-300 hover:brightness-125 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-pink-300/50 animate-pulse-shadow z-50 font-inter"
                                style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}
                                aria-label="Tham gia Sider ngay"
                            >
                                Chạm Đến Ngôi Sao
                            </Link>
                            <Link
                                to="/chatbot"
                                className="px-16 py-8 bg-transparent border-3 border-pink-400 text-pink-400 font-bold text-xl rounded-full shadow-xl transition-all duration-300 hover:bg-pink-400 hover:text-white hover:scale-105 focus:outline-none focus:ring-4 focus:ring-pink-300/50 animate-fade-in-up z-50 font-inter"
                                style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}
                                aria-label="Trải nghiệm miễn phí với Sider"
                            >
                                Khám Phá Miễn Phí
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default HomePage;