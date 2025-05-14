// api.js (Đã sửa)
import axios from 'axios'; 

export const API_BASE_URL = 'http://localhost:8080'; 

// Cấu hình Axios mặc định
axios.defaults.baseURL = API_BASE_URL; // Tùy chọn: Đặt baseURL cho tiện
axios.defaults.withCredentials = true; // **THÊM DÒNG CỰC KỲ QUAN TRỌNG NÀY**

// Export API_BASE_URL hoặc instance của axios nếu bạn cần
export const api = axios; // Tùy chọn: export instance đã cấu hình
// Hoặc chỉ cần export API_BASE_URL nếu bạn dùng axios trực tiếp trong component
// export const API_BASE_URL = 'http://localhost:8080'; // Giữ nguyên dòng này nếu bạn không export instance