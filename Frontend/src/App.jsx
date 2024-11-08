import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SchoolsCenters from './components/schoolCenters/SchoolCenters'

import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/schools" element={<SchoolsCenters />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
