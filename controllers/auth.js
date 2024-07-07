const { User } = require('../db/database');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    const userData = req.body;


    try{
        const newUser = await User.create({
            email: userData.email,
            password: userData.password
        });

        const token = jwt.sign({id: newUser._id, email: newUser.email}, 'jwt_secret_key');

        return res.status(200).cookie('access-token', token, {
            httpOnly: true
        }).send({
            success: true,
            message: 'SignUp Successfully',
        });
    }
    catch (e) {
        return res.send({
            success: false,
            message: 'Email Already Exists'
        });
    }
}

const login = async (req, res) =>{
    const userData = req.body;

    try {
        const findUser = await User.findOne(userData);

        const token = jwt.sign({id: findUser._id, email: findUser.email}, 'jwt_secret_key');

        return res.status(200).cookie('access-token', token,{
            httpOnly: true,
        }).send({
            success: true,
            message: 'Login Successful'
        });
    }
    catch (e) {
        return res.send({
            success: false,
            message: 'Invalid Email and Password'
        });
    }
}

const logout = (req, res) => {
    return res.status(200).clearCookie('access-token').send({
        success: true,
        message: 'Successfully Logout'
    })
}

module.exports = {
    signup,
    login,
    logout
}