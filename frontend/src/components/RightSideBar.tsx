import { useState, useEffect } from 'react';
import { CiSearch } from "react-icons/ci";
import axios from 'axios';
import { toast } from 'react-toastify';

interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  followers: string[];
  following: string[];
}

const RightSideBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [followingUsers, setFollowingUsers] = useState<Set<string>>(new Set());

  // Fetch other users on component mount
  useEffect(() => {
    fetchOtherUsers();
  }, []);

  // Filter users based on search term
  useEffect(() => {
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const fetchOtherUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/api/v1/user/otherUsers', {
        withCredentials: true
      });
      
      if (response.data.success) {
        setUsers(response.data.otherUsers);
        setFilteredUsers(response.data.otherUsers);
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        // User not authenticated
        console.log('User not authenticated');
      } else {
        console.error('Error fetching users:', error);
        toast.error('Failed to load users');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async (userIdToFollow: string) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/v1/user/follow/${userIdToFollow}`, {}, {
        withCredentials: true
      });

      if (response.data.success) {
        setFollowingUsers(prev => new Set([...prev, userIdToFollow]));
        toast.success('User followed successfully!');
      }
    } catch (error: any) {
      if (error.response?.data?.message === "Already following this user") {
        toast.info('Already following this user');
        setFollowingUsers(prev => new Set([...prev, userIdToFollow]));
      } else {
        toast.error(error.response?.data?.message || 'Failed to follow user');
      }
      console.error('Follow error:', error);
    }
  };

  const handleUnfollow = async (userIdToUnfollow: string) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/v1/user/unfollow/${userIdToUnfollow}`, {
        data: {},
        withCredentials: true
      });

      if (response.data.success) {
        setFollowingUsers(prev => {
          const newSet = new Set(prev);
          newSet.delete(userIdToUnfollow);
          return newSet;
        });
        toast.success('User unfollowed successfully!');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to unfollow user');
      console.error('Unfollow error:', error);
    }
  };

  const isFollowing = (userId: string) => followingUsers.has(userId);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="w-[20%] p-4">
      {/* Search Bar */}
      <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full shadow-sm">
        <CiSearch size={20} className="text-gray-500" />
        <input
          className="flex-1 bg-transparent focus:outline-none text-sm text-gray-700"
          placeholder="Search users..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* Who to follow section */}
      <div className="mt-6 bg-gray-50 shadow-sm rounded-xl overflow-hidden">
        <h1 className="font-bold text-lg px-4 py-3 border-b border-gray-200">
          {searchTerm ? `Search Results (${filteredUsers.length})` : 'Who to follow'}
        </h1>

        <div className="max-h-96 overflow-y-auto">
          {loading ? (
            <div className="px-4 py-8 text-center text-gray-500">
              Loading users...
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="px-4 py-8 text-center text-gray-500">
              {searchTerm ? 'No users found' : 'No users to follow'}
            </div>
          ) : (
            filteredUsers.map((user, index) => (
              <div
                key={user._id}
                className={`flex items-center justify-between px-4 py-3 hover:bg-gray-100 transition ${
                  index === filteredUsers.length - 1 ? '' : 'border-b border-gray-100'
                }`}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {/* User Avatar */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h2 className="font-semibold text-gray-900 text-sm truncate">
                      {user.name}
                    </h2>
                    <p className="text-gray-500 text-sm truncate">
                      @{user.username}
                    </p>
                    <p className="text-xs text-gray-400">
                      {user.followers.length} followers
                    </p>
                  </div>
                </div>

                {/* Follow/Unfollow Button */}
                <button
                  onClick={() => 
                    isFollowing(user._id) 
                      ? handleUnfollow(user._id) 
                      : handleFollow(user._id)
                  }
                  className={`px-4 py-1 rounded-full text-sm font-medium transition ${
                    isFollowing(user._id)
                      ? 'bg-gray-200 text-gray-700 hover:bg-red-100 hover:text-red-600'
                      : 'bg-black text-white hover:bg-gray-800'
                  }`}
                >
                  {isFollowing(user._id) ? 'Unfollow' : 'Follow'}
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Show more link if there are many users */}
      {!searchTerm && filteredUsers.length >= 5 && (
        <div className="mt-2 text-center">
          <button className="text-blue-500 text-sm hover:underline">
            Show more
          </button>
        </div>
      )}
    </div>
  )
}

export default RightSideBar