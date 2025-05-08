import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatPDFPage from "./Pages/ChatPDFPage";
import UpfilePDF from "./Pages/UpfilePDF";
import Navigation from "./Pages/Navigation";
import TranslatePDF from "./Pages/TranslatePDF"
import LoginPage from "./Pages/LoginPage"
import RegisterPage from "./Pages/RegisterPage"
export default function App() {
  return (
    // BrowserRouter enables client-side routing
    <BrowserRouter>
      {/* Routes is a container for defining routes */}
      <Routes>
        <Route path="/" element={<ChatPDFPage />} />
        <Route path="upfilepdf" element={<UpfilePDF />} />
        <Route path="navigation" element={<Navigation />} />
        <Route path="/translatepdf" element={<TranslatePDF />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        

      </Routes>
    </BrowserRouter>
  );
}

// Get the root element from the HTML
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component into the root
root.render(<App />);
