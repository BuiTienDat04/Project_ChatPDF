// ChatBot.jsx (Version 6)
import React, { useRef, useEffect } from "react";
// Bỏ SendIcon, BotMessageSquare, Button vì chúng không còn nằm ở đây nữa

// Bỏ props pdfContent, setInput, input, setIsChatLoading, handleSubmit
// Thay vào đó, nhận messages và isLoading từ component cha
export default function ChatBot({ messages, isLoading }) {
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  return (
    // Bỏ sticky bottom và chỉ để flex-1 overflow-y-auto
    <div className="flex flex-col bg-white w-full h-full"> {/* Bỏ shadow-lg vì nó sẽ nằm trong sidebar */}
      {/* Header đã được chuyển lên ChatPDFPage nếu bạn muốn tiêu đề cố định */}
      {/* <div className="bg-gray-100 py-3 px-4 flex items-center gap-3 border-b border-gray-200">
        <div className="bg-gray-200 p-1.5 rounded-full flex items-center justify-center">
          <BotMessageSquare className="h-5 w-5 text-gray-600" />
        </div>
        <h2 className="text-gray-800 font-semibold text-base">AI Assistant</h2>
      </div> */}

      {/* Messages area - Lấp đầy không gian còn lại */}
      <div
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-white scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-50"
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

        {/* Loading dots (giữ nguyên) */}
        {isLoading && (
          <div className="bg-gray-50 p-3 rounded-lg mr-auto flex items-center space-x-2 w-fit rounded-bl-lg shadow-sm border border-gray-200">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.15s" }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.3s" }}></div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input section đã được chuyển lên ChatPDFPage.jsx */}
    </div>
  );
}