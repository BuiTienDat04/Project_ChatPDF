import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const StepCard = ({ number, title, description }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative flex flex-col items-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 group overflow-hidden border border-purple-100"
    >
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-purple-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="text-4xl mb-6 text-purple-600 font-extrabold bg-purple-50 p-6 rounded-full aspect-square flex items-center justify-center shadow-sm">
        {number}
      </div>
      
      <h3 className="text-2xl font-semibold text-gray-800 mb-3 text-center tracking-tight">
        {title}
      </h3>
      
      <p className="text-gray-500 text-base text-center leading-relaxed max-w-xs">
        {description}
      </p>
    </motion.div>
  );
};

const InstructionSection = () => {
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
    <div className="bg-gradient-to-br from-purple-50 to-indigo-100 py-24 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto"
      >
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          Hướng dẫn sử dụng ChatPDF
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <StepCard
            number="1"
            title="Tải lên PDF"
            description="Kéo thả hoặc chọn file PDF (tối đa 2000 trang, 100MB). Hỗ trợ đa dạng định dạng, tự động xử lý OCR cho file scan."
          />
          
          <StepCard
            number="2"
            title="Đặt câu hỏi"
            description="Nhận tóm tắt thông minh và hỏi chi tiết. AI phân tích ngữ cảnh, trích xuất thông tin chính xác kèm tham chiếu trang."
          />
          
          <StepCard
            number="3"
            title="Khám phá & học hỏi"
            description="Tương tác đa ngôn ngữ, dịch thuật theo ngữ cảnh, khám phá mối liên hệ dữ liệu và nhận gợi ý phân tích chuyên sâu."
          />
        </div>

        <motion.div
          className="mt-16 text-center text-gray-500 italic max-w-3xl mx-auto text-lg font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7, ease: "easeOut" }}
        >
          "Khám phá tài liệu với trí tuệ nhân tạo thế hệ mới – tương tác thông minh, hiệu quả vượt trội"
        </motion.div>
      </motion.div>
    </div>
  );
};

export default InstructionSection;