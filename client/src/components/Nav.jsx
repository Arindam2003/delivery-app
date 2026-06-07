import React from 'react'
import { IoIosSearch } from 'react-icons/io'
import { FaLocationDot } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";
import { useSelector } from 'react-redux';



const Nav = () => {

    const { userData } = useSelector(state => state.user)


    return (
        <div className='w-full h-[80px] flex items-center justify-between md:justify-center gap-[30px] px-[20px] fixed top-0 z-[9999] bg-[#fff9f6] overflow-visible'>
            <h1 className='text-3xl font-bold mb-2 text-[red]'>Delivery</h1>
            <div className='md:w-[60%] lg:w-[40%] h-[70px] bg-white shadow-xl rounded-lg items-center gap-[20px] hidden md:flex'>
                <div className='flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-400'>
                    <FaLocationDot size={22} className=" text-[#ff4d2d]" />
                    <div className='w-[80%] truncate text-gray-600'>Panskura</div>
                </div>
                <div className='w-[80%] flex items-center gap-[10px]'>
                    <IoIosSearch size={22} className='text-[#ff4d2d]' />
                    <input type="text" placeholder='search delicious food...' className='px-[10px] text-gray-700 outline-0 w-full' />
                </div>
            </div>
            <div className='relative cursor-pointer'>
                <FiShoppingCart size={22} className='text-[red]' />
                <span className='absolute right-[-9px] top-[-12px] text-[red]'>0</span>
            </div>
            <button className='hidden md:block px-3 py-1 rounded-lg bg-[red]/10 text-[red] text-sm font-medium'>
                My Orders
            </button>
            <div>

            </div>
        </div>
    )
}

export default Nav
