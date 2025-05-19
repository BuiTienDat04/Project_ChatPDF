"use client"

import { useState } from "react"
import { Upload, FileText } from "lucide-react"

// Enhanced function to extract text and render PDF pages using PDF.js
const extractPDFContent = async (file, pdfjsLib) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Read the file as ArrayBuffer
      const arrayBuffer = await file.arrayBuffer()

      // Load the PDF document
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer })
      const pdf = await loadingTask.promise

      const totalPages = pdf.numPages
      const pages = []

      // Process each page
      for (let i = 1; i <= totalPages; i++) {
        const page = await pdf.getPage(i)

        // Get page dimensions
        const viewport = page.getViewport({ scale: 1.0 })

        // Extract text content
        const textContent = await page.getTextContent()
        const textItems = textContent.items.map((item) => item.str).join(" ")

        // Create a canvas for rendering the page
        const canvas = document.createElement("canvas")
        const context = canvas.getContext("2d")
        canvas.height = viewport.height
        canvas.width = viewport.width

        // Render the page to canvas
        await page.render({
          canvasContext: context,
          viewport: viewport,
        }).promise

        // Convert canvas to data URL
        const dataUrl = canvas.toDataURL("image/png")

        // Extract images (simplified mock implementation)
        // In a real implementation, you would extract actual images from the PDF
        const images = []
        if (textContent.items.length > 0) {
          // Just using the page render as an "image" for demonstration
          images.push(dataUrl)
        }

        pages.push({
          pageNumber: i,
          textContent: textItems,
          width: viewport.width,
          height: viewport.height,
          dataUrl: dataUrl,
          images: images,
          // Additional structure information would be extracted here in a real implementation
          structures: {
            paragraphs: [],
            tables: [],
            lists: [],
            figures: [],
          },
        })
      }

      resolve(pages)
    } catch (error) {
      console.error("Error processing PDF:", error)
      reject(error)
    }
  })
}

export default function FileUploader({ setPdfFile, setPdfPages, setTranslatedPages, setIsLoading, pdfLoaded }) {
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e) => {
    e.preventDefault()

    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = async (file) => {
    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file")
      return
    }

    setPdfFile(file)
    setTranslatedPages([])
    setIsLoading(true)

    try {
      if (pdfLoaded && window.pdfjsLib) {
        const pages = await extractPDFContent(file, window.pdfjsLib)
        setPdfPages(pages)
      } else {
        console.error("PDF.js not loaded yet")
        alert("PDF.js library is still loading. Please try again in a moment.")
      }
    } catch (error) {
      console.error("Error parsing PDF:", error)
      alert("Error parsing PDF file")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className={`relative border-2 border-dashed rounded-lg p-2 flex items-center justify-center ${
        dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      style={{ minWidth: "200px" }}
    >
      <input type="file" id="file-upload" className="hidden" accept=".pdf" onChange={handleChange} />
      <label htmlFor="file-upload" className="flex items-center justify-center cursor-pointer w-full">
        <div className="flex items-center">
          {dragActive ? (
            <Upload className="h-5 w-5 text-blue-500 mr-2" />
          ) : (
            <FileText className="h-5 w-5 text-gray-400 mr-2" />
          )}
          <span className="text-sm">{dragActive ? "Drop PDF here" : "Upload PDF"}</span>
        </div>
      </label>
    </div>
  )
}
