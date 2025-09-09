const mongoose = require("mongoose");




const tweetSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: [true, "description is required"],
      trim: true,
      minlength: 3,
    },
    like: {
      type: Array,
      default: []
    },
    bookmark: {
      type: Array,
      default: []
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
  },
  { timestamps: true }
);




module.exports = mongoose.model("Tweet", tweetSchema);
