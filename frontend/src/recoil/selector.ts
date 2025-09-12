import { selectorFamily } from "recoil";
import axios from "axios";



export const userProfileSelector = selectorFamily({
  key: "userProfileSelector",
  get: (id: string) => async () => {
    const res = await axios.get(`http://localhost:8080/api/v1/user/getMyProfile/${id}`);
    return res.data;
  },
});