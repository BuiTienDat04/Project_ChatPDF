import React from 'react';
import { FileText, FilePen, BarChart, Upload, ChevronUp } from 'lucide-react';
import UpfilePDF from './UpfilePDF';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import TestimonialsSection from '../components/TestimonialsSection'; // Import the new component

export default function ChatPDFPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white text-black font-sans">
      <Navigation/>

      {/* Title & Description */}
      <section className="text-center py-12 mt-20">
        <h1 className="text-4xl font-bold">
          ChatPDF: Trò chuyện với <span className="bg-pink-300 px-2 rounded">nhiều PDF</span> trực tuyến
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Biến bất kỳ tài liệu nào thành một cuộc trò chuyện AI tương tác. Phân tích, tóm tắt và tương tác với bất kỳ PDF, bài thuyết trình và tài liệu nào chỉ trong vài giây.
        </p>
      </section>

      {/* Upload Box */}
      <UpfilePDF />

      {/* Features Section */}
      <section className="py-16 px-6 bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-semibold text-purple-900 text-center mb-12 tracking-wide">
            Hiểu PDF một cách thông minh và nhanh chóng với ChatPDF
          </h2>
          <p className="text-lg text-gray-700 text-center mb-12 max-w-3xl mx-auto leading-relaxed">
            Đặt câu hỏi, nhận tóm tắt ngay lập tức, phân tích và dịch tài liệu thông qua cuộc trò chuyện AI. Trợ lý thông minh của bạn để hiểu PDF nhanh hơn và dễ dàng hơn.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Tóm tắt thông minh */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-purple-100 hover:scale-105 hover:shadow-2xl hover:bg-purple-50/70 transition-all duration-300 ease-in-out">
              <div className="flex items-center mb-4">
                <BarChart className="text-purple-600 mr-3" size={24} />
                <h3 className="text-xl font-semibold text-purple-900">Tóm tắt thông minh</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Nhận tóm tắt ngay lập tức, toàn diện cho bất kỳ tài liệu PDF nào. AI của chúng tôi phân tích nội dung và trích xuất các điểm chính, giúp bạn tiết kiệm hàng giờ đọc.
              </p>
            </div>

            {/* Hỏi & Đáp nhanh */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-purple-100 hover:scale-105 hover:shadow-2xl hover:bg-purple-50/70 transition-all duration-300 ease-in-out">
              <div className="flex items-center mb-4">
                <FileText className="text-purple-600 mr-3" size={24} />
                <h3 className="text-xl font-semibold text-purple-900">Hỏi & Đáp nhanh</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Đặt bất kỳ câu hỏi nào về tài liệu PDF của bạn và nhận câu trả lời chính xác, phù hợp với ngữ cảnh cùng với trích dẫn và tham khảo cụ thể.
              </p>
            </div>

            {/* Dịch PDF ngay lập tức */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-purple-100 hover:scale-105 hover:shadow-2xl hover:bg-purple-50/70 transition-all duration-300 ease-in-out">
              <div className="flex items-center mb-4">
                <FilePen className="text-purple-600 mr-3" size={24} />
                <h3 className="text-xl font-semibold text-purple-900">Dịch PDF ngay lập tức</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Dịch toàn bộ tài liệu PDF một cách liền mạch trong khi vẫn giữ nguyên định dạng và cấu trúc hoàn hảo. Bạn cũng có thể dịch bất kỳ câu nào đã chọn từ PDF của bạn ngay lập tức.
              </p>
            </div>

            {/* Hỗ trợ đa ngôn ngữ */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-purple-100 hover:scale-105 hover:shadow-2xl hover:bg-purple-50/70 transition-all duration-300 ease-in-out">
              <div className="flex items-center mb-4">
                <Upload className="text-purple-600 mr-3" size={24} />
                <h3 className="text-xl font-semibold text-purple-900">Hỗ trợ đa ngôn ngữ</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Xóa bỏ rào cản ngôn ngữ với hỗ trợ cho hơn 50 ngôn ngữ. Trò chuyện với tài liệu của bạn bằng bất kỳ ngôn ngữ nào và đặt câu hỏi bằng ngôn ngữ bạn ưa thích.
              </p>
            </div>

            {/* Hỗ trợ đa định dạng & AI */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-purple-100 hover:scale-105 hover:shadow-2xl hover:bg-purple-50/70 transition-all duration-300 ease-in-out">
              <div className="flex items-center mb-4">
                <FileText className="text-purple-600 mr-3" size={24} />
                <h3 className="text-xl font-semibold text-purple-900">Hỗ trợ đa định dạng & AI</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Xử lý các tệp PDF, Word (.doc, .docx) và PowerPoint (.ppt, .pptx) bằng các mô hình AI hàng đầu bao gồm GPT-4.1 mini, Claude 3.5 và Gemini 2.5 để đạt hiệu suất tối ưu.
              </p>
            </div>

            {/* Bảo vệ quyền riêng tư */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-purple-100 hover:scale-105 hover:shadow-2xl hover:bg-purple-50/70 transition-all duration-300 ease-in-out">
              <div className="flex items-center mb-4">
                <Upload className="text-purple-600 mr-3" size={24} />
                <h3 className="text-xl font-semibold text-purple-900">Bảo vệ quyền riêng tư</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Bảo mật cấp doanh nghiệp giữ cho tài liệu của bạn riêng tư với mã hóa tiên tiến. Tất cả các xử lý được thực hiện an toàn trên máy chủ của chúng tôi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Scroll Up Button */}
      <div className="fixed bottom-4 right-4">
        <button className="bg-purple-100 p-2 rounded-full shadow">
          <ChevronUp className="text-purple-700" />
        </button>
      </div>

      <Footer/>
    </div>
  );
}