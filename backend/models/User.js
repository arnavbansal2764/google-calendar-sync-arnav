const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    googleId: { type: String, required: true, unique: true },
    accessToken: { type: String, required: true },
});

module.exports = mongoose.model('User', UserSchema);
