import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { SendIcon, ChevronLeft, ChevronRight, Bot } from "lucide-react";

export default function ChatBot({ pdfContent, isChatVisible, setIsChatVisible }) {
  const [messages, setMessages] = useState([
    {
      role: "system",
      content: "Xin chào! Tôi có thể giúp bạn hiểu nội dung của tệp PDF này. Hãy hỏi tôi bất cứ điều gì về trang chiếu hiện tại.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  const handleSubmit = async (e) => { // Thêm async ở đây
    e.preventDefault();

    if (!input.trim()) return;

    // Add user message
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // --- BẮT ĐẦU PHẦN CẦN THAY THẾ BẰNG GỌI API AI THỰC TẾ ---
    try {
      // Ví dụ gọi API (Đây chỉ là ví dụ CẤU TRÚC, bạn cần thay thế bằng API của mình)
      // Giả sử bạn có một API endpoint backend để xử lý yêu cầu AI,
      // hoặc bạn sử dụng SDK của AI model trực tiếp trên frontend (ít được khuyến khích cho khóa API)

      const response = await fetch('/api/chat-with-ai', { // Đây là một ví dụ về API endpoint của bạn
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer YOUR_API_KEY`, // Nếu bạn gọi trực tiếp từ frontend (cẩn thận với khóa API)
        },
        body: JSON.stringify({
          question: userMessage.content,
          context: pdfContent, // Truyền nội dung PDF hiện tại làm ngữ cảnh
          chatHistory: messages.slice(0, -1) // Có thể truyền lịch sử trò chuyện
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const aiResponseContent = data.response || data.text; // Tùy thuộc vào cấu trúc phản hồi của API

      const aiMessage = {
        role: "assistant",
        content: aiResponseContent || "Xin lỗi, tôi không thể tạo ra phản hồi lúc này.",
      };
      setMessages((prev) => [...prev, aiMessage]);

    } catch (error) {
      console.error("Lỗi khi gọi API AI:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Xin lỗi, đã có lỗi xảy ra khi kết nối với AI. Vui lòng thử lại sau.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
    // --- KẾT THÚC PHẦN CẦN THAY THẾ ---

    // Dòng setTimeout giả lập dưới đây cần được BỎ HOẶC XOÁ
    // setTimeout(() => {
    //   const aiResponse = {
    //     role: "assistant",
    //     content: generateMockResponse(input, pdfContent),
    //   };
    //   setMessages((prev) => [...prev, aiResponse]);
    //   setIsLoading(false);
    // }, 1000); // Simulated delay
  };

  // Hàm generateMockResponse này chỉ dùng để giả lập,
  // bạn có thể giữ nó nếu muốn có một fallback hoặc cho mục đích phát triển,
  // nhưng nó không phải là phần cốt lõi của AI.
  const generateMockResponse = (question, content) => {
    // ... (Giữ nguyên hoặc xóa hàm này nếu bạn không cần nữa)
    if (!content) {
      return "Tôi không thấy nội dung nào trên trang chiếu hiện tại. Vui lòng tải lên tệp PDF hoặc điều hướng đến một trang chiếu có nội dung.";
    }

    const lowerQuestion = question.toLowerCase();

    if (lowerQuestion.includes("translate") || lowerQuestion.includes("dịch")) {
      return "Tôi có thể giúp giải thích nội dung, nhưng để dịch, vui lòng sử dụng tính năng dịch ở bảng điều khiển phía trên.";
    }

    if (lowerQuestion.includes("summary") || lowerQuestion.includes("tóm tắt")) {
      const summaryPreview = content.length > 50 ? content.substring(0, 50) + "..." : content;
      return `Đây là bản tóm tắt về trang chiếu hiện tại: Trang chiếu này dường như thảo luận về "${summaryPreview}".`;
    }

    if (lowerQuestion.includes("explain") || lowerQuestion.includes("giải thích") || lowerQuestion.includes("what") || lowerQuestion.includes("là gì")) {
       const explanationPreview = content.length > 80 ? content.substring(0, 80) + "..." : content;
      return `Dựa trên nội dung trang chiếu: "${explanationPreview}", tôi có thể giải thích rằng điều này dường như nói về...`;
    }

    const defaultPreview = content.length > 50 ? content.substring(0, 50) + "..." : content;
    return `Tôi đã phân tích nội dung trang chiếu. Nó chứa thông tin về "${defaultPreview}". Bạn muốn biết điều gì cụ thể về nó không?`;
  };

  // Toggle chat visibility
  const toggleChatVisibility = () => {
    setIsChatVisible((prev) => !prev);
  };

  return (
    <div className="fixed top-0 right-0 h-screen z-50 pointer-events-none">

      {/* Toggle button */}
      <button
        onClick={toggleChatVisibility}
        className="absolute top-[120px] z-50 pointer-events-auto
                   -left-10 flex items-center justify-center w-10 h-10 bg-purple-50 text-pink-800 rounded-l-md shadow-md
                   focus:outline-none focus:ring-2 focus:ring-purple-200 focus:ring-opacity-50
                   hover:bg-purple-100 transition-colors duration-200
                   group transform hover:scale-105 active:scale-100"
        style={{ transform: "translateY(0)" }}
        aria-label={isChatVisible ? "Đóng Chat AI" : "Mở Chat AI"}
      >
        {isChatVisible ? (
          <ChevronRight className="h-6 w-6" />
        ) : (
          <ChevronLeft className="h-6 w-6" />
        )}
      </button>

      {/* Chat container */}
      <div
        className={`flex flex-col bg-purple-50 shadow-xl relative transition-all duration-300 ease-in-out rounded-l-lg overflow-hidden`}
        style={{
          width: isChatVisible ? "350px" : "0px",
          top: "100px", // Adjust top based on your actual layout/header height
          height: "calc(100vh - 100px)", // Adjust height based on your actual layout/header height
        }}
      >
        {/* Header */}
        <div className="bg-purple-100 py-3 px-4 flex items-center gap-3 border-b border-purple-200 shadow-sm">
          <div className="bg-purple-50 p-1.5 rounded-full flex items-center justify-center shadow-inner">
            <Bot className="h-5 w-5 text-pink-700" />
          </div>
          <h2 className="text-pink-800 font-semibold text-base drop-shadow-sm">AI Assistant</h2>
        </div>

        {/* Messages area */}
        <div
          className="flex-1 overflow-y-auto p-4 space-y-4 bg-purple-50 scrollbar-thin scrollbar-thumb-purple-200 scrollbar-track-purple-50"
          style={{ maxHeight: "calc(100% - 110px)" }} // Height calculation (Header height ~ 50px, Input area ~ 60px)
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-3 py-2 rounded-lg transition-all duration-200 max-w-[85%] break-words shadow-sm hover:shadow-md
                ${
                  message.role === "user"
                    ? "bg-purple-50 ml-auto rounded-br-lg"
                    : "bg-purple-50 mr-auto rounded-bl-lg border border-purple-100"
                }`}
            >
                {/* Text color applied here */}
              <p className="text-rose-800 text-sm leading-relaxed">{message.content}</p> {/* Text color: pink-red like */}
            </div>
          ))}

          {/* Loading dots */}
          {isLoading && (
            <div className="bg-purple-50 p-3 rounded-lg mr-auto flex items-center space-x-2 w-fit rounded-bl-lg shadow-sm border border-purple-100">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.15s" }}></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.3s" }}></div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input section */}
        <div className="sticky bottom-0 bg-purple-50 p-4 border-t border-purple-100 shadow-inner">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Hỏi về trang chiếu này..."
              className="flex-grow px-3 py-2 border border-purple-100 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-200
                         text-gray-700 shadow-inner hover:border-purple-200 transition-all bg-purple-50 disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="flex-shrink-0 bg-purple-400 hover:bg-purple-500 text-white rounded-md shadow-sm hover:shadow-md transition-all disabled:opacity-60 disabled:cursor-not-allowed p-2.5"
            >
              <SendIcon className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}