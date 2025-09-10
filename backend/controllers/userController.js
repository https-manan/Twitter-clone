const User = require('../models/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const cookie = require('cookie-parser')
const register = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;

        if (!name || !username || !email || !password) {
            return res.status(400).json({
                msg: 'All credentials are required.'
            });
        }

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({
                msg: 'User already exists.'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            username,
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            msg: 'User registered successfully.',
            user: {
                id: newUser._id,
                name: newUser.name,
                username: newUser.username,
                email: newUser.email
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server error' });
    }
};




const login = async (req,res)=>{
    try {
    const {username,password} = req.body;
    if(!username||!password){
        return res.status(400).json({
            msg:"Send all data"
        });
    };
    const userExist = await User.findOne({username});
    if(!userExist){
        return res.json({
            msg:'User not exists SignUp'
        })
    };
    const pass = await bcrypt.compare(password,userExist.password);
    const token = jwt.sign({id:userExist._id},process.env.JWT_SECRET,{expiresIn:'1d'});
    res.cookie("token", token, {
        httpOnly: true,   
        secure: true,     
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000 
    });

    if(pass){
        res.status(200).json({
            Message:'Login in successfully',
            token:token,
            id:userExist._id,
            User:{
                name:userExist.name,
                email:userExist.email,
            }
        })
    }
    } catch (error) {
        console.log(error)
    }
}


const logout = async (req, res) => {
  res.clearCookie("token");
  return res.json({ msg: "Logout successfully" });
};





module.exports = { register,login,logout };
