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

export default function Home() {
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfPages, setPdfPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [translatedPages, setTranslatedPages] = useState([]);
  const [targetLanguage, setTargetLanguage] = useState("es");
  const [isLoading, setIsLoading] = useState(false);
  const [pdfLoaded, setPdfLoaded] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(true);
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

  // Toggle sidebar function to show and cycle states
  const toggleLeftSidebar = () => {
    setLeftSidebarState((current) => {
      if (current === "hidden") return "collapsed"; // Show sidebar with page numbers when hidden
      if (current === "collapsed") return "expanded"; // Expand to full preview
      return "collapsed"; // Collapse back to page numbers
    });
  };

  // Close sidebar function
  const closeLeftSidebar = () => setLeftSidebarState("hidden");

  // Function to analyze document structure and translate content
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
    <main className="flex flex-col min-h-screen bg-gradient-to-br from-pink-100 to-rose-200">
      <div className="p-4 border-b bg-white shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-extrabold text-pink-600 tracking-tight">
            PDF Translator
          </h1>

          <div className="flex items-center gap-4">
            <FileUploader
              setPdfFile={setPdfFile}
              setPdfPages={setPdfPages}
              setTranslatedPages={setTranslatedPages}
              setIsLoading={setIsLoading}
              pdfLoaded={pdfLoaded}
            />

            <div className="flex items-center gap-2">
              <label
                htmlFor="language"
                className="text-sm font-medium text-pink-700"
              >
                Translate to:
              </label>
              <select
                id="language"
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)}
                className="border border-pink-300 rounded-md px-2 py-1 text-sm bg-white text-pink-800 focus:ring-2 focus:ring-pink-400 transition"
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
                className="ml-2 bg-pink-500 hover:bg-pink-600 text-white rounded-md px-4 py-1 transition"
              >
                Translate
              </Button>
            </div>
          </div>
        </div>
      </div>

      {pdfFile ? (
        <div className="flex flex-1 h-[calc(100vh-100px)] relative">
          {/* Left Sidebar - Preview all slides */}
          <div
            className={`border-r bg-white shadow-sm transition-all duration-300 flex flex-col ${leftSidebarState === "hidden"
                ? "w-0 overflow-hidden"
                : leftSidebarState === "collapsed"
                  ? "w-14"
                  : "w-64"
              }`}
          >
            <div className="p-3 border-b flex items-center justify-between bg-pink-50">
              {leftSidebarState === "expanded" && (
                <>
                  <h2 className="text-lg font-bold text-pink-600">All Slides</h2>
                  <button
                    onClick={closeLeftSidebar}
                    className="text-pink-500 hover:text-pink-700 transition"
                    aria-label="Close sidebar"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </>
              )}
              {leftSidebarState === "collapsed" && (
                <div className="w-full flex justify-center">
                  <FileText className="h-5 w-5 text-pink-600" />
                </div>
              )}
            </div>
            <div
              className={`flex-1 overflow-auto ${leftSidebarState === "expanded" ? "p-3" : "p-2"
                }`}
            >
              {leftSidebarState === "collapsed" ? (
                <div className="flex flex-col items-center space-y-4 mt-2">
                  {/* Icon above page number 1 */}
                  {pdfPages.length > 0 && (
                    <button
                      onClick={toggleLeftSidebar}
                      className="w-10 h-10 rounded-md flex items-center justify-center text-xs font-medium transition bg-gray-100 text-pink-600 hover:bg-pink-50"
                      aria-label="Toggle sidebar"
                    >
                      <Grid className="h-5 w-5 text-pink-600" />
                    </button>
                  )}
                  {pdfPages.map((page, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        toggleLeftSidebar();
                        setCurrentPage(index);
                      }}
                      className={`w-10 h-10 rounded-md flex items-center justify-center text-xs font-medium transition ${currentPage === index
                          ? "bg-pink-100 text-pink-700 border border-pink-300"
                          : "bg-gray-100 text-pink-600 hover:bg-pink-50"
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
            <div className="p-2 border-t bg-pink-50 flex justify-center">
              <button
                onClick={toggleLeftSidebar}
                className="p-1 rounded-md hover:bg-pink-100 transition"
                aria-label={
                  leftSidebarState === "expanded"
                    ? "Collapse sidebar"
                    : "Expand sidebar"
                }
              >
                <PanelLeft
                  className={`h-5 w-5 text-pink-600 transition-transform ${leftSidebarState === "expanded" ? "rotate-180" : ""
                    }`}
                />
              </button>
            </div>
          </div>

          {/* Optional fallback button (can be removed if PanelLeft is sufficient) */}
          {leftSidebarState === "hidden" && (
            <button
              onClick={toggleLeftSidebar}
              className="bg-white border-y border-r p-2 hover:bg-pink-50 transition"
              aria-label="Show slide preview"
            >
              <ChevronRight className="h-5 w-5 text-pink-600" />
            </button>
          )}

          {/* Main Content - Original and Translated slides in parallel */}
          <div className="flex-1 flex flex-col md:flex-row">
            <div className="flex-1 flex flex-col">
              <div className="p-3 bg-pink-50 border-b mt-2">
                <h2 className="text-xl font-bold text-pink-600">
                  Original Slides
                </h2>
              </div>
              <div
                id="original-slide-container"
                ref={originalContainerRef}
                className="flex-1 p-4 overflow-auto bg-white rounded-md"
              >
                <SlideViewer
                  pages={pdfPages}
                  currentPage={currentPage}
                  pdfFile={pdfFile}
                />
              </div>
            </div>

            <div className="flex-1 flex flex-col border-l md:border-l">
              <div className="p-3 bg-pink-50 border-b mt-2">
                <h2 className="text-xl font-bold text-pink-600">
                  Translated Slides
                </h2>
              </div>
              <div
                id="translated-slide-container"
                ref={translatedContainerRef}
                className="flex-1 p-4 overflow-auto bg-white rounded-md"
              >
                <TranslatedSlide
                  translatedPages={translatedPages}
                  currentPage={currentPage}
                  isLoading={isLoading}
                  targetLanguage={
                    languages.find((l) => l.code === targetLanguage)?.name || ""
                  }
                  originalPages={pdfPages}
                />
              </div>
            </div>
          </div>

          {/* ChatBot */}
          <ChatBot
            pdfContent={pdfPages[currentPage]?.textContent || ""}
            isChatVisible={isChatVisible}
            setIsChatVisible={setIsChatVisible}
          />
        </div>
      ) : (
        <div className="flex items-center justify-center flex-grow p-8">
          <div className="text-center p-8 border rounded-lg bg-white shadow-md max-w-md">
            <h2 className="text-2xl font-bold text-pink-600 mb-2">
              Welcome to PDF Translator
            </h2>
            <p className="text-pink-600 mb-4">Upload a PDF file to get started</p>
            <div className="flex justify-center">
              <FileUploader
                setPdfFile={setPdfFile}
                setPdfPages={setPdfPages}
                setTranslatedPages={setTranslatedPages}
                setIsLoading={setIsLoading}
                pdfLoaded={pdfLoaded}
              />
            </div>
          </div>
        </div>
      )}

      {/* Floating sidebar toggle buttons for mobile */}
      {pdfFile && (
        <div className="fixed bottom-4 right-4 flex gap-2 md:hidden">
          <Button
            size="sm"
            variant="outline"
            className="rounded-full h-10 w-10 p-0 bg-white shadow-md border-pink-300 hover:bg-pink-50 transition"
            onClick={toggleLeftSidebar}
          >
            <Grid className="h-5 w-5 text-pink-600" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="rounded-full h-10 w-10 p-0 bg-white shadow-md border-pink-300 hover:bg-pink-50 transition"
            onClick={() => setIsChatVisible((prev) => !prev)}
          >
            <MessageSquare className="h-5 w-5 text-pink-600" />
          </Button>
        </div>
      )}
    </main>
  );
}