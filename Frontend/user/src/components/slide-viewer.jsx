"use client"

import { useEffect, useRef, useState } from "react"

export default function SlideViewer({ pages, currentPage, pdfFile }) {
  const containerRef = useRef(null)
  const [scale, setScale] = useState(1.0)
  const [isLoading, setIsLoading] = useState(false)

  // Scroll to current page when it changes
  useEffect(() => {
    if (containerRef.current && pages && pages.length > 0) {
      const pageElements = containerRef.current.querySelectorAll(".pdf-page")
      if (pageElements && pageElements[currentPage]) {
        pageElements[currentPage].scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }
  }, [currentPage, pages])

  if (!pages || pages.length === 0) {
    return <div className="text-gray-500 italic">No slides available</div>
  }

  return (
    <div className="flex flex-col h-full">
      <div className="bg-purple-100 p-4 rounded mb-2 flex-grow flex flex-col">
        <div
          ref={containerRef}
          className="bg-white rounded shadow-sm flex-grow flex flex-col items-center overflow-auto relative"
        >
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 z-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}

          <div className="p-4 w-full">
            {pages.map((page, index) => (
              <div
                key={index}
                className={`pdf-page mb-8 p-4 ${currentPage === index ? "bg-blue-50 rounded-lg border border-blue-200" : ""}`}
                id={`original-page-${index}`}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Page {page.pageNumber}</h3>
                  {currentPage === index && (
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Current</span>
                  )}
                </div>

                <div className="flex justify-center">
                  {page.dataUrl ? (
                    <img
                      src={page.dataUrl || "/placeholder.svg"}
                      alt={`Page ${page.pageNumber}`}
                      style={{
                        width: page.width * scale,
                        height: page.height * scale,
                        maxWidth: "100%",
                      }}
                      className="border shadow-sm"
                    />
                  ) : (
                    <div
                      className="bg-gray-100 flex items-center justify-center"
                      style={{ width: "100%", height: "300px" }}
                    >
                      <span className="text-gray-400">Loading page {page.pageNumber}...</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">{pages.length} pages total</span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setScale((prev) => Math.max(0.5, prev - 0.1))}
            className="px-2 py-1 text-sm border rounded"
            disabled={scale <= 0.5}
          >
            -
          </button>
          <span className="text-sm">{Math.round(scale * 100)}%</span>
          <button
            onClick={() => setScale((prev) => Math.min(3, prev + 0.1))}
            className="px-2 py-1 text-sm border rounded"
            disabled={scale >= 3}
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}