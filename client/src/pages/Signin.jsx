import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { backendServer } from '../App';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';
import { ClipLoader } from "react-spinners";
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';



const Signin = () => {
  //! Color setting...
  // const primaryColor = "#fad60e";
  // const midtextColor = "#f5e161";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";

  //! state variable setting ...
  const [showPassword, setshowPassword] = useState(true);
  const navigate = useNavigate();

  //? store all credential in state variable
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [err,seterr]=useState("");
  const [loader,setLoader]=useState(false);
  const dispatch=useDispatch();

  //! Signin handler  

  const SigninHandler = async () => {
    setLoader(true);
    try {
      await axios.post(`${backendServer}/api/auth/signin`, {email, password}, {
        withCredentials: true
      })
      const response=await axios.get(`${backendServer}/api/user/current`,{
        withCredentials: true
      })

      dispatch(setUserData(response.data))
      navigate("/");
      seterr("");
      setLoader(false);
    }
    catch (e) {
      seterr(e.response.data.message || "Login Failed");
      setLoader(false);
    }
  }

  const handleGoogleAuth = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    try {
      await axios.post(`${backendServer}/api/auth/google-auth`, { email:result.user.email }, {
        withCredentials: true
      })

      const response=await axios.get(`${backendServer}/api/user/current`, {
        withCredentials: true
      })

      dispatch(setUserData(response.data))
      navigate("/");

      seterr("");
    } catch (error) {
      seterr(error.response.data.message);
    }
  }

  return (
    <div className='min-h-screen w-full flex items-center justify-center p-4' style={{ backgroundColor: bgColor }}>
      <div className='p-7 shadow-lg w-full max-w-md bg-white border-[1px] rounded-2xl' style={{ borderColor: borderColor }}>
        <h1 className='font-bold text-3xl text-red-600'>Delivery</h1>


        {/* email */}
        <div className='mb-2 mt-2'>
          <label htmlFor="email" className='block text-gray-800 mb-1 font-medium'>Email</label>
          <input type="email" className='w-full border rounded-lg px-3 py-1 focus:outline-none focus:border-red-500 ' placeholder='Enter your email' onChange={(e) => setemail(e.target.value)} value={email} required/>
        </div>

        {/* password */}
        <div className='mb-5 relative'>
          <label htmlFor="password" className='block text-gray-800 mb-1 font-medium'>Password</label>
          <div className='relative'>
            <input required type={`${showPassword ? "text" : "password"}`} className='w-full border rounded-lg px-3 py-1 focus:outline-none focus:border-red-500 ' placeholder='Enter your password' onChange={(e) => setpassword(e.target.value)} value={password} />
            <button className='absolute right-3 top-2' onClick={() => setshowPassword(prev => !prev)}>{!showPassword ? <FaEye /> : <IoEyeOff />}</button>
          </div>
          <p className='absolute right-0 text-yellow-700 cursor-pointer' onClick={()=>{
            navigate("/forgot")
          }}>Forgot Password</p>
        </div>

        <p className='text-red-500'>{err}</p>
        <button className='w-full font-semibold rounded-lg py-1 mt-4 transition duration-200 bg-[#f86363] hover:bg-[red] cursor-pointer text-white' onClick={SigninHandler} disabled={loader}>
          {loader?<ClipLoader size={20}/>:"Signin"}
          </button>

        <button className='w-full border-1 py-1 rounded-lg my-3 flex justify-center items-center gap-2 hover:bg-gray-200 transition duration-200 cursor-pointer' onClick={handleGoogleAuth}>
          <FcGoogle />
          <span>Signin with Google</span>
        </button>

        <p className='w-full text-center cursor-pointer'>Already have an account? <span className='text-yellow-700' onClick={() => {
          navigate('/signup');
        }}>Sign Up</span></p>
      </div>
    </div>
  )
}

export default Signin
