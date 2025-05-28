"use client";

import { useState, useRef, useEffect } from "react";
import FileUploader from "../components/file-uploader";
import SlidePreview from "../components/slide-preview";
import SlideViewer from "../components/slide-viewer";
import TranslatedSlide from "../components/translated-slide";
import ChatBot from "../components/chat-bot";
import Navigation from "../components/Navigation";
import { Button } from "../components/ui/button";
import Cart from "../components/Cart";
import InstructionSection from "../components/InstructionSection";
import QuestionChatPdf from "../components/QuestionChatPdf";
import Footer from "../components/Footer";
import { MessageSquare, Grid, FileText, X, SendIcon } from "lucide-react";

// Component Button đơn giản
function CustomButton({ children, className, ...props }) {
  return (
    <button className={`px-4 py-2 rounded-md ${className}`} {...props}>
      {children}
    </button>
  );
}

// UploadHistory component
function UploadHistory({ uploadHistory }) {
  return (
    <div
      className="mt-8 p-6 border border-purple-300 rounded-2xl shadow-md w-full max-w-6xl mx-auto"
      style={{ backgroundColor: "#F3E8FF" }}
    >
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Upload History</h3>
      {uploadHistory.length === 0 ? (
        <p className="text-gray-600 text-sm">No files uploaded yet.</p>
      ) : (
        <ul className="space-y-3">
          {uploadHistory.map((file, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-3 bg-purple-100 rounded-md border border-purple-300 hover:bg-purple-200 transition-colors duration-200"
            >
              <div>
                <p className="text-sm font-medium text-gray-800">{file.name}</p>
                <p className="text-xs text-gray-600">Uploaded: {file.date}</p>
              </div>
              <CustomButton
                className="bg-purple-200 hover:bg-purple-300 text-gray-800 rounded-md px-3 py-1 text-sm font-medium transition"
                onClick={() => alert(`Viewing ${file.name}`)}
              >
                View
              </CustomButton>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Home() {
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfPages, setPdfPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [translatedPages, setTranslatedPages] = useState([]);
  const [targetLanguage, setTargetLanguage] = useState("es");
  const [isLoading, setIsLoading] = useState(false);
  const [pdfLoaded, setPdfLoaded] = useState(false);
  const [uploadHistory, setUploadHistory] = useState([]);
  const originalContainerRef = useRef(null);
  const translatedContainerRef = useRef(null);
  const chatContainerRef = useRef(null);
  const leftSidebarContentRef = useRef(null);
  const [chatScrollPosition, setChatScrollPosition] = useState(0);
  const [chatMessages, setChatMessages] = useState([
    {
      role: "system",
      content:
        "Xin chào! Tôi có thể giúp bạn hiểu nội dung của tệp PDF này. Hãy hỏi tôi bất cứ điều gì về trang chiếu hiện tại.",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [leftSidebarState, setLeftSidebarState] = useState("expanded");
  const [rightSidebarState, setRightSidebarState] = useState("expanded");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.min.js";
    script.async = true;
    script.onload = () => {
      console.log("PDF.js loaded successfully");
      window.pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js";
      setPdfLoaded(true);
    };
    script.onerror = () => {
      console.error("Failed to load PDF.js");
      alert("Failed to load PDF.js. Please check your network or try again later.");
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (rightSidebarState === "expanded" && chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatScrollPosition;
    }
  }, [rightSidebarState]);

  const handleChatScroll = (e) => {
    if (chatContainerRef.current) {
      setChatScrollPosition(chatContainerRef.current.scrollTop);
      e.stopPropagation();
      e.preventDefault();
    }
  };

  const languages = [
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "it", name: "Italian" },
    { code: "pt", name: "Portuguese" },
    { code: "zh", name: "Chinese" },
    { code: "ja", name: "Japanese" },
    { code: "ko", name: "Korean" },
    { code: "ru", name: "Russian" },
  ];

  const toggleLeftSidebar = () => {
    setLeftSidebarState((current) => (current === "collapsed" ? "expanded" : "collapsed"));
  };

  const toggleRightSidebar = () => {
    if (rightSidebarState === "expanded" && chatContainerRef.current) {
      setChatScrollPosition(chatContainerRef.current.scrollTop);
    }
    setRightSidebarState((current) => (current === "collapsed" ? "expanded" : "collapsed"));
  };

  const handleFileUpload = (fileInfo) => {
    console.log("Adding to upload history:", fileInfo);
    setUploadHistory((prev) => [fileInfo, ...prev]);
  };

  const analyzeAndTranslateContent = () => {
    if (pdfPages.length > 0) {
      setIsLoading(true);
      setTimeout(() => {
        const translated = pdfPages.map((page, pageIndex) => {
          const selectedLanguage = languages.find((l) => l.code === targetLanguage)?.name || "Spanish";
          const hasTable =
            page.textContent.includes("|") ||
            page.textContent.match(/\n\s*[-+]{3,}\s*\n/g) !== null ||
            (page.textContent.match(/\b\d+(\.\d+)?\s*%\b/g) !== null &&
              page.textContent.match(/\b(total|sum|average)\b/gi) !== null);
          const hasList = page.textContent.match(/^\s*[\d*-]\s+.+/gm) !== null;
          const hasHeading =
            page.textContent.match(/^.{1,60}\n\s*={3,}|-{3,}/m) !== null ||
            page.textContent.match(/^#+\s+.+/gm) !== null;

          const structuredContent = {
            text: page.textContent,
            paragraphs: [],
            tables: [],
            lists: [],
            figures: [],
          };

          if (hasHeading) {
            const titleMatch = page.textContent.match(/^(.{1,60})\n/);
            if (titleMatch) {
              structuredContent.title = `[${selectedLanguage}] ${titleMatch[1]}`;
            }
          }

          const paragraphs = page.textContent
            .split(/\n\s*\n/)
            .filter((p) => p.trim().length > 0 && p.trim().length > 20)
            .map((p) => `[${selectedLanguage}] ${p.trim()}`);

          structuredContent.paragraphs = paragraphs;

          if (hasTable) {
            structuredContent.tables.push({
              caption: `[${selectedLanguage}] Table ${pageIndex + 1}`,
              header: ["Column 1", "Column 2", "Column 3"].map((h) => `[${selectedLanguage}] ${h}`),
              rows: [
                ["Data 1", "Data 2", "Data 3"].map((d) => `[${selectedLanguage}] ${d}`),
                ["Data 4", "Data 5", "Data 6"].map((d) => `[${selectedLanguage}] ${d}`),
                ["Data 7", "Data 8", "Data 9"].map((d) => `[${selectedLanguage}] ${d}`),
              ],
            });
          }

          if (hasList) {
            structuredContent.lists.push({
              type: "unordered",
              items: [
                `[${selectedLanguage}] List item 1`,
                `[${selectedLanguage}] List item 2`,
                `[${selectedLanguage}] List item 3`,
              ],
            });
          }

          structuredContent.figures.push({
            imageIndex: 0,
            caption: `[${selectedLanguage}] Figure caption for page ${pageIndex + 1}`,
          });

          return structuredContent;
        });

        setTranslatedPages(translated);
        setIsLoading(false);
      }, 2000);
    }
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = { role: "user", content: chatInput };
    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput("");
    setIsChatLoading(true);

    try {
      const aiResponseContent = await simulateAIResponse(
        chatInput,
        pdfPages[currentPage]?.textContent || ""
      );
      const aiMessage = {
        role: "assistant",
        content: aiResponseContent,
      };
      setChatMessages((prev) => {
        const newMessages = [...prev, aiMessage];
        setTimeout(() => {
          if (chatContainerRef.current && rightSidebarState === "expanded") {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
          }
        }, 0);
        return newMessages;
      });
    } catch (error) {
      console.error("Lỗi giả lập:", error);
      setChatMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.",
        },
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const simulateAIResponse = (question, currentPdfContent) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let responseText = "";
        if (question.toLowerCase().includes("gì") || question.toLowerCase().includes("what")) {
          responseText = `Slide này nói về: ${currentPdfContent}`;
        } else if (
          question.toLowerCase().includes("tóm tắt") ||
          question.toLowerCase().includes("summary")
        ) {
          responseText = `Tóm tắt: ${currentPdfContent.slice(0, 50)}...`;
        } else {
          responseText = `Bạn hỏi: "${question}". Dựa trên slide: ${currentPdfContent}`;
        }
        resolve(responseText);
      }, 1000);
    });
  };

  console.log("pdfPages:", pdfPages);
  console.log("isLoading:", isLoading);
  console.log("pdfLoaded:", pdfLoaded);
  console.log("uploadHistory:", uploadHistory);

  const chatInputHeight = 70;
  const navHeight = 80;
  const headerHeight = 64;
  const sidebarContentHeight = `calc(100vh - ${navHeight}px - ${headerHeight}px)`;

  return (
    <main className="flex flex-col min-h-screen bg-gray-100 font-poppins">
      <style jsx>{`
        button:disabled {
          opacity: 0.5;
          display: block !important;
          visibility: visible !important;
        }
        .scrollbar-visible::-webkit-scrollbar {
          width: 8px;
        }
        .scrollbar-visible::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .scrollbar-visible::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 4px;
        }
        .scrollbar-visible::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
        .scroll-isolated {
          overscroll-behavior: contain;
          isolation: isolate;
          position: relative;
          touch-action: manipulation;
          -webkit-overflow-scrolling: touch;
          overflow-anchor: none;
        }
      `}</style>
      <Navigation
        setPdfFile={setPdfFile}
        setPdfPages={setPdfPages}
        setTranslatedPages={setTranslatedPages}
        setIsLoading={setIsLoading}
        pdfLoaded={pdfLoaded}
        onFileUpload={handleFileUpload}
        style={{ position: "fixed", top: 0, width: "100%", zIndex: 50, backgroundColor: "#F5F5F5" }}
      />
      {pdfFile ? (
        <div className="flex flex-1 h-[calc(100vh-80px)] mt-[80px] relative scroll-isolated">
          {/* Left Sidebar (All Slides) */}
          <div
            className={`border-r bg-white shadow-md transition-all duration-300 flex flex-col ${
              leftSidebarState === "collapsed" ? "w-16" : "w-72"
            }`}
            style={{ backgroundColor: "#F5F5F5" }}
          >
            <div
              className="p-4 border-b flex items-center justify-between bg-white sticky z-20"
              style={{ backgroundColor: "#F5F5F5", top: `${navHeight}px` }}
            >
              {leftSidebarState === "expanded" && (
                <>
                  <h2 className="text-xl font-semibold text-gray-700" style={{ color: "#4A4A4A" }}>
                    All Slides
                  </h2>
                  <button
                    onClick={toggleLeftSidebar}
                    className="text-gray-600 hover:text-gray-800 transition"
                    aria-label="Toggle sidebar"
                  >
                    <X className="h-5 w-5 text-gray-700" />
                  </button>
                </>
              )}
              {leftSidebarState === "collapsed" && (
                <div className="w-full flex justify-center">
                  <FileText className="h-6 w-6 text-gray-700" />
                </div>
              )}
            </div>
            <div
              ref={leftSidebarContentRef}
              className={`scroll-isolated overflow-y-auto scrollbar-visible ${
                leftSidebarState === "expanded" ? "p-4" : "p-2"
              }`}
              style={{ height: sidebarContentHeight }}
            >
              {leftSidebarState === "collapsed" ? (
                <div className="flex flex-col items-center space-y-2 mt-2">
                  {pdfPages.length > 0 && (
                    <button
                      onClick={toggleLeftSidebar}
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-sm font-medium transition bg-white border border-gray-300 hover:bg-gray-50 shadow-sm"
                      aria-label="Expand sidebar"
                    >
                      <Grid className="h-6 w-6 text-gray-700" />
                    </button>
                  )}
                  {pdfPages.map((page, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setLeftSidebarState("expanded");
                        setCurrentPage(index);
                      }}
                      className={`w-12 h-12 rounded-lg flex items-center justify-center text-sm font-medium transition ${
                        currentPage === index
                          ? "bg-gray-200 text-gray-800 border border-gray-400 shadow-md"
                          : "bg-white border border-gray-300 hover:bg-gray-50 shadow-sm"
                      }`}
                      style={{ color: "#4A4A4A" }}
                    >
                      {page.pageNumber}
                    </button>
                  ))}
                </div>
              ) : (
                leftSidebarState === "expanded" && (
                  <SlidePreview
                    pages={pdfPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  />
                )
              )}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-row min-h-0 scroll-isolated">
            {/* Original Slides */}
            <div className="w-1/2 flex flex-col min-h-0 border-r">
              <div
                className="p-4 bg-white border-b sticky z-20 shadow-sm"
                style={{ backgroundColor: "#F5F5F5", top: `${navHeight}px` }}
              >
                <h2 className="text-xl font-semibold text-gray-700" style={{ color: "#4A4A4A" }}>
                  Original Slides
                </h2>
              </div>
              <div
                id="original-slide-container"
                ref={originalContainerRef}
                className="scroll-isolated flex-1 p-6 overflow-y-auto bg-white rounded-lg shadow-inner"
              >
                <SlideViewer pages={pdfPages} currentPage={currentPage} pdfFile={pdfFile} />
              </div>
            </div>

            {/* Translated Slides */}
            <div className="w-1/2 flex flex-col min-h-0">
              <div
                className="p-4 bg-white border-b sticky z-20 shadow-sm"
                style={{ backgroundColor: "#F5F5F5", top: `${navHeight}px` }}
              >
                <h2 className="text-xl font-semibold text-gray-700" style={{ color: "#4A4A4A" }}>
                  Translated Slides
                </h2>
                <div className="flex items-center gap-3 mt-2">
                  <label htmlFor="language" className="text-sm font-medium text-gray-700">
                    Translate to:
                  </label>
                  <select
                    id="language"
                    value={targetLanguage}
                    onChange={(e) => setTargetLanguage(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white text-gray-900 focus:ring-2 focus:ring-purple-200 transition shadow-sm"
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                  <CustomButton
                    onClick={analyzeAndTranslateContent}
                    disabled={pdfPages.length === 0 || isLoading}
                    className="bg-purple-200 hover:bg-purple-300 text-gray-800 rounded-lg px-6 py-2 text-sm font-medium transition shadow-md hover:shadow-lg"
                  >
                    Translate
                  </CustomButton>
                </div>
              </div>
              <div
                id="translated-slide-container"
                ref={translatedContainerRef}
                className="scroll-isolated flex-1 p-6 overflow-y-auto bg-white rounded-lg shadow-inner"
              >
                <TranslatedSlide
                  translatedPages={translatedPages}
                  currentPage={currentPage}
                  isLoading={isLoading}
                  targetLanguage={languages.find((l) => l.code === targetLanguage)?.name || ""}
                  originalPages={pdfPages}
                />
              </div>
            </div>
          </div>

          {/* Right Sidebar (ChatBot) */}
          <div
            className={`fixed top-[80px] right-0 bg-white shadow-md transition-all duration-300 flex flex-col ${
              rightSidebarState === "collapsed" ? "w-16" : "w-72"
            }`}
            style={{ backgroundColor: "#F5F5F5", height: `calc(100vh - 80px)` }}
          >
            <div
              className="p-4 border-b flex items-center justify-between bg-white sticky z-20"
              style={{ backgroundColor: "#F5F5F5", top: 0 }}
            >
              {rightSidebarState === "expanded" && (
                <>
                  <h2 className="text-xl font-semibold text-gray-700" style={{ color: "#4A4A4A" }}>
                    AI Assistant
                  </h2>
                  <button
                    onClick={toggleRightSidebar}
                    className="text-gray-600 hover:text-gray-800 transition"
                    aria-label="Toggle Chat AI sidebar"
                  >
                    <X className="h-5 w-5 text-gray-700" />
                  </button>
                </>
              )}
              {rightSidebarState === "collapsed" && (
                <div className="w-full flex justify-center">
                  <MessageSquare className="h-6 w-6 text-gray-700" />
                </div>
              )}
            </div>
            <div
              className="scroll-isolated overflow-y-auto scrollbar-visible flex-1"
              ref={chatContainerRef}
              onScroll={handleChatScroll}
            >
              {rightSidebarState === "collapsed" ? (
                <div className="flex flex-col items-center space-y-2 mt-2">
                  <button
                    onClick={toggleRightSidebar}
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-sm font-medium transition bg-white border border-gray-300 hover:bg-gray-50 shadow-sm"
                    aria-label="Expand Chat AI sidebar"
                  >
                    <MessageSquare className="h-6 w-6 text-gray-700" />
                  </button>
                </div>
              ) : (
                rightSidebarState === "expanded" && (
                  <ChatBot
                    messages={chatMessages}
                    setMessages={setChatMessages}
                    isLoading={isChatLoading}
                    chatContainerRef={chatContainerRef}
                  />
                )
              )}
            </div>
            {rightSidebarState === "expanded" && (
              <div className="p-4 border-t border-gray-200">
                <form onSubmit={handleChatSubmit} className="flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Hỏi về trang chiếu này..."
                    className="flex-grow px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 text-gray-700 bg-white hover:border-gray-300 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    disabled={isChatLoading}
                  />
                  <CustomButton
                    type="submit"
                    disabled={isChatLoading || !chatInput.trim()}
                    className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-all disabled:opacity-60 disabled:cursor-not-allowed p-2.5"
                  >
                    <SendIcon className="h-4 w-4" />
                  </CustomButton>
                </form>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col min-h-screen bg-gray-100">
          <div className="flex flex-col items-center flex-grow p-6 sm:p-8 md:p-12 mt-20">
            <div className="text-center p-6 sm:p-8 md:p-10 border border-gray-200 rounded-2xl bg-purple-100 shadow-md w-full max-w-6xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Welcome to PDF Translator
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-8 font-medium">
                Upload a PDF file to get started
              </p>
              <FileUploader
                setPdfFile={setPdfFile}
                setPdfPages={setPdfPages}
                setTranslatedPages={setTranslatedPages}
                setIsLoading={setIsLoading}
                pdfLoaded={pdfLoaded}
                onFileUpload={handleFileUpload}
                className="w-full max-w-md mx-auto p-6 sm:p-8 bg-purple-100 border border-purple-300 rounded-2xl shadow-md hover:bg-purple-200 transition duration-200"
              >
                <div className="text-center">
                  <FileText className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                  <p className="text-gray-700 font-medium mb-2">
                    Drag and drop or click to upload a PDF
                  </p>
                  <p className="text-sm text-gray-500">Supported formats: PDF (max 10MB)</p>
                </div>
              </FileUploader>
            </div>
            <div className="mt-8 w-full max-w-6xl mx-auto">
              <UploadHistory uploadHistory={uploadHistory} />
            </div>
            <div className="mt-8 w-full">
              <Cart />
            </div>
            <div className="mt-8 w-full">
              <InstructionSection />
            </div>
            <div className="mt-8 w-full">
              <QuestionChatPdf />
            </div>
          </div>
          <div className="mt-auto w-full">
            <Footer />
          </div>
        </div>
      )}
    </main>
  );
}