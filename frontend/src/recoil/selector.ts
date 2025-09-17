import { atom, selector, } from "recoil";
import axios from "axios";

export const userProfileSelector = selector({
  key: "userProfileSelector",
  get: async () => {
    try {
      // No need to pass ID - backend gets it from JWT cookie
      const res = await axios.get("http://localhost:8080/api/v1/user/getMyProfile", {
        withCredentials: true,
      });
      return res.data.user;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      // Return null if user not authenticated or error occurs
      return null;
    }
  },
});

export const otherUsersSelector = selector({
  key: 'getOtherUsersSelector',
  get: async () => {
    try {
      // Backend will use req.userId from auth middleware to exclude current user
      const res = await axios.get(`http://localhost:8080/api/v1/user/otherUsers`, {
        withCredentials: true
      });
      return res.data.otherUsers;
    } catch (error) {
      console.error("Error fetching other users:", error);
      return [];
    }
  },
});

// Keep this for tweet fetching if needed
export const tweetsSelector = selector({
  key: 'tweetsSelector',
  get: async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/tweet/getAllTweets", {
        withCredentials: true,
      });
      return res.data.tweets || [];
    } catch (error) {
      console.error("Error fetching tweets:", error);
      return [];
    }
  },
});

// Atom for tweet description
export const descriptionAtom = atom({
  key: 'description',
  default: ''
});

// Auth state atom
export const isAuthenticatedAtom = atom({
  key: 'isAuthenticated',
  default: false
});

// User atom for storing current user data
export const currentUserAtom = atom({
  key: 'currentUser',
  default: null
});