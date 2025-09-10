const Tweet = require('../models/tweetSchema');
const User = require('../models/userSchema');

const createTweet = async (req, res) => {
    try {
        const { description, id } = req.body;
        if (!description || !id) {
            return res.status(401).json({
                message: 'Fields are required.',
                success: false
            });
        }

        // Get user details to store in userDetails array
        const user = await User.findById(id).select('name username');
        if (!user) {
            return res.status(404).json({
                message: 'User not found.',
                success: false
            });
        }

        await Tweet.create({
            description,
            userId: id,
            userDetails: [{
                _id: user._id,
                name: user.name,
                username: user.username
            }]
        });

        res.status(201).json({
            message: 'Tweet created successfully',
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Server error',
            success: false
        });
    }
};

const deleteTweet = async (req, res) => {
    try {
        const { id } = req.params;
        const tweet = await Tweet.findByIdAndDelete(id);
        if (tweet) {
            return res.status(200).json({
                success: true,
                message: 'Tweet deleted successfully'
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'Tweet not found'
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

const likeOrDislike = async (req, res) => {
    try {
        const loggedInUserId = req.userId;
        const tweetId = req.params.id;

        const tweet = await Tweet.findById(tweetId);
        if (!tweet) {
            return res.status(404).json({
                success: false,
                msg: "Tweet not found"
            });
        }

        if (tweet.like.includes(loggedInUserId)) {
            await Tweet.findByIdAndUpdate(tweetId, { $pull: { like: loggedInUserId } });
            return res.json({
                success: true,
                msg: "Tweet disliked"
            });
        } else {
            await Tweet.findByIdAndUpdate(tweetId, { $push: { like: loggedInUserId } });
            return res.json({
                success: true,
                msg: "Tweet liked"
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

// Updated bookmark function - now works with User schema



module.exports = { 
    createTweet, 
    deleteTweet, 
    likeOrDislike, 
};