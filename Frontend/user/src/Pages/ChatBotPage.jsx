import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import {
  SparklesIcon,
  Bars3Icon,
  ClockIcon,
  PaperAirplaneIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

const ChatBotPage = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const history = ['Câu hỏi 1', 'Câu hỏi 2', 'Câu hỏi 3'];

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', text: input }]);
    setInput('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: 'bot', text: 'Đây là câu trả lời của chatbot.' },
      ]);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 font-sans">
      <Navigation className="fixed top-0 left-0 w-full z-10 shadow-sm" />

      <main className="pt-20 w-full">
        <div className="flex h-[calc(100vh-8rem)] w-full bg-white/95 backdrop-blur-lg rounded-t-3xl shadow-xl overflow-hidden">
          {/* Sidebar */}
          <div
            className={`transform transition-all duration-300 ease-in-out ${
              showSidebar ? 'w-80' : 'w-0 -translate-x-full'
            } bg-white/95 backdrop-blur-lg overflow-hidden border-r border-pink-100/30 shadow-inner`}
          >
            <div className="w-80 p-6 h-full flex flex-col">
              <div className="flex items-center mb-8">
                <div className="bg-gradient-to-br from-pink-400 to-purple-500 p-2 rounded-xl shadow-lg">
                  <SparklesIcon className="w-6 h-6 text-white" />
                </div>
                <h2 className="ml-3 text-xl font-semibold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                  Lịch Sử Chat
                </h2>
              </div>

              <ul className="space-y-2 flex-1 overflow-y-auto">
                {history.map((item, idx) => (
                  <li
                    key={idx}
                    className="group flex items-center p-3 hover:bg-pink-50/70 transition-all duration-200 cursor-pointer rounded-xl relative"
                  >
                    <div className="w-2 h-2 bg-pink-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-pink-600 transition-colors duration-200 truncate">
                      {item}
                    </span>
                    <div className="absolute inset-0 border border-pink-100/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-4 border-t border-pink-100/20">
                <button className="w-full flex items-center justify-center space-x-2 p-3 rounded-xl bg-pink-50/70 hover:bg-pink-100/50 transition-all duration-200 shadow-sm hover:shadow-md">
                  <TrashIcon className="w-5 h-5 text-pink-500/80" />
                  <span className="text-sm font-medium text-pink-600/80">
                    Xóa lịch sử
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
            {/* Header */}
            <header className="p-4 bg-white/90 backdrop-blur-lg flex items-center justify-between border-b border-pink-100/30">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowSidebar(!showSidebar)}
                  className="p-2 hover:bg-pink-50/70 rounded-xl transition-all duration-200 group"
                >
                  <Bars3Icon
                    className={`w-6 h-6 text-pink-500/80 group-hover:text-pink-600 transition-transform duration-200 ${
                      showSidebar ? 'rotate-90' : ''
                    }`}
                  />
                </button>
                <h1 className="text-2xl font-semibold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                  Trợ lý AI Thông Minh
                </h1>
              </div>
            </header>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-white/20 to-pink-50/20">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  } transition-all duration-200 hover:-translate-y-0.5`}
                >
                  <div
                    className={`max-w-md p-4 rounded-2xl shadow-lg backdrop-blur-lg ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-br from-pink-400/95 to-purple-500/95 text-white rounded-br-none'
                        : 'bg-white/95 text-gray-800 rounded-bl-none border border-pink-100/30'
                    } transition-transform duration-300 hover:shadow-xl`}
                  >
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    <div className="mt-2 text-xs opacity-80 flex items-center space-x-1 text-pink-300">
                      <ClockIcon className="w-3 h-3" />
                      <span>{new Date().toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white/90 backdrop-blur-lg border-t border-pink-100/30">
              <div className="flex items-center gap-3">
                <input
                  className="flex-1 p-4 rounded-2xl bg-white/95 border-2 border-pink-100/30 focus:outline-none focus:border-pink-400/80 focus:ring-2 focus:ring-pink-200/50 transition-all duration-200 placeholder:text-pink-400/70 shadow-sm hover:shadow-md"
                  placeholder="Nhập câu hỏi của bạn..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button
                  className="p-4 bg-gradient-to-br from-pink-400/95 to-purple-500/95 text-white rounded-2xl hover:scale-[1.03] transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95"
                  onClick={sendMessage}
                >
                  <PaperAirplaneIcon className="h-5 w-5 transform rotate-45" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ChatBotPage;