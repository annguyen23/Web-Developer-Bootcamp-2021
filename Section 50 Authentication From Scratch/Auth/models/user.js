const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username cannot be blank']
    },
    password: {
        type: String,
        required: [true, 'Password cannot be blank']
    }
})

userSchema.statics.findAndValidate = async function (username, password) {
    const foundUser = await this.findOne({ username });
    if (!foundUser) return false;
    const valid = await bcrypt.compare(password, foundUser.password);
    return valid ? foundUser : false;
}

userSchema.pre('save', function (next) {
    if (!this.isModified('password')) return next();
    this.password = bcrypt.hash(this.password, 12);
    next();
})

module.exports = mongoose.model('User', userSchema);