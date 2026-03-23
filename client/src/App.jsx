import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/signup'
import Signin from './pages/signin'

export const backendServer="http://localhost:3000";

const App = () => {
  return (
    <Routes>
      <Route element={<Signup/>} path='/signup' />
      <Route element={<Signin/>} path='/signin' />
    </Routes>
  )
}

export default App