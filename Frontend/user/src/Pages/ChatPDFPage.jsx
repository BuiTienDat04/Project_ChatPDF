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
    <div className="mt-8 bg-purple-100 rounded-2xl shadow-2xl p-6 border-2 border-pink-200 max-w-6xl mx-auto w-full">
      <h3 className="text-2xl font-bold text-pink-700 mb-4">Upload History</h3>
      {uploadHistory.length === 0 ? (
        <p className="text-lg text-pink-600">No files uploaded yet.</p>
      ) : (
        <ul className="space-y-4">
          {uploadHistory.map((file, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-4 bg-purple-100 rounded-lg border border-pink-300 hover:bg-purple-200 transition-colors duration-300 shadow-sm"
            >
              <div>
                <p className="text-lg font-medium text-pink-800">{file.name}</p>
                <p className="text-sm text-pink-600">Uploaded: {file.date}</p>
              </div>
              <Button
                className="bg-pink-600 hover:bg-pink-700 text-white rounded-lg px-4 py-2 text-sm font-semibold transition shadow-md"
                onClick={() => alert(`Viewing ${file.name}`)} // Thay bằng logic xem/tải file
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
      window.pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js";
      setPdfLoaded(true);
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

  return (
    <main className="flex flex-col min-h-screen bg-purple-100 font-poppins">
      <div className="p-6 border-b bg-purple-100 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <h1 className="text-4xl font-extrabold text-pink-700 tracking-tight">
            PDF Translator
          </h1>

          <div className="flex items-center gap-6">
            <FileUploader
              setPdfFile={setPdfFile}
              setPdfPages={setPdfPages}
              setTranslatedPages={setTranslatedPages}
              setIsLoading={setIsLoading}
              pdfLoaded={pdfLoaded}
              onFileUpload={handleFileUpload}
              className="bg-purple-100 border-2 border-pink-300 rounded-lg p-2 hover:bg-purple-200 transition"
            />

            <div className="flex items-center gap-3">
              <label htmlFor="language" className="text-base font-medium text-pink-800">
                Translate to:
              </label>
              <select
                id="language"
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)}
                className="border border-pink-300 rounded-lg px-3 py-2 text-base bg-purple-100 text-pink-900 focus:ring-2 focus:ring-pink-400 transition shadow-sm"
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
                className="bg-pink-600 hover:bg-pink-700 text-white rounded-lg px-6 py-2 text-base font-semibold transition shadow-md hover:shadow-lg"
              >
                Translate
              </Button>
            </div>
          </div>
        </div>
      </div>

      {pdfFile ? (
        <div className="flex flex-1 h-[calc(100vh-120px)] relative">
          <div
            className={`border-r bg-purple-50 shadow-md transition-all duration-300 flex flex-col ${leftSidebarState === "hidden"
              ? "w-0 overflow-hidden"
              : leftSidebarState === "collapsed"
                ? "w-16"
                : "w-72"
              }`}
          >
            <div className="p-4 border-b flex items-center justify-between bg-purple-100">
              {leftSidebarState === "expanded" && (
                <>
                  <h2 className="text-xl font-bold text-pink-700">All Slides</h2>
                  <button
                    onClick={closeLeftSidebar}
                    className="text-pink-600 hover:text-pink-800 transition"
                    aria-label="Close sidebar"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </>
              )}
              {leftSidebarState === "collapsed" && (
                <div className="w-full flex justify-center">
                  <FileText className="h-6 w-6 text-pink-700" />
                </div>
              )}
            </div>
            <div
              className={`flex-1 overflow-auto ${leftSidebarState === "expanded" ? "p-4" : "p-2"}`}
            >
              {leftSidebarState === "collapsed" ? (
                <div className="flex flex-col items-center space-y-4 mt-2">
                  {pdfPages.length > 0 && (
                    <button
                      onClick={toggleLeftSidebar}
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-sm font-medium transition bg-purple-100 text-pink-700 hover:bg-purple-200 shadow-sm"
                      aria-label="Toggle sidebar"
                    >
                      <Grid className="h-6 w-6 text-pink-700" />
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
                        ? "bg-pink-200 text-pink-800 border border-pink-400 shadow-md"
                        : "bg-purple-100 text-pink-700 hover:bg-purple-200 shadow-sm"
                        }`}
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
            <div className="p-3 border-b bg-purple-100 flex justify-center">
              <button
                onClick={toggleLeftSidebar}
                className="p-2 rounded-lg hover:bg-purple-200 transition"
                aria-label={leftSidebarState === "expanded" ? "Collapse sidebar" : "Expand sidebar"}
              >
                <PanelLeft
                  className={`h-6 w-6 text-pink-700 transition-transform ${leftSidebarState === "expanded" ? "rotate-180" : ""
                    }`}
                />
              </button>
            </div>
          </div>

          {leftSidebarState === "hidden" && (
            <button
              onClick={toggleLeftSidebar}
              className="bg-purple-100 border-y border-r p-3 hover:bg-purple-200 transition shadow-md"
              aria-label="Show slide preview"
            >
              <ChevronRight className="h-6 w-6 text-pink-700" />
            </button>
          )}

          <div className="flex-1 flex flex-col md:flex-row min-h-0">
            <div className="flex-1 flex flex-col min-h-0">
              <div
                className="p-4 bg-purple-100 border-b sticky z-20 shadow-sm"
                style={{ top: '72px' }}
              >
                <h2 className="text-2xl font-bold text-pink-700">Original Slides</h2>
              </div>
              <div
                id="original-slide-container"
                ref={originalContainerRef}
                className="flex-1 p-6 overflow-y-auto bg-purple-100 rounded-lg shadow-md"
              >
                <SlideViewer pages={pdfPages} currentPage={currentPage} pdfFile={pdfFile} />
              </div>
            </div>

            <div className="flex-1 flex flex-col border-t md:border-t-0 md:border-l min-h-0">
              <div
                className="p-4 bg-purple-100 border-b sticky z-20 shadow-sm"
                style={{ top: '72px' }}
              >
                <h2 className="text-2xl font-bold text-pink-700">Translated Slides</h2>
              </div>
              <div
                id="translated-slide-container"
                ref={translatedContainerRef}
                className="flex-1 p-6 overflow-y-auto bg-purple-100 rounded-lg shadow-md"
              >
                <TranslatedSlide
                  translatedPages={translatedPages}
                  currentPage={currentPage}
                  isLoading={isLoading}
                  targetLanguage={languages.find((l) => l.code === targetLanguage)?.name || ''}
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
        <div className="flex flex-col items-center justify-center flex-grow p-12 bg-purple-50 min-h-screen">
          <div className="text-center p-8 sm:p-12 md:p-16 border-2 border-pink-200 rounded-2xl bg-purple-100 shadow-2xl max-w-6xl w-full mx-4">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-pink-700 mb-6">
              Welcome to PDF Translator
            </h2>
            <p className="text-lg sm:text-xl text-pink-600 mb-8 font-medium">
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
                  className="w-full p-8 sm:p-10 bg-purple-100 border-2 border-dashed border-pink-300 rounded-xl shadow-sm"
                />
              </div>
            </div>
          </div>
          <UploadHistory uploadHistory={uploadHistory} />
        </div>

      )}

      {pdfFile && (
        <div className="fixed bottom-6 right-6 flex gap-3 md:hidden">
          <Button
            size="sm"
            variant="outline"
            className="rounded-full h-12 w-12 p-0 bg-purple-100 shadow-lg border-pink-300 hover:bg-purple-200 transition"
            onClick={toggleLeftSidebar}
          >
            <Grid className="h-6 w-6 text-pink-700" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="rounded-full h-12 w-12 p-0 bg-purple-100 shadow-lg border-pink-300 hover:bg-purple-200 transition"
            onClick={() => setIsChatVisible((prev) => !prev)}
          >
            <MessageSquare className="h-6 w-6 text-pink-700" />
          </Button>
        </div>
      )}
    </main>
  );
}