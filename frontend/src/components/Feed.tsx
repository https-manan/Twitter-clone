import { useState, useEffect } from 'react'
import CreatePost from './CreatePost'
import Tweet from './Tweet'
import axios from 'axios'
import { toast } from 'react-toastify'

interface TweetType {
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
}

const Feed = () => {
  const [tweets, setTweets] = useState<TweetType[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'forYou' | 'following'>('forYou');

  // Fetch all tweets (user + following)
  const fetchAllTweets = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/api/v1/tweet/getAllTweets', {
        withCredentials: true
      });
      
      if (response.data.success) {
        setTweets(response.data.tweets);
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        toast.error('Please login first!');
        // Redirect to login or handle auth error
        window.location.href = '/login';
      } else {
        console.error('Error fetching tweets:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch following tweets only
  const fetchFollowingTweets = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/api/v1/tweet/getFollowingTweets', {
        withCredentials: true
      });
      
      if (response.data.success) {
        setTweets(response.data.tweets);
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        toast.error('Please login first!');
        window.location.href = '/login';
      } else {
        console.error('Error fetching following tweets:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  // Load tweets on component mount
  useEffect(() => {
    if (activeTab === 'forYou') {
      fetchAllTweets();
    } else {
      fetchFollowingTweets();
    }
  }, [activeTab]);

  // Refresh tweets when new tweet is created
  const refreshTweets = () => {
    if (activeTab === 'forYou') {
      fetchAllTweets();
    } else {
      fetchFollowingTweets();
    }
  };

  return (
    <div className='w-[60%]'>
      <div>
        {/* Pass refresh function to CreatePost */}
        <div className="border-b border-r border-gray-200">
          <div className="flex items-center justify-between border-b border-gray-200">
            <div 
              onClick={() => setActiveTab('forYou')}
              className={`flex-1 text-center font-semibold cursor-pointer py-3 hover:bg-gray-100 transition ${
                activeTab === 'forYou' ? 'border-b-2 border-blue-500' : 'text-gray-500'
              }`}
            >
              For you
            </div>
            <div 
              onClick={() => setActiveTab('following')}
              className={`flex-1 text-center font-semibold cursor-pointer py-3 hover:bg-gray-100 transition ${
                activeTab === 'following' ? 'border-b-2 border-blue-500' : 'text-gray-500'
              }`}
            >
              Following
            </div>
          </div>
          
          <CreatePost onTweetCreated={refreshTweets} />
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="text-gray-500">Loading tweets...</div>
          </div>
        ) : (
          /* Tweet list */
          <div>
            {tweets.length > 0 ? (
              tweets.map((tweet) => (
                <Tweet key={tweet._id} tweet={tweet} />
              ))
            ) : (
              <div className="flex justify-center items-center py-8">
                <div className="text-gray-500">
                  {activeTab === 'following' 
                    ? "No tweets from people you follow" 
                    : "No tweets yet. Be the first to tweet!"
                  }
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Feed