import React from 'react';
import { FileText, FilePen, BarChart, Upload, ChevronUp } from 'lucide-react';
import UpfilePDF from './UpfilePDF';
import Navigation from './Navigation';

export default function ChatPDFPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white text-black font-sans">
      <Navigation/>

      {/* Title & Description */}
      <section className="text-center py-12 mt-20">
        <h1 className="text-4xl font-bold">
          ChatPDF: Trò chuyện với <span className="bg-pink-300 px-2 rounded">nhiều PDF</span> trực tuyến
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Biến bất kỳ tài liệu nào thành một cuộc trò chuyện AI tương tác. Phân tích, tóm tắt và tương tác với bất kỳ PDF, bài thuyết trình và tài liệu nào chỉ trong vài giây.
        </p>
      </section>

      {/* Upload Box */}
      <UpfilePDF />

      {/* Scroll Up Button */}
      <div className="fixed bottom-4 right-4">
        <button className="bg-purple-100 p-2 rounded-full shadow">
          <ChevronUp className="text-purple-700" />
        </button>
      </div>
    </div>
  );
}
