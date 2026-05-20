import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router' 
import { useEffect, useState } from 'react'

import Home from './pages/Home' 
import Login from './pages/Login' 
import Materias from './pages/Materias' 

const RutaProtegida = ({ children }) => {
  const token = localStorage.getItem('fakestore_token') || sessionStorage.getItem('fakestore_token')
  
  if (!token) {
    return <Navigate to="/" replace />
  }

  return children
}

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          
          <Route 
            path="/home" 
            element={
              <RutaProtegida>
                <Home />
              </RutaProtegida>
            } 
          />
          
          <Route 
            path="/materias" 
            element={
              <RutaProtegida>
                <Materias />
              </RutaProtegida>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;