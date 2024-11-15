import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SchoolsCenters from './components/schoolCenters/SchoolCenters'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import ClassGroupsList from "./components/class-group/ClassGroupList";
import AddClassGroup from "./components/class-group/AddClassGroup";
import ClassGroup from "./components/class-group/ClassGroup";
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
          <Route path="/class-list" element={<ClassGroupsList />} />
          <Route path="/add-class-list" element={<AddClassGroup />} />
          <Route path="/class-list/:id" element={<ClassGroup />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
