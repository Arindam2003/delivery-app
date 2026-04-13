import { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { backendServer } from "../App";
import axios from "axios";

function Forgot() {
    const navigate=useNavigate();

    const [step, setstep] = useState(1);
    const [email, setemail] = useState("");
    const [otp, setotp] = useState("");
    const [newPassword, setnewPassword] = useState("");
    const [confpass, setconfpass] = useState("");


    const handleSendOtp=async()=>{
        try {
            const result = await axios.post(`${backendServer}/api/auth/send-otp`,{email},{withCredentials:true})
            console.log(result);
            setstep(2)
        } catch (error) {
            console.log(error);
        }
    }
    const handleVerifyOtp=async()=>{
        try {
            const result = await axios.post(`${backendServer}/api/auth/verify-otp`,{email,otp},{withCredentials:true})
            console.log(result);
            setstep(3)
        } catch (error) {
            console.log(error);
        }
    }
    const handleResetPassword=async()=>{
        try {
            const result = await axios.post(`${backendServer}/api/auth/reset-password`, { email, newPassword },{withCredentials:true})
            console.log(result);
            navigate("/signin")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#fff9f6]">
            <div className="p-7 shadow-lg w-full max-w-md bg-white rounded-2xl">
                <div id="heading" className="flex items-center gap-2 text-[#d5b60b]">
                    <IoMdArrowRoundBack onClick={()=>{navigate("/signin")}} className="cursor-pointer"/>
                    <h1 className="font-bold text-2xl">Forgot Password</h1>
                </div>

                {step == 1 && <div className='mt-3'>
                    <label htmlFor="email" className='block text-gray-800 mb-1 font-medium'>Email</label>
                    <input type="email" className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-yellow-500 mt-1' placeholder='Enter your email' onChange={(e) => setemail(e.target.value)} value={email} />

                    <button className='w-full font-semibold rounded-lg py-1 mt-4 transition duration-200 bg-[#fad60e] hover:bg-[#fac30e] cursor-pointer' onClick={handleSendOtp} >Send Otp</button>
                </div>}

                {step == 2 && <div className='mt-3'>
                    <label htmlFor="otp" className='block text-gray-800 mb-1 font-medium'>Enter OTP</label>
                    <input type="text" className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-yellow-500 mt-1' placeholder='Enter your otp' onChange={(e) => setotp(e.target.value)} value={otp} />

                    <button className='w-full font-semibold rounded-lg py-1 mt-4 transition duration-200 bg-[#fad60e] hover:bg-[#fac30e] cursor-pointer' onClick={handleVerifyOtp} >Verify</button>
                </div>}

                {step == 3 && <div className='mt-3'>
                    <label htmlFor="email" className='block text-gray-800 mb-1 font-medium'>New Password</label>
                    <input type="text" className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-yellow-500 mt-1' placeholder='Enter new Password' onChange={(e) => setnewPassword(e.target.value)} value={newPassword} />

                    <label htmlFor="email" className='block text-gray-800 mb-1 font-medium mt-3'>Confirm Password</label>
                    <input type="text" className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-yellow-500 mt-1' placeholder='Enter confirm password' onChange={(e) => setconfpass(e.target.value)} value={confpass} />

                    <button className='w-full font-semibold rounded-lg py-1 mt-4 transition duration-200 bg-[#fad60e] hover:bg-[#fac30e] cursor-pointer' onClick={handleResetPassword} >Confirm</button>
                </div>}

            </div>
        </div>
    )
}

export default Forgot