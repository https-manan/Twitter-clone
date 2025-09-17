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
                msg:"userName and password required"
            });
        };
        
        const userExist = await User.findOne({username});
        if(!userExist){
            return res.status(404).json({
                msg:'User not exists. SignUp first'
            })
        };
        
        const pass = await bcrypt.compare(password,userExist.password);
        
        if(pass){
            const token = jwt.sign({id:userExist._id},process.env.JWT_SECRET,{expiresIn:'1d'});
            res.cookie("token", token, {
                httpOnly: true,   
                maxAge: 24 * 60 * 60 * 1000,
                sameSite: 'lax',
                secure: false
            });
            
            res.status(200).json({
                Message:'Login in successfully',
                token:token,
                id:userExist._id,
                User:{
                    name:userExist.name,
                    email:userExist.email,
                }
            })
        } else {
            // ADD THIS MISSING PART:
            return res.status(400).json({
                msg: 'Invalid password'
            });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Server error'
        });
    }
}

const logout = async (req, res) => {
    res.clearCookie("token");
    return res.json({ msg: "Logout successfully" });
};


const bookmark = async (req, res) => {
    try {
        const loggedInUserId = req.userId; //This userId is what we are getting from the authUser.Id
        const tweetId = req.params.id;

        const tweet = await User.findById(tweetId);
        if (!tweet) {
            return res.status(404).json({
                success: false,
                msg: "Tweet not found"
            });
        }

        const user = await User.findById(loggedInUserId);
        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "User not found"
            });
        }

        if (user.bookmark.includes(tweetId)) {
            await User.findByIdAndUpdate(loggedInUserId, { $pull: { bookmark: tweetId } });
            return res.json({
                success: true,
                msg: "Bookmark removed"
            });
        } else {
            await User.findByIdAndUpdate(loggedInUserId, { $push: { bookmark: tweetId } });
            return res.json({
                success: true,
                msg: "Tweet bookmarked"
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            msg: "Server error"
        });
    }
};



const getMyProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId).select("-password");
        if (!user) {
            res.status(400).json({
                success: false,
                message: 'User not found',
            })
        } else {
            res.status(200).json({
                user
            })
        }
    } catch (error) {
        console.log(error)
    }
}

const getOtherUsers = async (req, res) => {
    try {
        const id = req.userId;
        const otherUsers = await User.find({ _id: { $ne: id } }).select('-password');
        if (!otherUsers) {
            return res.status(400).json({
                success: false,
                message: "No user found"
            })
        } else {
            return res.status(200).send({
                success: true,
                otherUsers
            })
        }
    } catch (error) {
        console.log(error)
    }
}



const follow = async (req, res) => {
    try {
        const loggedInUserId = req.body.id;   // who is following
        const userId = req.params.id;         // who is being followed

        if (loggedInUserId === userId) {
            return res.status(400).json({
                success: false,
                message: "You cannot follow yourself",
            });
        }

        const loggedInUser = await User.findById(loggedInUserId);
        const userToFollow = await User.findById(userId);

        if (!loggedInUser || !userToFollow) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if (userToFollow.followers.includes(loggedInUserId)) {
            return res.status(400).json({
                success: false,
                message: "Already following this user",
            });
        }

        await loggedInUser.updateOne({ $push: { following: userId } });
        await userToFollow.updateOne({ $push: { followers: loggedInUserId } });

        res.status(200).json({
            success: true,
            message: "User followed successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


const unfollow = async (req, res) => {
    try {
        const loggedInUserId = req.body.id;   // who is unfollowing
        const userId = req.params.id;         // who is being unfollowed

        if (loggedInUserId === userId) {
            return res.status(400).json({
                success: false,
                message: "You cannot unfollow yourself",
            });
        }

        const loggedInUser = await User.findById(loggedInUserId);
        const userToUnfollow = await User.findById(userId);

        if (!loggedInUser || !userToUnfollow) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if (!userToUnfollow.followers.includes(loggedInUserId)) {
            return res.status(400).json({
                success: false,
                message: "You are not following this user",
            });
        }

        await loggedInUser.updateOne({ $pull: { following: userId } });
        await userToUnfollow.updateOne({ $pull: { followers: loggedInUserId } });

        res.status(200).json({
            success: true,
            message: "User unfollowed successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};



module.exports = { register, login, logout, getMyProfile, bookmark, getOtherUsers, follow, unfollow };