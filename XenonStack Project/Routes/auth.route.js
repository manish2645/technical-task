const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const User = require('../Models/User.model');
const { authSchema, generateUser } = require('../Helpers/validation_schema');
const { signAccessToken } = require('../Helpers/jwt_helper');
const { Contact } = require('../Models/contact_us');

router.post('/register', async (req, res, next) => {
    try {
        //const {email, password} = req.body;
        //if(!email || !password) throw createError.BadRequest();
        console.log(req.body)
        const result = await generateUser.validateAsync(req.body)

        const doesExist = await User.findOne({ email: result.email });
        if (doesExist)
            throw createError.Conflict(`${result.email} already been registered`);

        const user = new User(result);
        const savedUser = await user.save();
        const accesToken = await signAccessToken(savedUser.id);

        res.send({ accesToken });


    }
    catch (e) {
        if (e.isJoi === true) e.status = 422
        next(e);
    }
})

router.post('/login', async (req, res, next) => {
    try {
        const result = await authSchema.validateAsync(req.body);
        const user = await User.findOne({ email: result.email });
        if (!user) throw createError.NotFound("User not found");
        const isMatch = await user.isValidPassword(result.password);
        if (!isMatch) throw createError.Unauthorized('Username/password not valid');

        const accesToken = await signAccessToken(user.id);
        res.send({ accesToken });

    } catch (error) {
        if (error.isJoi === true) return next(createError.BadRequest("Invalid Username/Passwords"));
        next(error);
    }

})

router.post('/refresh-token', async (req, res, next) => {
    res.send('refresh token route')
})

router.delete('/logout', async (req, res, next) => {
    res.send('logout route')
})

router.post('/contact-us', async (req, res, next) => {
    try {
        const data = await Contact.create(req.body);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error);
    }
})






module.exports = router