const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// types:
// String
// Number
// Date
// Buffer
// Boolean
// Mixed
// ObjectId
// Array
// Decimal128
// Map
// Schema

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,    
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = User = mongoose.model("user", UserSchema);

