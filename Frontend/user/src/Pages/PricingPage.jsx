import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import {
    CheckIcon,
    SparklesIcon,
    StarIcon,
    GiftIcon,
    LifebuoyIcon,
    BoltIcon,
    ChevronDownIcon,
} from '@heroicons/react/24/outline';

const pricingPlans = [
    {
        name: 'Miễn Phí',
        tagline: 'Bắt đầu trải nghiệm sức mạnh AI',
        price: 'US$ 0',
        period: '/tháng',
        isFeatured: false,
        features: [
            'Giới hạn Tins Dựng Cơ Bản',
            'Giới hạn Tin Dựng Nâng Cao',
            'Một số Mô Hình AI cơ bản',
            'Xem trước tính năng phân tích dữ liệu',
            'Tổng hợp nội dung cơ bản (Youtube, Website)',
            'Trình Tạo Hình Ảnh AI (số lượng giới hạn)',
            'Hỗ trợ cộng đồng',
        ],
        buttonText: 'Bắt Đầu Miễn Phí',
        note: 'Không yêu cầu thẻ tín dụng',

    },

    {
        name: 'Nâng Cao',
        tagline: 'Phát triển mạnh mẽ và hiệu quả',
        price: 'US$ 9.9',
        period: '/tháng',
        annualPrice: 'US$ 118.8/năm', // Thêm giá hàng năm nếu có
        isFeatured: false,

        features: [
            'Không giới hạn Tin Dựng Cơ Bản',
            'Giới hạn Tin Dựng Nâng Cao (số lượng lớn hơn)',
            'Các Mô Hình AI phổ biến (bao gồm một số bản nâng cao)',
            'Phân tích dữ liệu tiêu chuẩn',
            'Tổng hợp Youtube & Website',
            'Trình Tạo Hình Ảnh AI (số lượng lớn)',
            'Deep Research tiêu chuẩn',
            'Hỗ trợ qua email',
            'Quyền truy cập sớm các tính năng mới (chọn lọc)',
        ],
        buttonText: 'Nâng Cấp Ngay',
        note: 'Dùng thử 7 ngày miễn phí',

    },

    {
        name: 'Không Giới Hạn',
        tagline: 'Đỉnh cao công nghệ AI, không giới hạn tiềm năng', // Tagline mới
        price: 'US$ 16.7', // Giá chiết khấu hàng tháng
        period: '/tháng',
        annualPrice: 'US$ 200/năm', // Giá ban đầu gạch bỏ
        discount: 'GIẢM GIÁ 44%', // Thêm nhãn giảm giá
        isFeatured: true, // Đánh dấu là gói nổi bật

        features: [
            ' Không giới hạn Tin Dựng Cơ Bản',
            ' Không giới hạn Tin Dựng Nâng Cao',
            'Các Mô Hình AI: GPT-4.1, Claude 3.7, Gemini 2.5 Pro',
            ' Phân tích dữ liệu nâng cao',
            ' Tổng hợp Youtube & Website',
            ' Trình Tạo Hình Ảnh AI (Không giới hạn)', // Mô tả rõ hơn
            ' Deep Research Pro',
            ' Hỗ trợ 24/7 & ưu tiên', // Nâng cấp mô tả hỗ trợ
            ' Quyền truy cập sớm tất cả các tính năng mới', // Thêm tính năng mới
        ],
        buttonText: 'Đăng Ký Gói Cao Cấp', // Nút kêu gọi hành động rõ ràng hơn
        note: 'Đăng nhập để đăng ký gói dịch vụ',
    },
];

const faqData = [
    {
        question: "Tôi có thể lấy hóa đơn được không?",
        answer: "Bạn có thể tải hóa đơn điện tử ngay trong mục Quản lý tài khoản. Hóa đơn sẽ tự động gửi về email đăng ký sau mỗi lần thanh toán thành công."
    },
    {
        question: "Tôi có thể được hoàn lại tiền không?",
        answer: "Chúng tôi áp dụng chính sách hoàn tiền trong 14 ngày nếu bạn chưa sử dụng quá 50% hạn mức dịch vụ. Liên hệ hỗ trợ qua email để được hướng dẫn chi tiết."
    },
    {
        question: "Đăng ký Sider có dùng được trên Mac không?",
        answer: "Đăng ký của bạn có thể sử dụng trên mọi nền tảng (Web, Chrome Extension, macOS) với cùng một tài khoản. Được phép đăng nhập đồng thời trên 3 thiết bị."
    },
    {
        question: "Khi nào hạn ngạch được đặt lại hàng tháng?",
        answer: "Hệ thống sẽ reset hạn mức vào 00:00 UTC ngày đầu tiên của mỗi tháng. Ví dụ: Đăng ký ngày 15/1 sẽ reset vào 1/2."
    },
    {
        question: "Nâng cấp từ gói tháng lên năm tính phí thế nào?",
        answer: "Chúng tôi sẽ tính toán chênh lệch dựa trên thời gian còn lại và áp dụng chiết khấu. Bạn chỉ trả phần chênh lệch sau khi trừ giá trị còn dư."
    },
    {
        question: "Có mất phí khi nâng cấp lên GPT-5 không?",
        answer: "Tất cả bản cập nhật trong gói đăng ký sẽ được cung cấp miễn phí. Chúng tôi luôn cập nhật công nghệ mới nhất không phát sinh chi phí."
    },
    {
        question: "Tính năng Gói Không Giới Hạn có thay đổi?",
        answer: "Chúng tôi có thể điều chỉnh để cải thiện trải nghiệm nhưng cam kết giữ nguyên giá trị cốt lõi. Thông báo trước 30 ngày cho mọi thay đổi lớn."
    }
];

