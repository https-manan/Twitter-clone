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

        const newTweet = await Tweet.create({
            description,
            userId: id,
            userDetails: [{
                _id: user._id,
                name: user.name,
                username: user.username
            }]
        });

        res.status(201).json({
            id:newTweet._id,
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

const getAllTweets = async (req, res) => {
  try {
    const userId = req.userId; 
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "No user found",
      });
    }

    // find the logged-in user to get their "following" list
    const loggedInUser = await User.findById(userId).select("following");
    if (!loggedInUser) {
      return res.status(404).json({
        success: false,
        message: "No accounts following",
      });
    }
    const ids = [userId, ...loggedInUser.following];

    // fetch tweets from yourself + following users
    const tweets = await Tweet.find({ userId: { $in: ids } })
      .sort({ createdAt: -1 });

    if (!tweets || tweets.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No tweets found",
      });
    }

    return res.status(200).json({
      success: true,
      tweets,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};



const getFollowingTweets = async (req, res) => {
    try {
        const userId = req.userId;
        
        const loggedInUser = await User.findById(userId).select("following");
        if (!loggedInUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if (!loggedInUser.following || loggedInUser.following.length === 0) {
            return res.status(200).json({
                success: true,
                message: "You're not following anyone yet",
            });
        }

        const tweets = await Tweet.find({ userId: { $in: loggedInUser.following } }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            tweets,
            message: tweets.length === 0 ? "No tweets from followed users" : undefined
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

module.exports = { 
    createTweet, 
    deleteTweet, 
    likeOrDislike, 
    getAllTweets,
    getFollowingTweets
};