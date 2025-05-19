"use client"

export default function SlidePreview({ pages, currentPage, setCurrentPage }) {
  if (!pages || pages.length === 0) {
    return <div className="text-gray-500 italic">No slides available</div>
  }

  return (
    <div className="flex flex-col gap-3">
      {pages.map((page, index) => (
        <div
          key={index}
          className={`border rounded p-2 cursor-pointer transition-all ${
            currentPage === index ? "border-blue-500 bg-blue-50 shadow-sm" : "border-gray-200 hover:border-gray-300"
          }`}
          onClick={() => setCurrentPage(index)}
        >
          {page.dataUrl ? (
            <div className="aspect-[4/3] flex items-center justify-center mb-1 overflow-hidden">
              <img
                src={page.dataUrl || "/placeholder.svg"}
                alt={`Slide ${page.pageNumber}`}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ) : (
            <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center mb-1">
              <span className="text-gray-400 text-xs">Slide {page.pageNumber}</span>
            </div>
          )}
          <p className="text-xs truncate">
            {page.textContent ? page.textContent.substring(0, 30) + "..." : `Slide ${page.pageNumber}`}
          </p>
        </div>
      ))}
    </div>
  )
}
