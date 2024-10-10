const mongoose = require('mongoose');

let CounterSchema = new mongoose.Schema(
    {
        _id: String,
        sequence_value: Number
    }
)

module.exports = mongoose.model('Counter', CounterSchema)