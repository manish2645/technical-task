const mongoose = require('mongoose');
const Shema = mongoose.Schema
const bcrypt = require('bcrypt');   

const UserScheme = new Shema({ 
    name:{
        type: String,
        required: true,
        unique: false,
    },
    email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
    password: {
            type: String,
            required: true,
            minlength: 6,
        }
})

UserScheme.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(this.password, salt)
        this.password = hashPassword
        next()
    }
    catch (err) {
        next(err)
    }
})

UserScheme.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password)
    } catch (error) {
        throw error   
    }
}

// UserScheme.post('save', async function (next) {
//     try {
//         console.log('Called after saving a user');
//     }
//     catch (err) {
//         next(err)
//     }
// })

const User = mongoose.model('user', UserScheme)
module.exports = User
