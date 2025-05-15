const mongoose = require('mongoose');

// Định nghĩa Schema Gói đăng ký
const subscribeSchema = new mongoose.Schema({
    // Tham chiếu đến người dùng sở hữu mục lịch sử gói đăng ký này
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Giả định bạn có một model tên là 'User'
        required: true
    },
    // Chi tiết gói đăng ký
    packageName: {
        type: String,
        required: true,
        enum: ['1 Month', '3 Months', '6 Months', '1 Year'] // Các loại gói được phép
    },
    durationMonths: {
        type: Number,
        required: true,
        enum: [1, 3, 6, 12] // Thời lượng tương ứng tính bằng tháng
    },
    price: {
        type: Number,
        required: true,
        min: 0 // Giá phải không âm
    },
    // Thời gian đăng ký
    startDate: {
        type: Date,
        required: true,
        default: Date.now // Mặc định là ngày/giờ hiện tại khi tạo
    },
    endDate: {
        type: Date,
        required: true
    },
    // Tùy chọn: Chi tiết giao dịch
    transactionId: {
        type: String,
        // Có thể dùng để liên kết với giao dịch cổng thanh toán
    },
    // Tùy chọn: Trạng thái (ví dụ: 'active', 'expired', 'cancelled')
    status: {
        type: String,
        enum: ['active', 'expired', 'cancelled'],
        default: 'active'
    }

}, {
    timestamps: true // Tự động thêm các trường createdAt và updatedAt
});

// Tạo model từ schema
const Subscription = mongoose.model('Subscription', subscribeSchema);

module.exports = Subscription;