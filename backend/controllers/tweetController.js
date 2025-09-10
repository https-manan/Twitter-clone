const Tweet = require('../models/tweetSchema')

const createTweet =async (req,res)=>{
    try {
        const {description,id} = req.body
        if(!description||!id){
            return res.status(401).json({
                message:'Fields are required.',
                success:false
            })
        }
        await Tweet.create({
            description,
            userId:id
        })
        res.status(201).json({
            message:'Tweet created successfully',
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}

//Here we have to write the functionality of deleting a tweet
const deleteTweet = async (req,res)=>{
    try {
        const {id} = req.params;
        const tweet = await Tweet.findByIdAndDelete(id);
        if(tweet){
            return res.status(200).json({
                success:true,
                message:'Tweet deleted successfully'
            })
        }
    } catch (error) {
        console.log(error)
    }
}


const likeOrDislike = ()=>{
    try {
        const loggedInUserId = req.body.id;
        const tweetId = req.params.id;
    } catch (error) {
        console.log(error)
    }
}



module.exports = { createTweet ,deleteTweet,likeOrDislike};
