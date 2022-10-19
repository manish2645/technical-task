const JWT = require('jsonwebtoken');
const createError = require('http-errors');
const { use } = require('../Routes/auth.route');



module.exports = {
    signAccessToken: (userId) => {
        return new Promise((resolve, reject) => {
            const payload ={
                
            }
            const secret = "7eed9606a0042ce5d231866c6fff0017c2567827bea7eb30af90e59ca3c606c7"
            const options = {
                expiresIn : '1h',
                issuer: 'pickurpage.com',
                audience: userId,
            }
            JWT.sign(payload, secret, options, (err, token) => {
                if (err){
                    console.log(err.message)
                    reject(createError.InternalServerError())
                }
                resolve(token)
            })
        })
    },

    verifyAccessToken: (req, res, next) => {
        if(req.headers['authorization']) return next(createError.Unauthorized())
        const authHeader = req.headers['authorization']
        const bearerToken = authHeader.split(' ')
        const token = bearerToken[1]
        const secret = "7eed9606a0042ce5d231866c6fff0017c2567827bea7eb30af90e59ca3c606c7"
        JWT.verify(token, secret, (err, payload) => {
            if(err) return next(createError.Unauthorized())
            req.payload = payload
            next()
        })
    },
}