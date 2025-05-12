import React, { useState, useEffect } from 'react';
import { FileText, FilePen, BarChart, Upload, ChevronUp } from 'lucide-react';
import UpfilePDF from './UpfilePDF';
import { API_BASE_URL } from '../api/api';

export default function ChatPDFPage({ setCurrentUser }) {

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/user`, {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const user = await response.json();
          if (setCurrentUser) {
            setCurrentUser(user);
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            localStorage.setItem('_id', user._id);
            localStorage.setItem('isAdmin', user.isAdmin);
            localStorage.setItem('userId', user._id);
            if (user.token) {
                 localStorage.setItem('token', user.token);
            } else {
                 localStorage.removeItem('token');
            }
          }
        } else {
          console.warn('Failed to fetch current user after redirect or on page load.');
          if (setCurrentUser) {
             setCurrentUser(null);
          }
        }
      } catch (error) {
        console.error('Error fetching current user:', error);
         if (setCurrentUser) {
             setCurrentUser(null);
         }
      }
    };

    fetchCurrentUser();

  }, [setCurrentUser]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white text-black font-sans">

      <section className="text-center py-12 mt-20">
        <h1 className="text-4xl font-bold">
          ChatPDF: Trò chuyện với <span className="bg-pink-300 px-2 rounded">nhiều PDF</span> trực tuyến
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Biến bất kỳ tài liệu nào thành một cuộc trò chuyện AI tương tác. Phân tích, tóm tắt và tương tác với bất kỳ PDF, bài thuyết trình và tài liệu nào chỉ trong vài giây.
        </p>
      </section>

      <UpfilePDF />

      <div className="fixed bottom-4 right-4">
        <button className="bg-purple-100 p-2 rounded-full shadow">
          <ChevronUp className="text-purple-700" />
        </button>
      </div>
    </div>
  );
}
