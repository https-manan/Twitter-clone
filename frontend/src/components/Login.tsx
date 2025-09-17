import { useState } from 'react'
import x from '../assets/x-logo.png'
import axios from 'axios';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  let [isLogin, setIsLogin] = useState(false);
  let [name, setName] = useState('');
  let [username, setUsername] = useState('');
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let navigate = useNavigate();

  async function onclickHandler(e: any) {
    e.preventDefault();
    if (isLogin) {
      try {
        const response = await axios.post('http://localhost:8080/api/v1/user/login', {
          username,
          password
        }, {
          withCredentials: true // Important for cookies!
        });

        // Cookies are automatically stored by the browser
        // No need to manually store anything!

        toast.success("Login Successful!", {
          position: "top-center",
          className: "bg-green-600 text-white text-center rounded-md py-2 px-4",
        });
        navigate('/');
      } catch (error: any) {
        toast.error(error.response?.data?.msg || 'Error in Login');
        console.log(error);
      }
    } else {
      // Signup API
      try {
        await axios.post('http://localhost:8080/api/v1/user/register', {
          name,
          username,
          email,
          password
        });
        toast.success("Signup Successful!", {
          position: "top-center",
          className: "bg-green-600 text-white text-center rounded-md py-2 px-4",
        });
        setIsLogin(true);
      } catch (error: any) {
        toast.error(error.response?.data?.msg || 'Error in SignUp');
        console.log(error);
      }
    }
  }

  return (
    <div className="min-h-screen bg-white flex">
      <div className="flex-1 flex items-center justify-center">
        <img src={x} alt="X Logo" className="w-96 h-96 object-contain" />
      </div>

      <div className="flex-1 flex items-center justify-start bg-white px-16">
        <div className="max-w-md w-full">
          <div className="mb-8">
            <h1 className="text-black text-5xl font-bold mb-6">Happening now</h1>
            <h2 className="text-black text-2xl font-bold mb-8">
              {isLogin ? "Sign in to X" : "Join today."}
            </h2>
          </div>

          <div className="space-y-4 mb-6">
            {isLogin ? (
              <>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => { setUsername(e.target.value) }}
                  placeholder="Username"
                  className="w-full p-4 border border-gray-300 rounded-md text-black placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value) }}
                  placeholder="Password"
                  className="w-full p-4 border border-gray-300 rounded-md text-black placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </>
            ) : (
              <>
                <input
                  type="text"
                  value={name}
                  placeholder="Name"
                  onChange={(e) => { setName(e.target.value) }}
                  className="w-full p-4 border border-gray-300 rounded-md text-black placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => { setUsername(e.target.value) }}
                  placeholder="Username"
                  className="w-full p-4 border border-gray-300 rounded-md text-black placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value) }}
                  placeholder="Email"
                  className="w-full p-4 border border-gray-300 rounded-md text-black placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value) }}
                  placeholder="Password"
                  className="w-full p-4 border border-gray-300 rounded-md text-black placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </>
            )}
          </div>

          <button onClick={onclickHandler} className="w-full bg-blue-500 text-white py-3 rounded-full font-semibold text-base hover:bg-blue-600 transition mb-6">
            {isLogin ? "Sign In" : "Sign up"}
          </button>

          {!isLogin && (
            <p className="text-gray-500 text-xs mb-12">
              By signing up, you agree to the{' '}
              <span className="text-blue-400 hover:underline cursor-pointer">Terms of Service</span>{' '}
              and{' '}
              <span className="text-blue-400 hover:underline cursor-pointer">Privacy Policy</span>, including{' '}
              <span className="text-blue-400 hover:underline cursor-pointer">Cookie Use</span>.
            </p>
          )}

          <div className="mt-8">
            <h3 className="text-black text-lg font-bold mb-4">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </h3>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="w-full border border-gray-300 text-blue-500 py-3 rounded-full font-semibold hover:bg-blue-50 transition"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login