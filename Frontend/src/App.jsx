import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SchoolsCenters from './components/schoolCenters/SchoolCenters'
import './App.css'
import routes from './services/Routes'
import { ResourceProvider } from './services/Resource'

function App() {

  return (
    <ResourceProvider routes={routes}>
      <BrowserRouter>
        <Routes>
          <Route path="/schools" element={<SchoolsCenters />} />
        </Routes>
      </BrowserRouter>
    </ResourceProvider>
  )
}

export default App
