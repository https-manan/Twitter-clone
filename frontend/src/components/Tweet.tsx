import { useState } from 'react'
import image from "../assets/manan.png";
import { CiHeart } from "react-icons/ci";
import { FaRegComment, FaHeart } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";
import axios from 'axios';
import { toast } from 'react-toastify';

interface TweetProps {
  tweet: {
    _id: string;
    description: string;
    like: string[];
    userId: string;
    userDetails: Array<{
      _id: string;
      name: string;
      username: string;
    }>;
    createdAt: string;
  };
}

const Tweet = ({ tweet }: TweetProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(tweet.like.length);
  
  // Backend will get userId from JWT cookie

  const likeHandler = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/api/v1/tweet/like/${tweet._id}`, {}, {
        withCredentials: true
      });
      
      if (response.data.success) {
        if (response.data.msg === "Tweet liked") {
          setIsLiked(true);
          setLikeCount(prev => prev + 1);
          toast.success('Tweet liked!');
        } else {
          setIsLiked(false);
          setLikeCount(prev => prev - 1);
          toast.success('Tweet unliked!');
        }
      }
    } catch (error: any) {
      toast.error('Failed to like tweet');
      console.error('Like failed:', error);
    }
  };

  const bookmarkHandler = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/api/v1/user/bookmark/${tweet._id}`, {}, {
        withCredentials: true
      });
      
      if (response.data.success) {
        if (response.data.msg === "Tweet bookmarked") {
          setIsBookmarked(true);
          toast.success('Tweet bookmarked!');
        } else {
          setIsBookmarked(false);
          toast.success('Bookmark removed!');
        }
      }
    } catch (error: any) {
      toast.error('Failed to bookmark tweet');
      console.error('Bookmark failed:', error);
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'now';
    if (diffInMinutes < 60) return `${diffInMinutes}m`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`;
    return `${Math.floor(diffInMinutes / 1440)}d`;
  };

  return (
    <div className="border-b border-r border-gray-200 p-4 hover:bg-gray-50 transition">
      <div className="flex items-start gap-3">
        <img
          className="w-10 h-10 rounded-full object-cover"
          src={image}
          alt="profile"
        />

        <div className="flex flex-col flex-1">
          <div className="flex items-center gap-2">
            <h1 className="font-semibold text-gray-900">
              {tweet.userDetails[0]?.name || 'Unknown User'}
            </h1>
            <p className="text-gray-500 text-sm">
              @{tweet.userDetails[0]?.username || 'unknown'} · {formatDate(tweet.createdAt)}
            </p>
          </div>

          <p className="text-gray-800 mt-1">
            {tweet.description}
          </p>

          <div className="flex justify-between items-center text-gray-500 text-sm mt-3 w-4/5">
            <div className="flex items-center gap-2 cursor-pointer hover:text-pink-500 transition">
              <button onClick={likeHandler} className="flex items-center gap-1">
                {isLiked ? (
                  <FaHeart size={18} className="text-pink-500" />
                ) : (
                  <CiHeart size={20} />
                )}
                <span>{likeCount}</span>
              </button>
            </div>
            
            <div className="flex items-center gap-2 cursor-pointer hover:text-blue-500 transition">
              <button className="flex items-center gap-1">
                <FaRegComment size={18} />
                <span>0</span>
              </button>
            </div>
            
            <div className="flex items-center gap-2 cursor-pointer hover:text-green-500 transition">
              <button onClick={bookmarkHandler}>
                {isBookmarked ? (
                  <FaBookmark size={18} className="text-green-500" />
                ) : (
                  <CiBookmark size={20} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tweet