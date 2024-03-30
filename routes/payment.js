const express = require('express');
const Paymentrouter = express.Router();
const Payment = require('../model/payment'); 
const Fee = require('../model/fees');
const Student=require('../model/students');
// GET all payments
Paymentrouter.get('/', async (req, res) => {
    try {
        const payments = await Payment.find().populate('studentId').populate('feeId');
        res.json(payments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a specific payment by ID
Paymentrouter.get('/', async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);
        if (payment === null) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.json(payment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// CREATE a new payment
Paymentrouter.post('/', async (req, res) => {
    console.log(req.body.username);

    const student = await Student.findOne({ username: req.body.username });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

    const fees = await Fee.findOne({feeType:req.body.feeType,className:req.body.className});
    const fee = await Fee.findById(fees._id);
        if (!fee) {
            return res.status(404).json({ message: 'Fee collection not found' });
        }

        const existingPayment = await Payment.findOne({ studentId: student._id, feeId: fee._id });
        if (existingPayment) {
            return res.status(400).json({ message: 'Payment already exists' });
        }
        

        const paidAmount = parseFloat(req.body.paidAmount); // Ensure it's a valid number
        if (isNaN(paidAmount)) {
            return res.status(400).json({ message: 'Invalid paidAmount value' });
        }

        const totalAmount = parseFloat(fee.amount); // Ensure it's a valid number
        if (isNaN(totalAmount)) {
            return res.status(400).json({ message: 'Invalid totalAmount value in Fee collection' });
        }
        

        const dueAmount = totalAmount - paidAmount;
    const payment = new Payment({
        studentId:student._id,
        totalAmount: totalAmount,
        paidAmount: paidAmount,
        dueAmount: dueAmount,
        feeId: fee._id,
        isPaid: dueAmount === 0,
    });

    try {
        const newPayment = await payment.save();

        if (dueAmount > 0) {
            // Find the highest installment number
            const highestInstallmentNumber = newPayment.installments.reduce(
                (max, installment) => Math.max(max, installment.installmentNumber),
                0
            );

            const nextInstallmentNumber = highestInstallmentNumber + 1;

            const installment = {
                installmentNumber: nextInstallmentNumber,
                amountPaid: paidAmount,
                paymentDate: new Date(),
            };

            newPayment.installments.push(installment);
            newPayment.isPaid = false; // Update isPaid since it's not fully paid
            await newPayment.save();
        }
        res.status(201).json(newPayment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Add a new installment to an existing payment
Paymentrouter.post('/:installment', async (req, res) => {
    try {
        const student = await Student.findOne({ username: req.body.username });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        
        const fee = await Fee.findOne({feeType:req.body.feeType,className:req.body.className});
        if (!fee._id) {
            return res.status(404).json({ message: 'Fee collection not found' });
        }
        const payment = await Payment.findOne({studentId:student._id,feeId:fee._id});

        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }


        const installmentAmount = parseFloat(req.body.amountPaid);
        if (isNaN(installmentAmount)) {
            return res.status(400).json({ message: 'Invalid amountPaid value' });
        }

        // Calculate the new due amount
        const newDueAmount = payment.dueAmount - installmentAmount;

        // Create a new installment
        const newInstallment = {
            installmentNumber: payment.installments.length + 1,
            amountPaid: installmentAmount,
            paymentDate: req.body.paymentDate || new Date(),
        };

        // Update payment details
        payment.installments.push(newInstallment);
        payment.paidAmount += installmentAmount;
        payment.dueAmount = newDueAmount;
        payment.isPaid = newDueAmount === 0;

        // Save the updated payment
        const updatedPayment = await payment.save();

        res.status(201).json(updatedPayment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// UPDATE a payment by ID
Paymentrouter.patch('/', async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);

        if (payment === null) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        if (req.body.isPaid !== undefined) {
            // Update isPaid only if it is provided in the request
            payment.isPaid = req.body.isPaid;
        }

        // Check if dueAmount is zero and update isPaid accordingly
        if (payment.dueAmount === 0) {
            payment.isPaid = true;
        }

        const updatedPayment = await payment.save();
        res.json(updatedPayment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a payment by ID
Paymentrouter.delete('/', async (req, res) => {
    try {
        const payment = await Payment.deleteOne(req.params.id);
       
        res.json({ message: 'Payment deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Export the router
module.exports = Paymentrouter;