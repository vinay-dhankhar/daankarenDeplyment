const mongoose = require('mongoose');

const OtpModelSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true // Ensures uniqueness of email field
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 5 * 60,
    },
});

module.exports = mongoose.model('OtpModel', OtpModelSchema);
