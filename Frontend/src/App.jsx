import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SchoolsCenters from './components/schoolCenters/SchoolCenters'
import Home from './pages/Home/Home'

import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/schools" element={<SchoolsCenters />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
