const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');


module.exports.signUp = async (req, res) => {
    const {email, password} = req.body
    console.log(req.body);
    try{
        const user = await UserModel.create({
            email: email,
            password: password
        });
        res.status(200).send({user: user._id});
    }catch(err){
        res.status(401).send({err});
    }
}

module.exports.login = async (req,res) => {
    const {email, password} = req.body
    try{
        // Appel de le fonction login du schema
        const userData = await UserModel.login(email, password);
        return res.status(200).send({userId: userData.id,
                            token: jwt.sign(
                                {userId : userData.id},
                                process.env.TOKEN_SECRET,
                                { expiresIn: '24h' }
                            )
        });
    }catch(err){
        return res.status(500).send({err});
    }
}


module.exports.logout = (req, res) => {
    res.clearCookie("jwt");
    res.redirect("/");
}