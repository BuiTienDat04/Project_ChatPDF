"use client";

import { useEffect, useRef, useState } from "react";

export default function SlideViewer({ pages, currentPage, pdfFile }) {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1.0);
  const [isLoading, setIsLoading] = useState(false);
  const [renderedPages, setRenderedPages] = useState([]);

  // Render PDF pages as images
  useEffect(() => {
    if (!pdfFile || !window.pdfjsLib) return;

    const renderPages = async () => {
      setIsLoading(true);
      try {
        const pdf = await window.pdfjsLib.getDocument(URL.createObjectURL(pdfFile)).promise;
        const newPages = [];

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 1.0 });
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.width = viewport.width;
          canvas.height = viewport.height;

          await page.render({ canvasContext: context, viewport }).promise;
          const dataUrl = canvas.toDataURL("image/png");

          newPages.push({
            pageNumber: i,
            dataUrl,
            width: viewport.width,
            height: viewport.height,
            textContent: pages[i - 1]?.textContent || "", // Retain textContent from Home
          });
        }

        setRenderedPages(newPages);
      } catch (error) {
        console.error("Error rendering PDF:", error);
      } finally {
        setIsLoading(false);
      }
    };

    renderPages();
  }, [pdfFile, pages]);

  // Scroll to current page when it changes
  useEffect(() => {
    if (containerRef.current && renderedPages.length > 0) {
      const pageElement = containerRef.current.querySelector(`#original-page-${currentPage}`);
      if (pageElement) {
        pageElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [currentPage, renderedPages]);

  if (!renderedPages.length && !isLoading) {
    return <div className="text-pink-600 italic">No slides available</div>;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="bg-purple-100 p-4 rounded-lg mb-2 flex-grow flex flex-col">
        <div
          ref={containerRef}
          className="bg-white rounded-lg shadow-md flex-grow flex flex-col items-center overflow-auto relative"
        >
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 z-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600"></div>
            </div>
          )}

          <div className="p-4 w-full">
            {renderedPages.map((page, index) => (
              <div
                key={index}
                className={`pdf-page mb-8 p-4 ${
                  currentPage === index ? "bg-purple-200 rounded-lg border border-pink-300" : ""
                }`}
                id={`original-page-${index}`}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-pink-700">Page {page.pageNumber}</h3>
                  {currentPage === index && (
                    <span className="text-xs bg-pink-100 text-pink-800 px-2 py-1 rounded">
                      Current
                    </span>
                  )}
                </div>

                <div className="flex justify-center">
                  {page.dataUrl ? (
                    <img
                      src={page.dataUrl}
                      alt={`Page ${page.pageNumber}`}
                      style={{
                        width: page.width * scale,
                        height: page.height * scale,
                        maxWidth: "100%",
                      }}
                      className="border border-pink-200 shadow-sm"
                    />
                  ) : (
                    <div
                      className="bg-purple-100 flex items-center justify-center"
                      style={{ width: "100%", height: "300px" }}
                    >
                      <span className="text-pink-600">Loading page {page.pageNumber}...</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-sm text-pink-600">{renderedPages.length} pages total</span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setScale((prev) => Math.max(0.5, prev - 0.1))}
            className="px-2 py-1 text-sm border border-pink-300 rounded-lg bg-purple-100 text-pink-700 hover:bg-purple-200 disabled:opacity-50"
            disabled={scale <= 0.5}
            aria-label="Zoom out"
          >
            -
          </button>
          <span className="text-sm text-pink-700">{Math.round(scale * 100)}%</span>
          <button
            onClick={() => setScale((prev) => Math.min(3, prev + 0.1))}
            className="px-2 py-1 text-sm border border-pink-300 rounded-lg bg-purple-100 text-pink-700 hover:bg-purple-200 disabled:opacity-50"
            disabled={scale >= 3}
            aria-label="Zoom in"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}