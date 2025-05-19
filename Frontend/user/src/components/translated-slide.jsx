"use client"

import { useEffect, useRef, useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs"

export default function TranslatedSlide({ translatedPages, currentPage, isLoading, targetLanguage, originalPages }) {
  const containerRef = useRef(null)
  const [viewMode, setViewMode] = useState("formatted") // "formatted" or "text-only"

  // Scroll to current page when it changes
  useEffect(() => {
    if (containerRef.current && translatedPages && translatedPages.length > 0) {
      const pageElements = containerRef.current.querySelectorAll(".translated-page")
      if (pageElements && pageElements[currentPage]) {
        pageElements[currentPage].scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }
  }, [currentPage, translatedPages])

  // Synchronize scrolling with original slide viewer
  useEffect(() => {
    const handleOriginalScroll = () => {
      const originalContainer = document.querySelector("#original-slide-container")
      const translatedContainer = containerRef.current

      if (originalContainer && translatedContainer) {
        // Calculate scroll percentage
        const scrollPercentage =
          originalContainer.scrollTop / (originalContainer.scrollHeight - originalContainer.clientHeight)

        // Apply the same scroll percentage to translated container
        translatedContainer.scrollTop =
          scrollPercentage * (translatedContainer.scrollHeight - translatedContainer.clientHeight)
      }
    }

    const originalContainer = document.querySelector("#original-slide-container")
    if (originalContainer) {
      originalContainer.addEventListener("scroll", handleOriginalScroll)
    }

    return () => {
      if (originalContainer) {
        originalContainer.removeEventListener("scroll", handleOriginalScroll)
      }
    }
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <p className="mt-4 text-sm text-gray-500">Translating to {targetLanguage}...</p>
        </div>
      </div>
    )
  }

  if (!translatedPages || translatedPages.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 italic">
        Click "Translate" to see the translated content
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div className="bg-gray-100 p-4 rounded h-full">
        <div className="mb-4 flex justify-end">
          <Tabs defaultValue="formatted" className="w-[300px]" onValueChange={setViewMode} value={viewMode}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="formatted">Formatted View</TabsTrigger>
              <TabsTrigger value="text-only">Text Only</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div ref={containerRef} className="bg-white h-full p-4 rounded shadow-sm overflow-auto">
          {translatedPages.map((content, index) => {
            const originalPage = originalPages && originalPages[index]
            return (
              <div
                key={index}
                className={`translated-page mb-8 p-4 ${
                  currentPage === index ? "bg-blue-50 rounded-lg border border-blue-200" : ""
                }`}
                id={`translated-page-${index}`}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Page {index + 1}</h3>
                  {currentPage === index && (
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Current</span>
                  )}
                </div>

                {viewMode === "formatted" ? (
                  <div className="formatted-translation">
                    {/* Formatted view with structure preservation */}
                    <div className="relative">
                      {/* Original PDF as background */}
                      {originalPage && originalPage.dataUrl && (
                        <div className="absolute inset-0 opacity-10 pointer-events-none">
                          <img
                            src={originalPage.dataUrl || "/placeholder.svg"}
                            alt=""
                            className="w-full h-full object-contain"
                          />
                        </div>
                      )}

                      {/* Translated content with preserved structure */}
                      <div className="relative z-10 p-4">{renderStructuredContent(content, originalPage)}</div>
                    </div>
                  </div>
                ) : (
                  <div className="text-only-translation">
                    {/* Simple text-only view */}
                    <div className="bg-white p-4 border rounded">
                      <h4 className="text-sm font-medium mb-2 text-blue-600">Translated Content ({targetLanguage}):</h4>
                      <div className="text-sm text-gray-700 whitespace-pre-wrap">{content.text}</div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// Helper function to render structured content
function renderStructuredContent(content, originalPage) {
  // If content is not structured yet, return simple text
  if (typeof content === "string") {
    return <div className="whitespace-pre-wrap">{content}</div>
  }

  return (
    <div>
      {/* Render headings */}
      {content.title && <h1 className="text-xl font-bold mb-4">{content.title}</h1>}

      {/* Render paragraphs */}
      {content.paragraphs &&
        content.paragraphs.map((para, idx) => (
          <p key={idx} className="mb-3">
            {para}
          </p>
        ))}

      {/* Render tables */}
      {content.tables &&
        content.tables.map((table, tableIdx) => (
          <div key={tableIdx} className="my-4 overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              {table.caption && <caption className="text-sm font-medium p-2 text-gray-700">{table.caption}</caption>}
              {table.header && (
                <thead>
                  <tr className="bg-gray-100">
                    {table.header.map((cell, cellIdx) => (
                      <th key={cellIdx} className="border border-gray-300 px-4 py-2 text-left">
                        {cell}
                      </th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody>
                {table.rows.map((row, rowIdx) => (
                  <tr key={rowIdx} className={rowIdx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    {row.map((cell, cellIdx) => (
                      <td key={cellIdx} className="border border-gray-300 px-4 py-2">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}

      {/* Render lists */}
      {content.lists &&
        content.lists.map((list, listIdx) => (
          <div key={listIdx} className="my-3">
            {list.type === "ordered" ? (
              <ol className="list-decimal pl-5">
                {list.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="mb-1">
                    {item}
                  </li>
                ))}
              </ol>
            ) : (
              <ul className="list-disc pl-5">
                {list.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="mb-1">
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}

      {/* Render figures/images */}
      {content.figures &&
        content.figures.map((figure, figIdx) => (
          <figure key={figIdx} className="my-4 flex flex-col items-center">
            <div className="border p-2 bg-gray-50 rounded">
              {/* Use original image from PDF */}
              {figure.imageIndex !== undefined &&
                originalPage &&
                originalPage.images &&
                originalPage.images[figure.imageIndex] && (
                  <img
                    src={originalPage.images[figure.imageIndex] || "/placeholder.svg"}
                    alt={figure.caption || `Figure ${figIdx + 1}`}
                    className="max-w-full max-h-[300px] object-contain"
                  />
                )}
            </div>
            {figure.caption && (
              <figcaption className="text-sm text-center mt-2 text-gray-600">
                <span className="font-medium">Figure {figIdx + 1}:</span> {figure.caption}
              </figcaption>
            )}
          </figure>
        ))}
    </div>
  )
}
