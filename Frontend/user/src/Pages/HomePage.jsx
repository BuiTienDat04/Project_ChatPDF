import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { MessageCircle, FileText, Globe, Star, Zap, BookOpen, Rocket, Sparkles, Users, Lightbulb, Target } from 'lucide-react';

const HomePage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-white font-inter overflow-x-hidden relative">
            {/* Subtle Starry Background with Purple-Pink Stars */}
            <div className="fixed inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Cdefs%3E%3Cpattern id=%22stars%22 width=%2250%22 height=%2250%22 patternUnits=%22userSpaceOnUse%22%3E%3Ccircle cx=%2210%22 cy=%2210%22 r=%221.5%22 fill=%22%23C084FC%22 filter=%22url(%23glow)%22/%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22 fill=%22%23FBCFE8%22 filter=%22url(%23glow)%22/%3E%3Ccircle cx=%2240%22 cy=%2215%22 r=%221%22 fill=%22%23EC4899%22 filter=%22url(%23glow)%22/%3E%3C/pattern%3E%3Cfilter id=%22glow%22%3E%3CfeGaussianBlur stdDeviation=%222%22/%3E%3CfeComponentTransfer%3E%3CfeFuncA type=%22linear%22 slope=%221.3%22/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3C/defs%3E%3Crect width=%22100%25%22 height=%22100%25%22 fill=%22url(%23stars)%22/%3E%3C/svg%3E')] opacity-20 pointer-events-none animate-twinkle"></div>
            <Navigation />
            <main className="w-full relative z-10">
                {/* Hero Section */}
                <section className="relative flex flex-col items-start px-6 overflow-hidden bg-gradient-to-tr from-purple-100 via-pink-100 to-white">
                    {/* Cosmic Blob with Purple-Pink Gradient */}
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
                                    <stop offset="0%" style={{ stopColor: '#C084FC', stopOpacity: 0.9 }} />
                                    <stop offset="100%" style={{ stopColor: '#FBCFE8', stopOpacity: 0.8 }} />
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
                                className="absolute bg-gradient-to-r from-purple-200 to-pink-200 rounded-full opacity-50 animate-particle-sparkle"
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
                                    <stop offset="0%" style={{ stopColor: '#C084FC', stopOpacity: 0.9 }} />
                                    <stop offset="100%" style={{ stopColor: '#FBCFE8', stopOpacity: 0.8 }} />
                                </linearGradient>
                                <linearGradient id="orbStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style={{ stopColor: '#A78BFA', stopOpacity: 1 }} />
                                    <stop offset="100%" style={{ stopColor: '#FBCFE8', stopOpacity: 1 }} />
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
                  0% { box-shadow: 0 0 10px rgba(192, 132, 252, 0.5); }
                  50% { box-shadow: 0 0 20px rgba(192, 132, 252, 0.8); }
                  100% { box-shadow: 0 0 10px rgba(192, 132, 252, 0.5); }
                }
                .animate-pulse-shadow { animation: pulse-shadow 2s infinite ease-in-out; }
              `}
                        </style>
                        <span className="inline-block px-8 py-4 mb-6 text-lg font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg font-inter mt-10">
                            AI Đổi Mới Ngôn Ngữ
                        </span>

                        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 mb-10 tracking-tight max-w-4xl font-inter">
                            Sider AI - Kết Nối Tri Thức Toàn Cầu
                        </h1>

                        <p className="text-2xl md:text-3xl text-gray-700 max-w-5xl mb-12 leading-relaxed font-inter">
                            <span className="block mb-4">Tăng tốc giao tiếp và khám phá tài liệu với</span>
                            <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg">AI đa ngôn ngữ thông minh</span>
                        </p>

                        <div className="flex flex-col sm:flex-row gap-8 mb-16">
                            <Link
                                to="/chatbot"
                                className="px-16 py-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-xl rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 hover:brightness-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-300/50 font-inter"
                            >
                                Trò Chuyện Với AI
                            </Link>
                            <Link
                                to="/chatpdf"
                                className="px-16 py-8 bg-white border-2 border-purple-400 text-purple-400 font-bold text-xl rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 hover:bg-purple-50 hover:border-purple-500 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-300/50 font-inter"
                            >
                                Dịch PDF Đa Ngôn Ngữ
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 max-w-5xl">
                            <div className="flex flex-col items-center">
                                <span className="text-5xl font-bold text-purple-500 font-inter">98%+</span>
                                <p className="text-xl text-gray-700 text-center font-inter">Độ chính xác dịch thuật</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-5xl font-bold text-pink-500 font-inter">100+</span>
                                <p className="text-xl text-gray-700 text-center font-inter">Ngôn ngữ hỗ trợ</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-5xl font-bold text-purple-400 font-inter">2s</span>
                                <p className="text-xl text-gray-700 text-center font-inter">Tốc độ xử lý tức thời</p>
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
                            <stop offset="0%" style={{ stopColor: '#C084FC', stopOpacity: 0.8 }} />
                            <stop offset="100%" style={{ stopColor: '#FBCFE8', stopOpacity: 0.8 }} />
                        </linearGradient>
                    </defs>
                </svg>

                {/* Why Sider Excels Section */}
                <section className="py-32 px-6 sm:px-12 relative z-10">
                    <div className="max-w-7xl mx-auto">
                        <h2
                            className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500 tracking-tight max-w-4xl pl-4 font-inter animate-fade-in-left"
                            style={{ animationDelay: '0.3s', animationFillMode: 'forwards', lineHeight: '1.3' }}
                        >
                            Sider: Đột Phá Công Nghệ AI
                        </h2>
                        <p
                            className="text-2xl text-gray-700 max-w-5xl mt-6 mb-16 leading-relaxed animate-fade-in-up pl-4 font-inter italic"
                            style={{ animationDelay: '0.5s', animationFillMode: 'forwards', lineHeight: '1.6' }}
                        >
                            Sider AI mang đến trải nghiệm giao tiếp và dịch thuật vượt trội, kết nối tri thức toàn cầu với công nghệ tiên tiến.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div className="p-12 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-purple-200/50 hover:bg-white/90 hover:shadow-xl transition-all duration-300 animate-zoom-in" style={{ animationDelay: '0.7s' }}>
                                <Target size={64} className="text-purple-500 mb-6 mx-auto animate-float hover:scale-110 transition-transform duration-300" stroke="url(#iconGradient)" />
                                <h3 className="text-3xl font-bold text-gray-900 mb-4 animate-fade-in-up font-inter" style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}>
                                    Chính Xác Tuyệt Đối
                                </h3>
                                <p className="text-gray-700 leading-relaxed text-base animate-fade-in-up font-inter" style={{ animationDelay: '1.1s', animationFillMode: 'forwards' }}>
                                    AI của Sider đảm bảo dịch thuật và trả lời chính xác, giúp bạn tự tin trong mọi tình huống giao tiếp đa ngôn ngữ.
                                </p>
                            </div>
                            <div className="p-12 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-purple-200/50 hover:bg-white/90 hover:shadow-xl transition-all duration-300 animate-zoom-in" style={{ animationDelay: '0.8s' }}>
                                <Zap size={64} className="text-pink-500 mb-6 mx-auto animate-float hover:scale-110 transition-transform duration-300" stroke="url(#iconGradient)" />
                                <h3 className="text-3xl font-bold text-gray-900 mb-4 animate-fade-in-up font-inter" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
                                    Tốc Độ Vượt Trội
                                </h3>
                                <p className="text-gray-700 leading-relaxed text-base animate-fade-in-up font-inter" style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}>
                                    Trò chuyện và dịch PDF với tốc độ nhanh chóng, giúp bạn tiết kiệm thời gian và tập trung vào điều quan trọng.
                                </p>
                            </div>
                            <div className="p-12 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-purple-200/50 hover:bg-white/90 hover:shadow-xl transition-all duration-300 animate-zoom-in" style={{ animationDelay: '0.9s' }}>
                                <Globe size={64} className="text-purple-400 mb-6 mx-auto animate-float hover:scale-110 transition-transform duration-300" stroke="url(#iconGradient)" />
                                <h3 className="text-3xl font-bold text-gray-900 mb-4 animate-fade-in-up font-inter" style={{ animationDelay: '1.1s', animationFillMode: 'forwards' }}>
                                    Kết Nối Toàn Cầu
                                </h3>
                                <p className="text-gray-700 leading-relaxed text-base animate-fade-in-up font-inter" style={{ animationDelay: '1.3s', animationFillMode: 'forwards' }}>
                                    Sider hỗ trợ hơn 100 ngôn ngữ, tích hợp mượt mà vào quy trình công việc, mang thế giới đến gần bạn hơn.
                                </p>
                            </div>
                        </div>
                    </div>
                    <svg className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                        <defs>
                            <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style={{ stopColor: '#C084FC', stopOpacity: 1 }} />
                                <stop offset="100%" style={{ stopColor: '#FBCFE8', stopOpacity: 1 }} />
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

                {/* Core Features Section */}
                <section className="py-32 px-6 sm:px-12 relative z-10">
                    <div className="max-w-7xl mx-auto">
                        <div className="mb-20 space-y-4 pl-4">
                            <h2 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 tracking-tight font-inter animate-slide-in-left">
                                Chinh Phục PDF Với AI
                            </h2>
                            <p className="text-2xl text-gray-700 max-w-3xl leading-relaxed font-inter animate-slide-in-left delay-100">
                                Biến tài liệu PDF thành công cụ tri thức mạnh mẽ với khả năng dịch thuật và phân tích thông minh của Sider.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Card 1 - Instant PDF Translation */}
                            <div className="bg-white/90 backdrop-blur-lg rounded-xl shadow-2xl hover:shadow-3xl border-2 border-transparent hover:border-purple-300 transition-all duration-300 cursor-pointer group relative overflow-hidden transform hover:-translate-y-2 h-[400px] flex flex-col">
                                <div className="p-8 flex-1">
                                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 transform group-hover:rotate-[360deg] transition-all duration-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4 font-inter bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                        Dịch Thuật Tức Thời
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        <span className="highlight-text">Dịch PDF nhanh chóng</span> sang hơn 100 ngôn ngữ, giữ nguyên định dạng và cấu trúc tài liệu.
                                    </p>
                                    <div className="space-y-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="flex items-center text-sm text-purple-600 font-medium">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            <span>Hỗ trợ PDF scan và tài liệu phức tạp</span>
                                        </div>
                                        <div className="flex items-center text-sm text-pink-600 font-medium">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
                                            </svg>
                                            <span>Bảo toàn bố cục và hình ảnh</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-purple-50 p-4 text-center border-t border-purple-100">
                                    <span className="text-sm font-semibold text-purple-600">Độ chính xác 98.5%</span>
                                </div>
                            </div>

                            {/* Card 2 - Smart PDF Analysis */}
                            <div className="bg-white/90 backdrop-blur-lg rounded-xl shadow-2xl hover:shadow-3xl border-2 border-transparent hover:border-pink-300 transition-all duration-300 cursor-pointer group relative overflow-hidden transform hover:-translate-y-2 h-[400px] flex flex-col">
                                <div className="p-8 flex-1">
                                    <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl flex items-center justify-center mb-6 transform group-hover:scale-125 transition-all duration-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4 font-inter bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                                        Phân Tích Thông Minh
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        <span className="highlight-text">AI tiên tiến</span> phân tích nội dung PDF, tóm tắt và trích xuất thông tin quan trọng trong tích tắc.
                                    </p>
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
                                <div className="bg-pink-50 p-4 text-center border-t border-pink-100">
                                    <span className="text-sm font-semibold text-pink-600">Xử lý 1000+ trang/phút</span>
                                </div>
                            </div>

                            {/* Card 3 - Interactive PDF Chat */}
                            <div className="bg-white/90 backdrop-blur-lg rounded-xl shadow-2xl hover:shadow-3xl border-2 border-transparent hover:border-purple-300 transition-all duration-300 cursor-pointer group relative overflow-hidden transform hover:-translate-y-2 h-[400px] flex flex-col">
                                <div className="p-8 flex-1">
                                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 transform group-hover:skew-y-12 transition-all duration-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4 font-inter bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                        Trò Chuyện Với PDF
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        <span className="highlight-text">Tương tác trực tiếp</span> với tài liệu PDF, đặt câu hỏi và nhận câu trả lời tức thời từ nội dung.
                                    </p>
                                    <div className="space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="chat-bubble animate-float">
                                            <span className="text-sm">Tóm tắt nội dung này cho tôi!</span>
                                        </div>
                                        <div className="chat-bubble animate-float delay-150">
                                            <span className="text-sm">Trích xuất dữ liệu chính!</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-purple-50 p-4 text-center border-t border-purple-100">
                                    <span className="text-sm font-semibold text-purple-600">Hỗ trợ 24/7</span>
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:block absolute inset-x-0 mx-auto w-3/4 h-1 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full opacity-50 -mt-8 animate-pulse-slow" />
                    </div>
                    <style jsx>{`
    .highlight-text {
      background-image: linear-gradient(120deg, #A78BFA 0%, #EC4899 100%);
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
      background: #EDE9FE;
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
      border-right: 8px solid #EDE9FE;
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

                {/* Applications Section */}
                <section className="py-32 px-6 sm:px-12 bg-gradient-to-tr from-white to-purple-100/50 backdrop-blur-lg relative z-10">
                    <div className="max-w-7xl mx-auto">
                        <h2
                            className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 animate-fade-in-left tracking-tight text-shadow-glow max-w-4xl pl-4 font-inter"
                            style={{ animationDelay: '0.3s', animationFillMode: 'forwards', lineHeight: '1.3' }}
                        >
                            Ứng Dụng Đa Dạng
                        </h2>
                        <p
                            className="text-2xl text-gray-700 max-w-5xl mt-6 mb-16 leading-relaxed animate-fade-in-up pl-4 font-inter italic"
                            style={{ animationDelay: '0.5s', animationFillMode: 'forwards', lineHeight: '1.6' }}
                        >
                            Sider AI hỗ trợ bạn trong mọi lĩnh vực, từ học tập đến kinh doanh, mở ra cánh cửa tri thức không giới hạn.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div className="p-12 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-purple-200/50 hover:bg-white/90 hover:shadow-xl transition-all duration-300 animate-zoom-in" style={{ animationDelay: '0.7s' }}>
                                <BookOpen size={64} className="text-purple-500 mb-6 mx-auto animate-spin-slow hover:scale-110 transition-transform duration-300" stroke="url(#iconGradient)" />
                                <h3
                                    className="text-3xl font-bold text-gray-900 mb-4 animate-fade-in-up text-center font-inter"
                                    style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}
                                >
                                    Học Tập
                                </h3>
                                <p
                                    className="text-gray-700 leading-relaxed text-base animate-fade-in-up text-center font-inter"
                                    style={{ animationDelay: '1.1s', animationFillMode: 'forwards' }}
                                >
                                    Dịch tài liệu học thuật, tương tác với nội dung PDF để nâng cao hiệu quả học tập và nghiên cứu.
                                </p>
                            </div>
                            <div className="p-12 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-purple-200/50 hover:bg-white/90 hover:shadow-xl transition-all duration-300 animate-zoom-in" style={{ animationDelay: '0.8s' }}>
                                <Target size={64} className="text-pink-500 mb-6 mx-auto animate-spin-slow hover:scale-110 transition-transform duration-300" stroke="url(#iconGradient)" />
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
                                    Phân tích hợp đồng, dịch tài liệu kinh doanh và tối ưu hóa quy trình với AI thông minh.
                                </p>
                            </div>
                            <div className="p-12 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-purple-200/50 hover:bg-white/90 hover:shadow-xl transition-all duration-300 animate-zoom-in" style={{ animationDelay: '0.9s' }}>
                                <Lightbulb size={64} className="text-purple-400 mb-6 mx-auto animate-spin-slow hover:scale-110 transition-transform duration-300" stroke="url(#iconGradient)" />
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
                                    Trích xuất và dịch tài liệu nghiên cứu, khám phá tri thức đa ngôn ngữ với tốc độ vượt trội.
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
                <section className="py-32 px-6 sm:px-12 bg-gradient-to-tr from-white to-purple-100/50 backdrop-blur-lg relative z-10">
                    <div className="max-w-7xl mx-auto">
                        <h2
                            className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 animate-fade-in-left tracking-tight text-shadow-glow max-w-4xl pl-4 font-inter"
                            style={{ animationDelay: '0.3s', animationFillMode: 'forwards', lineHeight: '1.3' }}
                        >
                            Sider: Trí Tuệ Đồng Hành
                        </h2>
                        <p
                            className="text-2xl text-gray-700 max-w-4xl mt-6 mb-16 leading-relaxed animate-fade-in-up pl-4 font-inter italic"
                            style={{ animationDelay: '0.5s', animationFillMode: 'forwards', lineHeight: '1.6' }}
                        >
                            Sider AI là người bạn đồng hành thông minh, giúp bạn dịch thuật và giao tiếp hiệu quả trong mọi tình huống.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="flex flex-col items-center text-center p-16 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-purple-200/50 hover:bg-white/90 hover:shadow-xl transition-all duration-300 animate-zoom-in" style={{ animationDelay: '0.7s' }}>
                                <div className="relative">
                                    <MessageCircle size={80} className="text-purple-500 mb-6 animate-spin-slow" stroke="url(#iconGradient)" />
                                    <Sparkles size={32} className="absolute -top-4 -right-4 text-purple-400 animate-pulse" />
                                </div>
                                <h3
                                    className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in-up font-inter"
                                    style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}
                                >
                                    Chatbot Thông Minh
                                </h3>
                                <p
                                    className="text-gray-700 leading-relaxed text-base animate-fade-in-up font-inter"
                                    style={{ animationDelay: '1.1s', animationFillMode: 'forwards' }}
                                >
                                    Tương tác với Sider AI để nhận câu trả lời nhanh chóng, chính xác và sáng tạo, hỗ trợ bạn mọi lúc mọi nơi.
                                </p>
                            </div>
                            <div className="flex flex-col items-center text-center p-16 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-purple-200/50 hover:bg-white/90 hover:shadow-xl transition-all duration-300 animate-zoom-in" style={{ animationDelay: '0.8s' }}>
                                <div className="relative">
                                    <FileText size={80} className="text-pink-500 mb-6 animate-spin-slow" stroke="url(#iconGradient)" />
                                    <Sparkles size={32} className="absolute -top-4 -right-4 text-purple-400 animate-pulse" />
                                </div>
                                <h3
                                    className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in-up font-inter"
                                    style={{ animationDelay: '1s', animationFillMode: 'forwards' }}
                                >
                                    ChatPDF Đột Phá
                                </h3>
                                <p
                                    className="text-gray-700 leading-relaxed text-base animate-fade-in-up font-inter"
                                    style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}
                                >
                                    Dịch và tương tác với PDF ở hơn 100 ngôn ngữ, giữ nguyên định dạng và tối ưu hóa trải nghiệm tài liệu.
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
                <section className="py-32 px-6 sm:px-12 bg-gradient-to-tr from-purple-100 to-pink-100 relative z-10">
                    <div className="max-w-7xl mx-auto">
                        <h2
                            className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 animate-fade-in-left tracking-tight text-shadow-glow max-w-4xl pl-4 font-inter"
                            style={{ animationDelay: '0.3s', animationFillMode: 'forwards', lineHeight: '1.3' }}
                        >
                            Sider Hoạt Động Như Thế Nào?
                        </h2>
                        <p
                            className="text-2xl text-gray-700 max-w-4xl mt-6 mb-16 leading-relaxed animate-fade-in-up pl-4 font-inter italic"
                            style={{ animationDelay: '0.5s', animationFillMode: 'forwards', lineHeight: '1.6' }}
                        >
                            Chỉ với vài bước đơn giản, Sider AI giúp bạn giao tiếp và xử lý tài liệu một cách nhanh chóng và hiệu quả.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div className="flex flex-col items-center text-center p-12 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-purple-200/50 hover:bg-white/90 hover:shadow-xl transition-all duration-300 animate-zoom-in" style={{ animationDelay: '0.7s' }}>
                                <Zap size={64} className="text-purple-500 mb-6 animate-float hover:scale-110 transition-transform duration-300" stroke="url(#iconGradient)" />
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
                                    Đặt câu hỏi và nhận câu trả lời chính xác, sáng tạo từ Sider AI ngay lập tức.
                                </p>
                            </div>
                            <div className="flex flex-col items-center text-center p-12 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-purple-200/50 hover:bg-white/90 hover:shadow-xl transition-all duration-300 animate-zoom-in" style={{ animationDelay: '0.8s' }}>
                                <BookOpen size={64} className="text-pink-500 mb-6 animate-float hover:scale-110 transition-transform duration-300" stroke="url(#iconGradient)" />
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
                                    Tải lên PDF, chọn ngôn ngữ và nhận bản dịch hoàn hảo trong vài giây.
                                </p>
                            </div>
                            <div className="flex flex-col items-center text-center p-12 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-purple-200/50 hover:bg-white/90 hover:shadow-xl transition-all duration-300 animate-zoom-in" style={{ animationDelay: '0.9s' }}>
                                <Rocket size={64} className="text-purple-400 mb-6 animate-float hover:scale-110 transition-transform duration-300" stroke="url(#iconGradient)" />
                                <h3
                                    className="text-3xl font-bold text-gray-900 mb-4 animate-fade-in-up font-inter"
                                    style={{ animationDelay: '1.1s', animationFillMode: 'forwards' }}
                                >
                                    Khám Phá Không Giới Hạn
                                </h3>
                                <p
                                    className="text-gray-700 leading-relaxed text-base animate-fade-in-up font-inter"
                                    style={{ animationDelay: '1.3s', animationFillMode: 'forwards' }}
                                >
                                    Sider AI mở ra cánh cửa tri thức, hỗ trợ bạn trong học tập, công việc và nghiên cứu.
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
                <section className="py-32 px-6 sm:px-12 bg-gradient-to-tr from-white to-purple-100/50 backdrop-blur-lg relative z-10">
                    <div className="max-w-7xl mx-auto">
                        <h2
                            className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 animate-fade-in-left tracking-tight text-shadow-glow max-w-4xl pl-4 font-inter"
                            style={{ animationDelay: '0.3s', animationFillMode: 'forwards', lineHeight: '1.3' }}
                        >
                            Tầm Ảnh Hưởng Toàn Cầu
                        </h2>
                        <p
                            className="text-2xl text-gray-700 max-w-5xl mt-6 mb-16 leading-relaxed animate-fade-in-up pl-4 font-inter italic"
                            style={{ animationDelay: '0.5s', animationFillMode: 'forwards', lineHeight: '1.6' }}
                        >
                            Sider AI kết nối tri thức trên toàn thế giới, phá bỏ rào cản ngôn ngữ và hỗ trợ hàng triệu người dùng.
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
                                        <stop offset="0%" style={{ stopColor: '#C084FC', stopOpacity: 0.8 }} />
                                        <stop offset="100%" style={{ stopColor: '#FBCFE8', stopOpacity: 0.7 }} />
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
                                Sider phục vụ <strong>180+ quốc gia</strong>, hỗ trợ <strong>100+ ngôn ngữ</strong>, và đồng hành cùng <strong>2M+ người dùng</strong>.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div className="p-12 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-purple-200/50 hover:bg-white/90 hover:shadow-xl transition-all duration-300 animate-zoom-in" style={{ animationDelay: '0.7s' }}>
                                <Globe size={64} className="text-purple-500 mb-6 mx-auto animate-spin-slow hover:scale-110 transition-transform duration-300" stroke="url(#iconGradient)" />
                                <h3
                                    className="text-3xl font-bold text-gray-900 mb-4 animate-fade-in-up font-inter"
                                    style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}
                                >
                                    Kết Nối Toàn Cầu
                                </h3>
                                <p
                                    className="text-gray-700 leading-relaxed text-base animate-fade-in-up font-inter"
                                    style={{ animationDelay: '1.1s', animationFillMode: 'forwards' }}
                                >
                                    Sider AI phá vỡ rào cản ngôn ngữ, mang tri thức đến mọi quốc gia và cộng đồng.
                                </p>
                            </div>
                            <div className="p-12 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-purple-200/50 hover:bg-white/90 hover:shadow-xl transition-all duration-300 animate-zoom-in" style={{ animationDelay: '0.8s' }}>
                                <Users size={64} className="text-pink-500 mb-6 mx-auto animate-float hover:scale-110 transition-transform duration-300" stroke="url(#iconGradient)" />
                                <h3
                                    className="text-3xl font-bold text-gray-900 mb-4 animate-fade-in-up font-inter"
                                    style={{ animationDelay: '1s', animationFillMode: 'forwards' }}
                                >
                                    Cộng Đồng Sáng Tạo
                                </h3>
                                <p
                                    className="text-gray-700 leading-relaxed text-base animate-fade-in-up font-inter"
                                    style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}
                                >
                                    Hơn 2 triệu người dùng trên toàn cầu sử dụng Sider để chia sẻ và khám phá tri thức.
                                </p>
                            </div>
                            <div className="p-12 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-purple-200/50 hover:bg-white/90 hover:shadow-xl transition-all duration-300 animate-zoom-in" style={{ animationDelay: '0.9s' }}>
                                <Sparkles size={64} className="text-purple-400 mb-6 mx-auto animate-float hover:scale-110 transition-transform duration-300" stroke="url(#iconGradient)" />
                                <h3
                                    className="text-3xl font-bold text-gray-900 mb-4 animate-fade-in-up font-inter"
                                    style={{ animationDelay: '1.1s', animationFillMode: 'forwards' }}
                                >
                                    Công Nghệ Tiên Tiến
                                </h3>
                                <p
                                    className="text-gray-700 leading-relaxed text-base animate-fade-in-up font-inter"
                                    style={{ animationDelay: '1.3s', animationFillMode: 'forwards' }}
                                >
                                    Sider liên tục cải tiến với AI tiên tiến, mang đến trải nghiệm dịch thuật và giao tiếp vượt trội.
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
                <section className="py-32 px-6 sm:px-12 bg-gradient-to-tr from-purple-100 to-pink-100 relative z-10">
                    <div className="max-w-7xl mx-auto">
                        <h2
                            className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 animate-fade-in-left tracking-tight text-shadow-glow max-w-4xl pl-4 font-inter"
                            style={{ animationDelay: '0.3s', animationFillMode: 'forwards', lineHeight: '1.3' }}
                        >
                            Câu Chuyện Thành Công
                        </h2>
                        <p
                            className="text-2xl text-gray-700 max-w-4xl mt-6 mb-16 leading-relaxed animate-fade-in-up pl-4 font-inter italic"
                            style={{ animationDelay: '0.5s', animationFillMode: 'forwards', lineHeight: '1.6' }}
                        >
                            Hàng triệu người dùng đã đạt được mục tiêu của họ với Sider AI. Hãy khám phá những câu chuyện truyền cảm hứng!
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="p-16 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-purple-200/50 hover:bg-white/90 hover:shadow-xl transition-all duration-300 animate-zoom-in" style={{ animationDelay: '0.7s' }}>
                                <div className="flex mb-6">
                                    <Star size={32} className="text-yellow-400 animate-pulse" />
                                    <Star size={32} className="text-yellow-400 animate-pulse" style={{ animationDelay: '0.2s' }} />
                                    <Star size={32} className="text-yellow-400 animate-pulse" style={{ animationDelay: '0.4s' }} />
                                    <Star size={32} className="text-yellow-400 animate-pulse" style={{ animationDelay: '0.6s' }} />
                                    <Star size={32} className="text-yellow-400 animate-pulse" style={{ animationDelay: '0.8s' }} />
                                </div>
                                <p className="text-gray-700 mb-6 leading-relaxed text-lg font-inter">
                                    "Sider AI đã giúp tôi dịch tài liệu học thuật sang tiếng Nhật một cách chính xác và nhanh chóng, giữ nguyên định dạng gốc."
                                </p>
                                <div className="flex items-center">
                                    <svg className="w-12 h-12 mr-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="12" cy="12" r="12" fill="url(#avatarGradient)" />
                                        <path d="M12 14C14.2091 14 16 12.2091 16 10C16 7.79086 14.2091 6 12 6C9.79086 6 8 7.79086 8 10C8 12.2091 9.79086 14 12 14Z" fill="#1F2937" />
                                        <path d="M18 18C18 16.3431 15.3137 15 12 15C8.68629 15 6 16.3431 6 18V20H18V18Z" fill="#1F2937" />
                                        <defs>
                                            <linearGradient id="avatarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" style={{ stopColor: '#C084FC', stopOpacity: 0.8 }} />
                                                <stop offset="100%" style={{ stopColor: '#FBCFE8', stopOpacity: 0.8 }} />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                    <div>
                                        <p className="text-base font-bold text-gray-900 font-inter">Mai Trần</p>
                                        <p className="text-sm text-gray-600 font-inter">Sinh viên</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-16 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-purple-200/50 hover:bg-white/90 hover:shadow-xl transition-all duration-300 animate-zoom-in" style={{ animationDelay: '0.8s' }}>
                                <div className="flex mb-6">
                                    <Star size={32} className="text-yellow-400 animate-pulse" />
                                    <Star size={32} className="text-yellow-400 animate-pulse" style={{ animationDelay: '0.2s' }} />
                                    <Star size={32} className="text-yellow-400 animate-pulse" style={{ animationDelay: '0.4s' }} />
                                    <Star size={32} className="text-yellow-400 animate-pulse" style={{ animationDelay: '0.6s' }} />
                                    <Star size={32} className="text-yellow-400 animate-pulse" style={{ animationDelay: '0.8s' }} />
                                </div>
                                <p className="text-gray-700 mb-6 leading-relaxed text-lg font-inter">
                                    "Chatbot của Sider đã giúp tôi phân tích hợp đồng kinh doanh và đề xuất ý tưởng trong vài phút. Thật tuyệt vời!"
                                </p>
                                <div className="flex items-center">
                                    <svg className="w-12 h-12 mr-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="12" cy="12" r="12" fill="url(#avatarGradient)" />
                                        <path d="M12 14C14.2091 14 16 12.2091 16 10C16 7.79086 14.2091 6 12 6C9.79086 6 8 7.79086 8 10C8 12.2091 9.79086 14 12 14Z" fill="#1F2937" />
                                        <path d="M18 18C18 16.3431 15.3137 15 12 15C8.68629 15 6 16.3431 6 18V20H18V18Z" fill="#1F2937" />
                                    </svg>
                                    <div>
                                        <p className="text-base font-bold text-gray-900 font-inter">Việt Nguyễn</p>
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
                        d="M0 40C240 20 480 60 720 40C960 20 1200 60 1440 40V80H0V40Z"
                        fill="url(#waveGradient)"
                    />
                </svg>

                {/* ChatPDF Demo Section */}
                <section className="py-32 px-6 sm:px-12 bg-gradient-to-tr from-white to-purple-100/50 backdrop-blur-lg relative z-10">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
                        <div className="md:w-1/2">
                            <h2
                                className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 animate-fade-in-left tracking-tight text-shadow-glow max-w-4xl font-inter"
                                style={{ animationDelay: '0.3s', animationFillMode: 'forwards', lineHeight: '1.3' }}
                            >
                                ChatPDF: Biến PDF Thành Tri Thức
                            </h2>
                            <p
                                className="text-2xl text-gray-700 mb-10 max-w-xl mt-6 leading-relaxed animate-fade-in-up font-inter italic"
                                style={{ animationDelay: '0.5s', animationFillMode: 'forwards', lineHeight: '1.6' }}
                            >
                                Tải PDF, chọn ngôn ngữ và nhận bản dịch chính xác, giữ nguyên định dạng gốc trong vài giây.
                            </p>
                            <Link
                                to="/chatpdf"
                                className="px-16 py-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-xl rounded-full shadow-xl transition-all duration-300 hover:brightness-125 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300/50 animate-pulse-shadow z-50 font-inter"
                                style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}
                                aria-label="Thử ChatPDF của Sider"
                            >
                                Khám Phá ChatPDF
                            </Link>
                        </div>
                        <div className="md:w-1/2 mt-10 md:mt-0">
                            <div className="relative bg-white/80 backdrop-blur-lg p-12 rounded-2xl shadow-xl border border-purple-200/50 transform hover:scale-105 transition duration-300">
                                <div className="flex items-center justify-between bg-purple-100/50 p-6 rounded-t-xl">
                                    <span className="text-lg font-bold text-gray-900 font-inter">document.pdf</span>
                                    <Globe size={40} className="text-purple-500 animate-spin-slow" stroke="url(#iconGradient)" />
                                </div>
                                <div className="h-[28rem] bg-gradient-to-b from-gray-50 to-purple-100/30 flex items-center justify-center rounded-b-xl relative overflow-hidden">
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
                <section className="py-32 px-6 sm:px-12 text-center bg-gradient-to-tr from-purple-100 to-pink-100 relative z-10">
                    <div className="max-w-7xl mx-auto">
                        <h2
                            className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 animate-fade-in-left tracking-tight text-shadow-glow max-w-4xl mx-auto font-inter"
                            style={{ animationDelay: '0.3s', animationFillMode: 'forwards', lineHeight: '1.3' }}
                        >
                            Bắt Đầu Với Sider AI
                        </h2>
                        <p
                            className="text-2xl text-gray-700 mb-10 max-w-5xl mx-auto mt-6 leading-relaxed animate-fade-in-up font-inter italic"
                            style={{ animationDelay: '0.5s', animationFillMode: 'forwards', lineHeight: '1.6' }}
                        >
                            Tham gia hàng triệu người dùng và trải nghiệm sức mạnh của AI đa ngôn ngữ với Sider ngay hôm nay.
                        </p>
                        <div className="flex flex-col md:flex-row gap-8 justify-center">
                            <Link
                                to="/pricing"
                                className="px-16 py-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-xl rounded-full shadow-xl transition-all duration-300 hover:brightness-125 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300/50 animate-pulse-shadow z-50 font-inter"
                                style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}
                                aria-label="Tham gia Sider ngay"
                            >
                                Đăng Ký Ngay
                            </Link>
                            <Link
                                to="/chatbot"
                                className="px-16 py-8 bg-transparent border-3 border-purple-400 text-purple-400 font-bold text-xl rounded-full shadow-xl transition-all duration-300 hover:bg-purple-400 hover:text-white hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300/50 animate-fade-in-up z-50 font-inter"
                                style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}
                                aria-label="Trải nghiệm miễn phí với Sider"
                            >
                                Thử Miễn Phí
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