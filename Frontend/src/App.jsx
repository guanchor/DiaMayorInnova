import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from "./pages/Home";
import AccountingPlan from './components/accounting-plan/AccountingPlan';
import AccountingPlanList from './components/accounting-plan/ListAccountingPlan';
import AddAccountingPlan from './components/accounting-plan/AddAccountingPlan';
import ClassGroup from "./components/class-group/ClassGroup";
import ClassGroupsList from "./pages/class-group/ClassGroupList";
import AddClassGroup from "./components/class-group/AddClassGroup";
import SchoolsCenters from './components/schoolCenters/SchoolCenters';
import AuthProvider from "./hooks/AuthProvider";
import PrivateRoute from "./components/private-route/PrivateRoute";
import SignIn from "./components/user/SignIn";
import SignUp from "./components/user/SignUp";
import './App.css';

function App() {

  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/sign_up" element={<SignUp />} />
            <Route path="/sign_in" element={<SignIn />} />
            <Route path="*" element={<Home />} />
            <Route element={<PrivateRoute />}>
              <Route path="/accounting-plans" element={<AccountingPlanList />} />
              <Route path="/add-accounting-plan" element={<AddAccountingPlan />} />
              <Route path="/accounting-plans/:id" element={<AccountingPlan />} />
              <Route path="/schools" element={<SchoolsCenters />} />
              <Route path="/class-list" element={<ClassGroupsList />} />
              <Route path="/add-class-list" element={<AddClassGroup />} />
              <Route path="/class-list/:id" element={<ClassGroup />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App;
