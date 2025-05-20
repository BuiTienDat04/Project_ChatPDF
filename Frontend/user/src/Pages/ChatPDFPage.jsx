"use client";

import { useState, useRef, useEffect } from "react";
import FileUploader from "../components/file-uploader";
import SlidePreview from "../components/slide-preview";
import SlideViewer from "../components/slide-viewer";
import TranslatedSlide from "../components/translated-slide";
import ChatBot from "../components/chat-bot";
import { Button } from "../components/ui/button";
import {
  ChevronRight,
  MessageSquare,
  Grid,
  FileText,
  X,
  PanelLeft,
} from "lucide-react";

// UploadHistory component
function UploadHistory({ uploadHistory }) {
  return (
    <div
      className="mt-8 p-4 border border-purple-300 rounded-lg shadow-sm max-w-6xl mx-auto w-full"
      style={{ backgroundColor: "#F3E8FF" }}
    >
      <h3 className="text-lg font-semibold text-gray-700 mb-3">Upload History</h3>
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
              <Button
                className="bg-purple-200 hover:bg-purple-300 text-gray-800 rounded-md px-3 py-1 text-sm font-medium transition"
                onClick={() => alert(`Viewing ${file.name}`)}
              >
                View
              </Button>
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
  const [isChatVisible, setIsChatVisible] = useState(true);
  const [uploadHistory, setUploadHistory] = useState([]);
  const originalContainerRef = useRef(null);
  const translatedContainerRef = useRef(null);

  // Sidebar state: "collapsed", "expanded", or "hidden"
  const [leftSidebarState, setLeftSidebarState] = useState("expanded");

  // Load PDF.js script
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

  // Toggle sidebar function
  const toggleLeftSidebar = () => {
    setLeftSidebarState((current) => {
      if (current === "hidden") return "collapsed";
      if (current === "collapsed") return "expanded";
      return "collapsed";
    });
  };

  // Close sidebar function
  const closeLeftSidebar = () => setLeftSidebarState("hidden");

  // Handle file upload and save to history
  const handleFileUpload = (fileInfo) => {
    console.log("Adding to upload history:", fileInfo);
    setUploadHistory((prev) => [fileInfo, ...prev]);
  };

  // Analyze and translate content
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

  console.log("pdfPages:", pdfPages);
  console.log("isLoading:", isLoading);
  console.log("pdfLoaded:", pdfLoaded);
  console.log("uploadHistory:", uploadHistory);

  return (
    <main className="flex flex-col min-h-screen bg-white font-poppins">
      <style jsx>{`
        button:disabled {
          opacity: 0.5;
          display: block !important;
          visibility: visible !important;
        }
      `}</style>
      <div className="p-6 border-b bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <h1 className="text-3xl font-bold text-gray-800">PDF Translator</h1>
          <div className="flex items-center gap-6">
            <FileUploader
              setPdfFile={setPdfFile}
              setPdfPages={setPdfPages}
              setTranslatedPages={setTranslatedPages}
              setIsLoading={setIsLoading}
              pdfLoaded={pdfLoaded}
              onFileUpload={handleFileUpload}
              className="bg-white border border-gray-300 rounded-lg p-2 hover:bg-gray-50 transition"
            />
          </div>
        </div>
      </div>

      {pdfFile ? (
        <div className="flex flex-1 h-[calc(100vh-120px)] relative">
          <div
            className={`border-r bg-white shadow-md transition-all duration-300 flex flex-col ${leftSidebarState === "hidden"
              ? "w-0 overflow-hidden"
              : leftSidebarState === "collapsed"
                ? "w-16"
                : "w-72"
              }`}
            style={{ backgroundColor: "#F5F5F5" }}
          >
            <div
              className="p-4 border-b flex items-center justify-between bg-white"
              style={{ backgroundColor: "#F5F5F5" }}
            >
              {leftSidebarState === "expanded" && (
                <>
                  <h2 className="text-xl font-semibold text-gray-700" style={{ color: "#4A4A4A" }}>
                    All Slides
                  </h2>
                  <button
                    onClick={closeLeftSidebar}
                    className="text-gray-600 hover:text-gray-800 transition"
                    aria-label="Close sidebar"
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
              className={`flex-1 overflow-auto ${leftSidebarState === "expanded" ? "p-4" : "p-2"}`}
            >
              {leftSidebarState === "collapsed" ? (
                <div className="flex flex-col items-center space-y-2 mt-2">
                  {pdfPages.length > 0 && (
                    <button
                      onClick={toggleLeftSidebar}
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-sm font-medium transition bg-white border border-gray-300 hover:bg-gray-50 shadow-sm"
                      aria-label="Toggle sidebar"
                    >
                      <Grid className="h-6 w-6 text-gray-700" />
                    </button>
                  )}
                  {pdfPages.map((page, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        toggleLeftSidebar();
                        setCurrentPage(index);
                      }}
                      className={`w-12 h-12 rounded-lg flex items-center justify-center text-sm font-medium transition ${currentPage === index
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
            <div className="p-3 border-b bg-white flex justify-center">
              <button
                onClick={toggleLeftSidebar}
                className="p-2 rounded-lg hover:bg-gray-100 transition"
                aria-label={leftSidebarState === "expanded" ? "Collapse sidebar" : "Expand sidebar"}
              >
                <PanelLeft
                  className={`h-6 w-6 text-gray-700 transition-transform ${leftSidebarState === "expanded" ? "rotate-180" : ""
                    }`}
                />
              </button>
            </div>
          </div>

          {leftSidebarState === "hidden" && (
            <button
              onClick={toggleLeftSidebar}
              className="bg-white border-y border-r p-3 hover:bg-gray-100 transition shadow-md"
              aria-label="Show slide preview"
            >
              <ChevronRight className="h-6 w-6 text-gray-700" />
            </button>
          )}

          <div className="flex-1 flex flex-row min-h-0">
            <div className="w-1/2 flex flex-col min-h-0 border-r">
              <div
                className="p-4 bg-white border-b sticky z-20 shadow-sm"
                style={{ backgroundColor: "#F5F5F5", top: "64px" }} // Adjust `top` to match nav bar height
              >
                <h2 className="text-xl font-semibold text-gray-700" style={{ color: "#4A4A4A" }}>
                  Original Slides
                </h2>
              </div>
              <div
                id="original-slide-container"
                ref={originalContainerRef}
                className="flex-1 p-6 overflow-y-auto bg-white rounded-lg shadow-inner"
              >
                <SlideViewer pages={pdfPages} currentPage={currentPage} pdfFile={pdfFile} />
              </div>
            </div>

            <div className="w-1/2 flex flex-col min-h-0">
              <div
                className="p-4 bg-white border-b sticky z-20 shadow-sm"
                style={{ backgroundColor: "#F5F5F5", top: "64px" }} // Adjust `top` to match nav bar height
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
                  <Button
                    onClick={analyzeAndTranslateContent}
                    disabled={pdfPages.length === 0 || isLoading}
                    className="bg-purple-200 hover:bg-purple-300 text-gray-800 rounded-lg px-6 py-2 text-sm font-medium transition shadow-md hover:shadow-lg"
                  >
                    Translate
                  </Button>
                </div>
              </div>
              <div
                id="translated-slide-container"
                ref={translatedContainerRef}
                className="flex-1 p-6 overflow-y-auto bg-white rounded-lg shadow-inner"
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


          <ChatBot
            pdfContent={pdfPages[currentPage]?.textContent || ""}
            isChatVisible={isChatVisible}
            setIsChatVisible={setIsChatVisible}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center flex-grow p-12 sm:p-14 md:p-16 bg-gray-100 min-h-screen">
          <div className="text-center p-10 sm:p-12 md:p-14 border border-gray-200 rounded-2xl bg-purple-100 shadow-md max-w-6xl w-full mx-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8">
              Welcome to PDF Translator
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-10 font-medium">
              Upload a PDF file to get started
            </p>
            <div className="flex justify-center">
              <div className="w-full">
                <FileUploader
                  setPdfFile={setPdfFile}
                  setPdfPages={setPdfPages}
                  setTranslatedPages={setTranslatedPages}
                  setIsLoading={setIsLoading}
                  pdfLoaded={pdfLoaded}
                  onFileUpload={handleFileUpload}
                  className="w-full max-w-md p-8 sm:p-10 bg-purple-100 border border-purple-300 rounded-2xl shadow-sm hover:bg-purple-200 transition duration-200"
                >
                  <div className="text-center">
                    <FileText className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                    <p className="text-gray-700 font-medium mb-2">Drag and drop or click to upload a PDF</p>
                    <p className="text-sm text-gray-500">Supported formats: PDF (max 10MB)</p>
                  </div>
                </FileUploader>
              </div>
            </div>
          </div>
          <div className="mt-8 p-10 sm:p-12 md:p-14 border border-purple-300 rounded-2xl bg-purple-100 shadow-md max-w-6xl w-full mx-4">
            <UploadHistory
              uploadHistory={uploadHistory}
              className="text-gray-700 font-medium"
            />
          </div>
        </div>
      )}

      {pdfFile && (
        <div className="fixed bottom-6 right-6 flex gap-3 md:hidden">
          <Button
            size="sm"
            variant="outline"
            className="rounded-full h-12 w-12 p-0 bg-gray-100 shadow-md border-gray-300 hover:bg-gray-200 transition"
            onClick={toggleLeftSidebar}
          >
            <Grid className="h-6 w-6 text-gray-700" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="rounded-full h-12 w-12 p-0 bg-gray-100 shadow-md border-gray-300 hover:bg-gray-200 transition"
            onClick={() => setIsChatVisible((prev) => !prev)}
          >
            <MessageSquare className="h-6 w-6 text-gray-700" />
          </Button>
        </div>
      )}
    </main>
  );
}