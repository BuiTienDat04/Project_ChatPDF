import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQItem = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="mb-4 last:mb-0">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
        <button
          onClick={onToggle}
          className="flex items-center justify-between w-full p-4 hover:bg-gray-50 transition-colors"
        >
          <h3 className="text-lg font-semibold text-gray-800 tracking-tight flex-1 text-justify px-1">
            {question}
          </h3>
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="text-xl font-light text-gray-600 ml-2 flex-shrink-0"
          >
            {isOpen ? '×' : '+'}
          </motion.span>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: 1,
                height: 'auto',
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              exit={{
                opacity: 0,
                height: 0,
                transition: { duration: 0.2, ease: "easeIn" }
              }}
              className="overflow-hidden"
            >
              <div className="p-4 pt-0 border-t border-gray-100">
                <div className="text-gray-600 leading-relaxed whitespace-pre-wrap px-1">
                  {answer.split('\n').map((line, index) => (
                    <div key={index} className="mb-2">
                      {line.trim().startsWith('•') ? (
                        <div className="flex">
                          <span className="mr-2">•</span>
                          <span>{line.trim().slice(1).trim()}</span>
                        </div>
                      ) : (
                        <span>{line.trim()}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const QuestionChatPdf = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'ChatPDF dùng để làm gì?',
      answer: 'ChatPDF là một công cụ được hỗ trợ bởi AI giúp nâng cao trải nghiệm đọc PDF bằng cách giúp người dùng tóm tắt tài liệu, đặt câu hỏi và hiểu nội dung tốt hơn. Nó đặc biệt hữu ích cho sinh viên, nhà nghiên cứu và các chuyên gia cần phân tích tài liệu một cách hiệu quả.'
    },
    {
      question: 'Tại sao ChatPDF của Sider vượt trội hơn các công cụ khác?',
      answer: 'ChatPDF của Sider nổi bật nhờ công nghệ AI tiên tiến (ChatGPT, Claude và Gemini), dịch tài liệu với so sánh bên cạnh, xử lý tài liệu nhanh chóng, hỗ trợ câu hỏi liên quan đến tài liệu một cách toàn diện và phương pháp tập trung vào quyền riêng tư.'
    },
    {
      question: 'ChatPDF hỗ trợ định dạng tài liệu nào?',
      answer: 'Hỗ trợ mọi loại PDF (văn bản, hình ảnh, bảng biểu), bao gồm file scan, file mã hóa (cần mật khẩu) và file có chữ ký điện tử.'
    },
    {
      question: 'Có giới hạn nào về kích thước tài liệu tôi có thể tải lên không?',
      answer: '• Người dùng miễn phí: Mỗi tệp bị giới hạn ở 10MB, không giới hạn số lượng tệp\n• Người dùng cao cấp: Mỗi tệp bị giới hạn ở 100MB, không giới hạn số lượng tệp.'
    },
    {
      question: 'Tại sao nên sử dụng ChatPDF thay vì ChatGPT để phân tích PDF?',
      answer: 'ChatPDF được thiết kế đặc biệt cho phân tích tài liệu với các tính năng chuyên biệt như hiển thị giao diện bên cạnh và trích dẫn có thể nhấp để cuộn ngay đến vị trí nguồn, giúp việc hiểu tài liệu nhanh chóng và đáng tin cậy hơn so với các công cụ AI tổng quát.'
    },
    {
      question: 'Sider ChatPDF có an toàn không?',
      answer: '• Mã hóa cấp doanh nghiệp\n• Hệ thống lưu trữ đám mây được bảo vệ\n• Không có truy cập hoặc chia sẻ trái phép\n• Tệp không được sử dụng cho việc đào tạo mô hình AI\n• Người dùng giữ quyền kiểm soát hoàn toàn với khả năng xóa tệp bất cứ lúc nào'
    },
    {
      question: 'Lợi ích cho người đăng ký là gì?',
      answer: 'Người đăng ký nhận được:\n• Giới hạn tải tệp lớn hơn (tối đa 2000 trang và 100MB mỗi PDF)\n• Nhiều cuộc trò chuyện hàng tháng hơn (3600 hoặc không giới hạn tùy theo gói)\n• Truy cập vào các tính năng nâng cao\n• Hỗ trợ ưu tiên'
    }
  ];

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-50 py-20 px-1 sm:px-2 lg:px-4">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 px-1"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Câu hỏi thường gặp
        </motion.h2>

        <div className="space-y-4 px-1">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionChatPdf;