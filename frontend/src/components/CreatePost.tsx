import { useRecoilState } from 'recoil'
import { CiImageOn } from "react-icons/ci";
import image from "../assets/manan.png";
import axios from 'axios';
import { toast } from 'react-toastify';
import { descriptionAtom } from "../recoil/selector";

interface CreatePostProps {
  onTweetCreated?: () => void;
}

const CreatePost = ({ onTweetCreated }: CreatePostProps) => {
  const [description, setDescription] = useRecoilState(descriptionAtom);

  const createTweet = async () => {
    if (!description.trim()) {
      toast.error('Please write something to tweet!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/v1/tweet/create', {
        description
      }, {
        withCredentials: true
      });

      if (response.data.success) {
        setDescription(''); 
        toast.success('Tweet created successfully!');
        if (onTweetCreated) {
          onTweetCreated();
        }
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create tweet');
      console.error(error);
    }
  };

  return (
    <div className="border-b border-r border-gray-200">

      <div className="flex items-start gap-4 p-6">
        <img
          src={image}
          alt="profile"
          className="w-12 h-12 rounded-full object-cover"
        />

        <div className="flex-1">
          <textarea
            value={description}
            onChange={(e) => { setDescription(e.target.value) }}
            placeholder="What is happening?!"
            className="w-full border-none focus:outline-none text-xl text-gray-800 placeholder-gray-500 resize-none min-h-[80px] p-2"
          />

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-5 text-blue-400">
              <CiImageOn
                size={24}
                className="cursor-pointer hover:text-blue-500"
              />
            </div>
            <button
              onClick={createTweet}
              disabled={!description.trim()}
              className={`px-6 py-2 rounded-full font-semibold transition ${description.trim()
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-blue-300 text-white cursor-not-allowed'
                }`}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;