import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Card = ({ icon, title, description }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      whileHover={{ scale: 1.05, rotate: 1, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center p-6 rounded-xl bg-gradient-to-br from-gray-50 to-transparent shadow-lg hover:shadow-xl transition-all duration-300 group hover:bg-opacity-80 backdrop-blur-sm"
    >
      <motion.div
        className="mb-6 text-5xl transition-transform duration-300 group-hover:scale-125 group-hover:text-blue-600"
        animate={inView ? { rotate: 360 } : {}}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
      >
        {icon}
      </motion.div>
      <h3 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800 group-hover:text-blue-700 transition-colors">{title}</h3>
      <p className="text-gray-600 text-center leading-relaxed text-sm md:text-base">
        {description}
      </p>
    </motion.div>
  );
};

const App = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="p-8 rounded-2xl max-w-7xl mx-auto"
      >
        <motion.h1 
          className="text-3xl md:text-5xl font-extrabold text-center mb-8 text-gray-900"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.7, type: "spring" }}
        >
          Hiểu PDF một cách thông minh và nhân hóa cùng ChatPDF
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-700 text-center mb-10 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Đặt câu hỏi, nhận thông tin ngay lập tức, tận hưởng trải nghiệm AI thông minh. Trò chuyện trực tiếp với tài liệu PDF và khám phá tri thức theo cách hoàn toàn mới.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card
            icon="📑"
            title="Tóm tắt thông minh"
            description="Công nghệ AI tiên tiến phân tích và tóm tắt tài liệu PDF chỉ trong vài giây. Tạo bản tóm tắt đa dạng từ tổng quan đến chi tiết, tự động highlight thông tin quan trọng."
          />
          <Card
            icon="❓"
            title="Hỏi & Đáp nhanh"
            description="Tương tác thông minh với tài liệu thông qua hệ thống hỏi đáp AI. Đặt bất kỳ câu hỏi nào về nội dung PDF và nhận câu trả lời chính xác kèm trích dẫn nguồn."
          />
          <Card
            icon="🌐"
            title="Dịch PDF tức thì"
            description="Hỗ trợ dịch thuật đa ngôn ngữ thông minh, giữ nguyên bố cục và định dạng gốc. Dịch toàn bộ tài liệu hoặc từng đoạn văn bản với độ chính xác cao."
          />
          <Card
            icon="🌍"
            title="Đa ngôn ngữ"
            description="Hỗ trợ làm việc với 50+ ngôn ngữ khác nhau, kết hợp công nghệ NLP cho kết quả chính xác. Tương thích với mọi loại văn bản từ kỹ thuật đến văn học."
          />
          <Card
            icon="🧠"
            title="AI Thích ứng"
            description="Hệ thống AI học tập và thích ứng với phong cách làm việc của bạn. Tự động gợi ý các chủ đề liên quan và đề xuất giải pháp thông minh."
          />
          <Card
            icon="🔐"
            title="Bảo mật tuyệt đối"
            description="Mã hóa dữ liệu đầu cuối, tự động xóa file sau phiên làm việc. Đạt chứng chỉ bảo mật quốc tế ISO 27001."
          />
        </div>
      </motion.div>
    </div>
  );
};

export default App;