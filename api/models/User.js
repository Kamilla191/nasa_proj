const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        require: true,
        min: 3,
        max: 20,
        unique: true,
    },
    email: {
        type: String,
        require: true,
        max: 50,
        unique: true,
    },
    password: {
        type: String,
        require: true,
        min: 6,
    },
    phone: {
        type: String,
    },
    fio: {
        type: String
    },
    birth_dt: {
        type: Date
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("User", userSchema);