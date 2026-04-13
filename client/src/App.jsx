import { Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Home from './pages/Home';
import Forgot from './pages/Forgot';

export const backendServer="http://localhost:8000";

const App = () => {
  return (
    <Routes>
      <Route element={<Home/>} path="/" />
      <Route element={<Signup/>} path='/signup' />
      <Route element={<Signin/>} path='/signin' />
      <Route element={<Forgot/>} path='/forgot' />
    </Routes>
  )
}

export default App