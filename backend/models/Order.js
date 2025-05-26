const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'clients',
            required: true
        },
        orderType: String,
        academicLevel: String,
        writingLevel: String,
        course: String,
        service: String,
        spacing: String,
        title: String,
        description: String,
        deadline: Date,
        price: Number,
        fileUrl: String,
        status: {
            type: String,
            default: 'pending',
            enum: ['pending', 'in-progress', 'completed', 'rejected']
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);
