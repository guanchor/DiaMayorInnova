import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./pages/Home";
import AccountingPlan from './components/accounting-plan/AccountingPlan';
import AccountingPlanList from './components/accounting-plan/ListAccountingPlan';
import AddAccountingPlan from './components/accounting-plan/AddAccountingPlan';
import ClassGroup from "./components/class-group/ClassGroup";
import ClassGroupsList from "./components/class-group/ClassGroupList";
import AddClassGroup from "./components/class-group/AddClassGroup";
import SchoolsCenters from './components/schoolCenters/SchoolCenters'
import NavegationPlan from './components/navegation-menu/NavegationMenu';
import './App.css';
import './assets/Styles/Global.css';
import NavegationMenu from './components/navegation-menu/NavegationMenu';

function App() {

  return (
    <>
      <BrowserRouter>
        <NavegationMenu />
        <div className='app-main'>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/accounting-plans" element={<AccountingPlanList />} />
            <Route path="/add-accounting-plan" element={<AddAccountingPlan />} />
            <Route path="/accounting-plans/:id" element={<AccountingPlan />} />
            <Route path="/schools" element={<SchoolsCenters />} />
            <Route path="/class-list" element={<ClassGroupsList />} />
            <Route path="/add-class-list" element={<AddClassGroup />} />
            <Route path="/class-list/:id" element={<ClassGroup />} />
            <Route path="/navegation" element={<NavegationPlan />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App;
