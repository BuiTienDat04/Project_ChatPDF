import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TestimonialsSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState('right');
    const [isAnimating, setIsAnimating] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const sectionRef = useRef(null);

    const testimonials = [
        {
            name: "Nguyễn Thị Minh Anh",
            feedback: "ChatPDF đã thay đổi cách tôi làm việc với PDF! Tóm tắt tài liệu nhanh chóng và chính xác, đặc biệt hỗ trợ PDF vượt trội. Thật tuyệt vời!",
        },
        {
            name: "Trần Văn Hùng",
            feedback: "Tôi yêu cách ChatPDF giúp tôi phân tích PDF một cách thông minh. Dịch thuật và tóm tắt đều hoàn hảo, chỉ dành cho tệp PDF thôi, rất tiện lợi!",
        },
        {
            name: "Lê Thị Hồng Nhung",
            feedback: "Một công cụ xuất sắc cho PDF! ChatPDF giúp tôi hiểu tài liệu phức tạp chỉ trong vài giây. Hỗ trợ tuyệt vời và dễ sử dụng!",
        },
        {
            name: "Phạm Quốc Bảo",
            feedback: "ChatPDF là trợ thủ đắc lực của tôi với các tệp PDF. Tóm tắt thông minh và hỏi đáp nhanh chóng, không gì sánh bằng cho công việc hàng ngày!",
        },
        {
            name: "Hoàng Thị Lan Anh",
            feedback: "Tôi không thể tin được tốc độ xử lý PDF của ChatPDF. Tính năng dịch và phân tích thật sự nâng tầm trải nghiệm của tôi với tài liệu!",
        },
        {
            name: "Đỗ Minh Tuấn",
            feedback: "ChatPDF làm tôi ngạc nhiên với khả năng hỗ trợ PDF. Tóm tắt chi tiết và câu trả lời chính xác, một công cụ không thể thiếu!",
        },
        {
            name: "Vũ Thị Thanh Thủy",
            feedback: "Với ChatPDF, tôi tiết kiệm hàng giờ với các tệp PDF. Hỗ trợ đa ngôn ngữ và tóm tắt thông minh là điểm nhấn tuyệt vời!",
        },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.1 }
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

    const handleNext = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setDirection('right');
        setCurrentIndex((prev) => (prev + 3) % testimonials.length);
    };

    const handlePrev = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setDirection('left');
        setCurrentIndex((prev) =>
            prev - 3 < 0 ? testimonials.length - (3 - (prev % 3)) : prev - 3
        );
    };

    const getVisibleTestimonials = () => {
        const visible = [];
        for (let i = 0; i < 3; i++) {
            const index = (currentIndex + i) % testimonials.length;
            visible.push(testimonials[index]);
        }
        return visible;
    };

    const variants = {
        enter: (direction) => ({
            x: direction === 'right' ? 300 : -300,
            opacity: 0,
            scale: 0.8,
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1],
            },
        },
        exit: (direction) => ({
            x: direction === 'right' ? -300 : 300,
            opacity: 0,
            scale: 0.8,
            transition: {
                duration: 0.4,
                ease: [0.4, 0, 0.2, 1],
            },
        }),
    };

    return (
        <section
            ref={sectionRef}
            className="py-20 px-6 bg-gradient-to-b from-purple-50 via-white to-purple-50 relative overflow-hidden"
        >
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    className="text-5xl font-bold text-purple-900 text-center mb-16 tracking-wide drop-shadow-lg"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    Người dùng nói gì về ChatPDF
                </motion.h2>

                <div className="relative min-h-[400px] flex items-center justify-center">
                    <motion.button
                        onClick={handlePrev}
                        className={`absolute left-[-20px] z-20 p-3 bg-gradient-to-r from-purple-500 to-purple-700 rounded-[50%_20%_50%_20%] shadow-lg hover:from-purple-600 hover:to-purple-800 transition-all duration-300 transform rotate-45 ${
                            isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <ChevronLeft className="text-white transform -rotate-45" size={24} />
                    </motion.button>

                    <div className="relative w-full flex items-center justify-center overflow-hidden">
                        <AnimatePresence custom={direction} initial={false}>
                            <motion.div
                                key={currentIndex}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="flex justify-center gap-10 w-full"
                                onAnimationComplete={() => setIsAnimating(false)}
                            >
                                {getVisibleTestimonials().map((testimonial, index) => (
                                    <motion.div
                                        key={testimonial.name + index}
                                        className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-purple-100/50 w-[380px] hover:shadow-purple-200/50 transition-all duration-500 flex flex-col justify-between relative overflow-hidden"
                                        initial={{ scale: 0.9, opacity: 0, y: 50 }}
                                        animate={{ scale: 1, opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.15, duration: 0.5, ease: 'easeOut' }}
                                        whileHover={{ scale: 1.05, y: -10 }}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-t from-purple-50/30 to-transparent" />
                                        <div>
                                            <motion.div
                                                className="flex items-center justify-center mb-6"
                                                initial={{ rotate: -20, opacity: 0 }}
                                                animate={{ rotate: 0, opacity: 1 }}
                                                transition={{ delay: index * 0.2 + 0.2, duration: 0.4 }}
                                            >
                                                <Quote className="text-purple-500" size={40} />
                                            </motion.div>
                                            <p className="text-gray-700 leading-relaxed text-center mb-6 font-light italic text-lg">
                                                {testimonial.feedback}
                                            </p>
                                        </div>
                                        <motion.p
                                            className="font-semibold text-purple-900 text-center tracking-wide mt-4"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: index * 0.2 + 0.3, duration: 0.4 }}
                                        >
                                            - {testimonial.name}
                                        </motion.p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <motion.button
                        onClick={handleNext}
                        className={`absolute right-[-20px] z-20 p-3 bg-gradient-to-r from-purple-500 to-purple-700 rounded-[50%_20%_50%_20%] shadow-lg hover:from-purple-600 hover:to-purple-800 transition-all duration-300 transform rotate-45 ${
                            isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <ChevronRight className="text-white transform -rotate-45" size={24} />
                    </motion.button>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
