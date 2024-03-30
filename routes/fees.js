const express = require('express');
const Feerouter = express.Router();
const Fee=require('../model/fees');

Feerouter.get('/', async (req, res) => {
    try {
        const fees = await Fee.find();
        res.json(fees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a specific fee
Feerouter.get('/:id', getFee, (req, res) => {
    res.json(res.fee);
});

// POST a new fee
Feerouter.post('/', async (req, res) => {
    const fee = new Fee({
        className: req.body.className,
        feeType: req.body.feeType,
        description: req.body.description,
        amount: req.body.amount,
        isPaid: req.body.isPaid
    });

    try {
        const newFee = await fee.save();
        res.status(201).json(newFee);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT update a fee
Feerouter.put('/:id', getFee, async (req, res) => {
    try {
        Object.assign(res.fee, req.body);
        const updatedFee = await res.fee.save();
        res.json(updatedFee);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a fee
Feerouter.delete('/:id', getFee, async (req, res) => {
    try {
        await res.fee.remove();
        res.json({ message: 'Deleted fee' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getFee(req, res, next) {
    let fee;
    try {
        fee = await Fee.findById(req.params.id);
        if (fee == null) {
            return res.status(404).json({ message: 'Fee not found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.fee = fee;
    next();
}

module.exports = Feerouter;
