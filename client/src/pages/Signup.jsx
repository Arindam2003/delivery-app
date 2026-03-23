import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { backendServer } from '../App';



const Signup = () => {
  //! Color setting...
  const primaryColor = "#fad60e";
  // const midtextColor = "#f5e161";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";


  //! state variable setting ...
  const [showPassword, setshowPassword] = useState(true);
  const navigate = useNavigate();

  //? store all credential in state variable
  const [fullName, setfullName] = useState("");
  const [email, setemail] = useState("");
  const [mobile, setmobile] = useState("");
  const [password, setpassword] = useState("");
  const [role, setrole] = useState("user")

  //! signup handler  

  const signupHandler=async()=>{
    try{
      const response = await axios.post(`${backendServer}/api/auth/signup`,{fullName,email,mobile,password,role},{
        withCredentials:true
      })
      console.log(response);
      
    }
    catch(e){
      console.log(e);
    }
  }




  return (
    <div className='min-h-screen w-full flex items-center justify-center p-4' style={{ backgroundColor: bgColor }}>
      <div className='p-7 shadow-lg w-full max-w-md bg-white border-[1px] rounded-2xl' style={{ borderColor: borderColor }}>
        <h1 className='font-bold text-2xl text-yellow-600'>PetPooja</h1>
        <p className='font-medium text-gray-500'>Get Started</p>

        {/* fullname */}
        <div className='mb-2'>
          <label htmlFor="fullname" className='block text-gray-800 mb-1 font-medium'>Full Name</label>
          <input type="text" className='w-full border rounded-lg px-3 py-1 focus:outline-none focus:border-yellow-500 ' placeholder='Enter your name' onChange={(e)=>setfullName(e.target.value)} value={fullName}/>
        </div>

        {/* email */}
        <div className='mb-2'>
          <label htmlFor="email" className='block text-gray-800 mb-1 font-medium'>Email</label>
          <input type="email" className='w-full border rounded-lg px-3 py-1 focus:outline-none focus:border-yellow-500 ' placeholder='Enter your email' onChange={(e) => setemail(e.target.value)} value={email} />
        </div>

        {/* mobile */}
        <div className='mb-2'>
          <label htmlFor="mobile" className='block text-gray-800 mb-1 font-medium'>Mobile</label>
          <input type="tel" className='w-full border rounded-lg px-3 py-1 focus:outline-none focus:border-yellow-500' placeholder='Enter your Mobile number' onChange={(e) => setmobile(e.target.value)} value={mobile} />
        </div>


        {/* password */}
        <div className='mb-2'>
          <label htmlFor="password" className='block text-gray-800 mb-1 font-medium'>Password</label>
          <div className='relative'>
            <input type={`${showPassword ? "text" : "password"}`} className='w-full border rounded-lg px-3 py-1 focus:outline-none focus:border-yellow-500 ' placeholder='Enter your password' onChange={(e) => setpassword(e.target.value)} value={password} />
            <button className='absolute right-3 top-2' onClick={()=>setshowPassword(prev=>!prev)}>{!showPassword ? <FaEye /> : <IoEyeOff/>}</button>
          </div>
        </div>

        {/* role */}
        <div className='mb-2'>
          <label htmlFor="role" className='block text-gray-800 mb-1 font-medium'>Role</label>
          <div className='flex gap-2'>
            {["user", "owner", "deliveryboy"].map((r,index)=>(
              <button className='border rounded-lg px-3 py-1 font-medium transition-colors' key={index}
              onClick={()=>setrole(r)}
              style={
                role == r ? { backgroundColor: primaryColor, border: "1px solid orange"} : { border:"1px solid orange"}
              }
              >{r}</button>
            ))}
          </div>
        </div>
        
        <button className='w-full font-semibold rounded-lg py-1 mt-4 transition duration-200 bg-[#fad60e] hover:bg-[#fac30e] cursor-pointer' onClick={signupHandler}>Signup</button>

        <button className='w-full border-1 py-1 rounded-lg my-3 flex justify-center items-center gap-2 hover:bg-gray-200 transition duration-200 cursor-pointer'>
          <FcGoogle />
          <span>Signin with Google</span>
        </button>

        <p className='w-full text-center cursor-pointer'>Already have an account? <span className='text-yellow-700' onClick={()=>{
          navigate('/signin');
        }}>Sign In</span></p>
      </div>
    </div>
  )
}

export default Signup
