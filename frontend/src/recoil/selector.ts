import { atom, selector, } from "recoil";
import axios from "axios";

export const userProfileSelector = selector({
  key: "userProfileSelector",
  get: async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/user/getMyProfile", {
        withCredentials: true,
      });
      return res.data.user;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
  },
});

export const otherUsersSelector = selector({
  key: 'getOtherUsersSelector',
  get: async () => {
    try {
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


export const descriptionAtom = atom({
  key: 'description',
  default: ''
});


export const isAuthenticatedAtom = atom({
  key: 'isAuthenticated',
  default: false
});

export const currentUserAtom = atom({
  key: 'currentUser',
  default: null
});