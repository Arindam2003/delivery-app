import { Navigate, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Home from './pages/Home';
import Forgot from './pages/Forgot';
import useGetUser from './hooks/useGetUser';
import { useSelector } from 'react-redux';

export const backendServer="http://localhost:8000";

const App = () => {
  useGetUser();
  const {userData}=useSelector(state=>state.user)
  return (
    <Routes>
      <Route path="/" element={userData?<Home/>:<Navigate to="/signin" />}/>
      <Route path="/signin" 
      element={!userData?<Signin/>:<Navigate to="/"/>} />
      <Route path="/signup" element={!userData?<Signup/>:<Navigate to="/"/>} />
      <Route path="/forgot" element={<Forgot/>} />
    </Routes>
  )
}

export default App