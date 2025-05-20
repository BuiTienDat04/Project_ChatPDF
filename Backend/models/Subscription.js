const mongoose = require('mongoose');

const subscribeSchema = new mongoose.Schema({
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    
    packageName: {
        type: String,
        required: true,
        enum: ['1 Month', '3 Months', '6 Months', '1 Year'] 
    },
    durationMonths: {
        type: Number,
        required: true,
        enum: [1, 3, 6, 12] 
    },
    price: {
        type: Number,
        required: true,
        min: 0 
    },
    
    startDate: {
        type: Date,
        required: true,
        default: Date.now 
    },
    endDate: {
        type: Date,
        required: true
    },
    
    transactionId: {
        type: String,
    },

    status: {
        type: String,
        enum: ['active', 'expired', 'cancelled'],
        default: 'active'
    }

}, {
    timestamps: true 
});

const Subscription = mongoose.model('Subscription', subscribeSchema);

module.exports = Subscription;