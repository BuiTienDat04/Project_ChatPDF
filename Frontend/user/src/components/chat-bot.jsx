import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { SendIcon, ChevronLeft, ChevronRight, BotMessageSquare } from "lucide-react";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    // Add user message
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat-with-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: userMessage.content,
          context: pdfContent,
          chatHistory: messages.slice(0, -1),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const aiResponseContent = data.response || data.text;

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
        className="absolute top-[120px] z-50 pointer-events-auto -left-10 flex items-center justify-center w-10 h-10 bg-gray-100 text-gray-700 rounded-l-md shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300 hover:bg-gray-200 transition-colors duration-200"
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
        className="flex flex-col bg-white shadow-lg relative transition-all duration-300 ease-in-out rounded-l-lg overflow-hidden"
        style={{
          width: isChatVisible ? "350px" : "0px",
          top: "100px",
          height: "calc(100vh - 100px)",
        }}
      >
        {/* Header */}
        <div className="bg-gray-100 py-3 px-4 flex items-center gap-3 border-b border-gray-200">
          <div className="bg-gray-200 p-1.5 rounded-full flex items-center justify-center">
            <BotMessageSquare className="h-5 w-5 text-gray-600" />
          </div>
          <h2 className="text-gray-800 font-semibold text-base">AI Assistant</h2>
        </div>

        {/* Messages area */}
        <div
          className="flex-1 overflow-y-auto p-4 space-y-4 bg-white scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-50"
          style={{ maxHeight: "calc(100% - 110px)" }}
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg max-w-[85%] break-words shadow-sm ${
                message.role === "user"
                  ? "bg-blue-50 ml-auto rounded-br-lg"
                  : "bg-gray-50 mr-auto rounded-bl-lg border border-gray-200"
              }`}
            >
              <p className="text-gray-800 text-sm leading-relaxed">{message.content}</p>
            </div>
          ))}

          {/* Loading dots */}
          {isLoading && (
            <div className="bg-gray-50 p-3 rounded-lg mr-auto flex items-center space-x-2 w-fit rounded-bl-lg shadow-sm border border-gray-200">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.15s" }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.3s" }}></div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input section */}
        <div className="sticky bottom-0 bg-white p-4 border-t border-gray-200">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Hỏi về trang chiếu này..."
              className="flex-grow px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 text-gray-700 bg-white hover:border-gray-300 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-all disabled:opacity-60 disabled:cursor-not-allowed p-2.5"
            >
              <SendIcon className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}