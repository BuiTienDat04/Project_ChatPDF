import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { SendIcon, ChevronLeft, ChevronRight } from "lucide-react";

export default function ChatBot({ pdfContent, isChatVisible, setIsChatVisible }) {
  const [messages, setMessages] = useState([
    {
      role: "system",
      content: "Hello! I can help you understand the content of your PDF. Ask me anything about the current slide.",
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

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        role: "assistant",
        content: generateMockResponse(input, pdfContent),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };

  // Mock function to generate responses
  const generateMockResponse = (question, content) => {
    if (!content) {
      return "I don't see any content on the current slide. Please upload a PDF or navigate to a slide with content.";
    }

    if (question.toLowerCase().includes("translate")) {
      return "I can help explain the content, but for translation, please use the translation feature in the top panel.";
    }

    if (question.toLowerCase().includes("summary") || question.toLowerCase().includes("summarize")) {
      return `Here's a summary of the current slide: This slide appears to discuss ${content.substring(0, 30)}...`;
    }

    if (question.toLowerCase().includes("explain") || question.toLowerCase().includes("what")) {
      return `Based on the slide content: "${content.substring(0, 50)}...", I can explain that this appears to be about...`;
    }

    return `I've analyzed the slide content. It contains information about "${content.substring(0, 30)}...". Is there something specific you'd like to know about it?`;
  };

  // Toggle chat visibility
  const toggleChatVisibility = () => {
    setIsChatVisible((prev) => !prev);
  };

  return (
    <div className="fixed top-0 right-0 h-screen z-50">
      {/* Toggle sidebar button */}
      <button
        onClick={toggleChatVisibility}
        className="absolute top-[100px] -left-10 bg-pink-500 text-white p-2 rounded-l-md focus:outline-none hover:bg-pink-600 transition-all"
        style={{ transform: "translateY(0)" }}
      >
        {isChatVisible ? <ChevronRight className="h-6 w-6" /> : <ChevronLeft className="h-6 w-6" />}
      </button>

      {/* Chat frame */}
      <div
        className={`flex flex-col bg-white relative transition-all duration-300 ease-in-out ${
          isChatVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{
          width: isChatVisible ? "320px" : "0px",
          top: "100px",
          height: "calc(100vh - 100px)",
          overflow: isChatVisible ? "visible" : "hidden",
        }}
      >
        {/* Messages section with scroll */}
        <div
          className="flex-1 overflow-y-auto p-4 space-y-4"
          style={{ maxHeight: "calc(100% - 60px)" }}
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg ${
                message.role === "user" ? "bg-pink-100 ml-auto" : "bg-pink-50 mr-auto"
              } max-w-[85%] break-words`}
            >
              <p className="text-sm text-gray-800">{message.content}</p>
            </div>
          ))}
          
          {isLoading && (
            <div className="bg-pink-50 p-3 rounded-lg mr-auto flex items-center space-x-2">
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Fixed input section at the bottom */}
        <div className="sticky bottom-0 bg-white border-t border-pink-200">
          <form onSubmit={handleSubmit} className="p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about this slide..."
                className="flex-grow px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-700"
                disabled={isLoading}
              />
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-pink-500 hover:bg-pink-600 text-white"
              >
                <SendIcon className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}