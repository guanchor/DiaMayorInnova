import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SchoolsCenters from './components/schoolCenters/SchoolCenters'
import './App.css'
import Home from './pages/Home'
import AddAccountingPlan from './components/AddAccountingPlan'
import AccountingPlanList from './components/ListAccountingPlan'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AccountingPlan from './components/AccountingPlan'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/accounting-plans" element={<AccountingPlanList />} />
          <Route path="/add-accounting-plan" element={<AddAccountingPlan />} />
          <Route path="/accounting-plans/:id" element={<AccountingPlan />} />
          <Route path="/home" element={<Home />} />
          <Route path="/schools" element={<SchoolsCenters />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
