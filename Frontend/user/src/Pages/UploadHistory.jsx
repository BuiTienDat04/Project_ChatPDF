
"use client";

import { useState, useEffect } from "react";
import { FileText, Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { motion } from "framer-motion";

export default function UploadHistory({ onSelectFile }) {
  const [uploadHistory, setUploadHistory] = useState([]);

  // Load history from localStorage
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem("uploadHistory");
      if (savedHistory) {
        const parsedHistory = JSON.parse(savedHistory);
        if (Array.isArray(parsedHistory)) {
          setUploadHistory(parsedHistory);
        } else {
          console.warn("Invalid history format in localStorage. Resetting.");
          setUploadHistory([]);
          localStorage.setItem("uploadHistory", JSON.stringify([]));
        }
      }
    } catch (error) {
      console.error("Error loading upload history:", error);
      setUploadHistory([]);
      localStorage.setItem("uploadHistory", JSON.stringify([]));
    }
  }, []);

  // Save history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("uploadHistory", JSON.stringify(uploadHistory));
    } catch (error) {
      console.error("Error saving upload history:", error);
    }
  }, [uploadHistory]);

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Format date
  const formatDate = (isoString) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleString("vi-VN", {
        dateStyle: "short",
        timeStyle: "short",
      });
    } catch (error) {
      return "N/A";
    }
  };

  // Handle file selection
  const handleSelectFile = (file) => {
    onSelectFile(file);
  };

  // Handle file deletion
  const handleDeleteFile = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa tệp này khỏi lịch sử?")) {
      setUploadHistory((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8 border-2 border-pink-200">
        <h2 className="text-4xl font-extrabold text-pink-700 mb-6 text-center animate-pulse">
          Lịch sử tệp đã tải lên
        </h2>
        {uploadHistory.length === 0 ? (
          <p className="text-center text-lg text-pink-600 font-medium">
            Chưa có tệp nào được tải lên.
          </p>
        ) : (
          <div className="max-h-[60vh] overflow-auto custom-scrollbar">
            {uploadHistory.map((item, index) => (
              <motion.div
                key={item.id}
                className="flex justify-between items-center p-4 mb-4 bg-pink-50 rounded-xl border border-pink-200 hover:bg-pink-100 cursor-pointer transition-all duration-200 hover:shadow-md"
                onClick={() => handleSelectFile(item.file)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="flex items-center gap-4">
                  <FileText className="h-6 w-6 text-pink-600" />
                  <div>
                    <span className="text-sm font-medium text-pink-800 truncate max-w-xs">
                      {item.name}
                    </span>
                    <div className="text-xs text-pink-600">
                      <span>{formatDate(item.timestamp)}</span> |{" "}
                      <span>{formatFileSize(item.size)}</span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteFile(item.id);
                  }}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </motion.div>
            ))}
          </div>
        )}
        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f5f5f5;
            border-radius: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #f472b6;
            border-radius: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #ec4899;
          }
        `}</style>
      </div>
    </div>
  );
}