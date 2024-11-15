import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./pages/Home";
import AccountingPlan from './components/accounting-plan/AccountingPlan';
import AccountingPlanList from './components/accounting-plan/ListAccountingPlan';
import AddAccountingPlan from './components/accounting-plan/AddAccountingPlan';
import ClassGroup from "./components/class-group/ClassGroup";
import ClassGroupsList from "./components/class-group/ClassGroupList";
import AddClassGroup from "./components/class-group/AddClassGroup";
import SchoolsCenters from './components/schoolCenters/SchoolCenters'
import './App.css';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/accounting-plans" element={<AccountingPlanList />} />
          <Route path="/add-accounting-plan" element={<AddAccountingPlan />} />
          <Route path="/accounting-plans/:id" element={<AccountingPlan />} />
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
