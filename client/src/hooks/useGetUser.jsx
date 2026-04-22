import React from "react"
import { useEffect } from "react"
import { backendServer } from "../App"
import axios from "axios"
import { useDispatch } from "react-redux"
import { setUserData } from "../redux/userSlice"


const useGetUser=()=>{
    const dispatch=useDispatch();
    useEffect(()=>{
        const fetchUser=async()=>{
            try {
                const result =await axios.get(`${backendServer}/api/user/current`,{withCredentials:true});
                dispatch(setUserData(result.data))
            } catch (error) {
                console.log(error);
            }
        }
        fetchUser();
    },[dispatch])
}

export default useGetUser;