const PricingPage = () => {
    const [expandedIndex, setExpandedIndex] = useState(null);

    const FAQItem = ({ faq, index }) => {
        const isExpanded = expandedIndex === index;

        return (
            <div className="group">
                <div
                    className="flex items-start cursor-pointer"
                    onClick={() => setExpandedIndex(isExpanded ? null : index)}
                >
                    <span className="bg-purple-100 text-purple-600 rounded-full p-2 mr-4">
                        <BoltIcon className={`h-5 w-5 transition-transform ${isExpanded ? 'rotate-45' : ''}`} />
                    </span>
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-purple-900 mb-2 group-hover:text-pink-600 transition-colors">
                            {faq.question}
                        </h3>
                        {isExpanded && (
                            <p className="text-purple-700 leading-relaxed opacity-90 animate-fadeIn">
                                {faq.answer}
                            </p>
                        )}
                    </div>
                    <ChevronDownIcon
                        className={`h-6 w-6 ml-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    />
                </div>
                {index < faqData.length - 1 && <div className="border-b border-purple-100 mt-6" />}
            </div>
        );
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 font-sans mt-20">
            <Navigation />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Header Section */}
                <div className="text-center mb-16 relative">
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                        <SparklesIcon className="h-16 w-16 text-purple-400 animate-pulse" />
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                        Giải Pháp AI Toàn Diện
                    </h1>
                    <p className="text-xl text-purple-800 max-w-3xl mx-auto leading-relaxed">
                        Khám phá các gói dịch vụ được thiết kế đặc biệt với sức mạnh AI vượt trội
                        <StarIcon className="h-5 w-5 text-yellow-400 inline-block ml-2" />
                    </p>
                </div>

                {/* Pricing Cards Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-16 items-stretch">
                    {pricingPlans.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative bg-white rounded-2xl shadow-lg p-8 flex flex-col transition-all duration-300 hover:shadow-xl
                ${plan.isFeatured
                                    ? 'border-0 bg-gradient-to-b from-purple-600 to-pink-600 text-white scale-105'
                                    : 'border-2 border-purple-100'
                                }`}
                        >
                            {plan.discount && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                                    <div className="bg-red-500 text-white text-sm font-bold px-4 py-1 rounded-full shadow-lg">
                                        {plan.discount}
                                    </div>
                                </div>
                            )}

                            {/* Plan Header */}
                            <div className={`mb-6 ${plan.isFeatured ? 'text-white' : 'text-purple-900'}`}>
                                {plan.discount && (
                                    <span className="block text-sm font-semibold mb-2 text-yellow-300">
                                        {plan.discount}
                                    </span>
                                )}
                                <h2 className="text-3xl font-bold mb-2">{plan.name}</h2>
                                <p className="text-lg opacity-90">{plan.tagline}</p>
                            </div>

                            {/* Pricing */}
                            <div className="mb-8">
                                <div className="flex items-baseline mb-2">
                                    <span className="text-4xl font-bold mr-2">{plan.price}</span>
                                    <span className="text-lg opacity-80">{plan.period}</span>
                                </div>
                                {plan.annualPrice && (
                                    <p className="text-sm opacity-75 line-through">{plan.annualPrice}</p>
                                )}
                            </div>

                            {/* Features List */}
                            <ul className="space-y-4 flex-grow mb-8">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-start">
                                        <CheckIcon className="h-6 w-6 text-green-400 mr-2 flex-shrink-0" />
                                        <span className="opacity-90">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA Button */}
                            <button className={`w-full py-4 px-8 rounded-xl font-bold transition-all
                ${plan.isFeatured
                                    ? 'bg-white text-purple-600 hover:bg-opacity-90 shadow-lg'
                                    : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
                                }`}
                            >
                                {plan.buttonText}
                            </button>

                            {plan.note && (
                                <p className={`text-center text-sm mt-4 ${plan.isFeatured ? 'text-purple-200' : 'text-purple-600'}`}>
                                    {plan.note}
                                </p>
                            )}
                        </div>
                    ))}
                </div>

                {/* FAQ Section */}
                <div className="mt-16 mb-16 bg-white rounded-2xl p-12 shadow-xl">
                    <h2 className="text-3xl font-bold text-purple-900 text-center mb-12 flex items-center justify-center">
                        <LifebuoyIcon className="h-8 w-8 text-pink-500 mr-3" />
                        Câu Hỏi Thường Gặp
                    </h2>
                    <div className="space-y-10 max-w-3xl mx-auto">
                        {faqData.map((faq, index) => (
                            <FAQItem key={index} faq={faq} index={index} />
                        ))}
                    </div>
                </div>

                {/* Enterprise Section */}
                <div className="text-center mt-24 mb-16 relative">
                    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                        <SparklesIcon className="h-24 w-24 text-purple-200 opacity-50" />
                    </div>
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
                        Giải Pháp Doanh Nghiệp
                    </h2>
                    <p className="text-xl text-purple-800 mb-8 max-w-2xl mx-auto">
                        Tích hợp AI mạnh mẽ vào hệ thống của bạn với giải pháp tùy chỉnh
                    </p>
                    <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 px-12 rounded-2xl font-bold hover:shadow-xl transition-all flex items-center mx-auto">
                        <StarIcon className="h-6 w-6 mr-2 text-yellow-300" />
                        Liên Hệ Tư Vấn
                    </button>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PricingPage;