const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    totalAmount: Number,
    paidAmount: Number,
    dueAmount: Number,
    feeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Fee' },
    installments: [
        {
            installmentNumber: Number,
            amountPaid: Number,
            paymentDate: Date,
        },],
    isPaid: { type: Boolean, default: false },

});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;