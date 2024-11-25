import { BrowserRouter as Router, Routes, Route, HashRouter } from 'react-router-dom'
import Home from "./pages/Home";
import AccountingPlan from './components/accounting-plan/AccountingPlan';
import AccountingPlanList from './components/accounting-plan/ListAccountingPlan';
import AddAccountingPlan from './components/accounting-plan/AddAccountingPlan';
import ClassGroup from "./components/class-group/ClassGroup";
import ClassGroupsList from "./pages/class-group/ClassGroupList";
import AddClassGroup from "./components/class-group/AddClassGroup";
import SchoolsCenters from './components/schoolCenters/SchoolCenters'
import AuthProvider from "./hooks/AuthProvider";
import PrivateRoute from "./components/private-route/PrivateRoute";
import SignIn from "./components/user/SignIn";
import SignUp from "./components/user/SignUp";
import NavegationMenu from './components/navegation-menu/NavegationMenu';
import Practica from './pages/Practica';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import './App.css';
import './assets/Styles/Global.css';

const queryClient = new QueryClient();

function App() {

  return (
    <>
      <Router>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <NavegationMenu />
            <div className='app-main'>
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/sign_up" element={<SignUp />} />
                <Route path="/sign_in" element={<SignIn />} />
                <Route path="/pruebas" element={<Practica />} />
                <Route path="*" element={<Practica />} />
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
            </div>
          </AuthProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Router>
    </>
  )
}

export default App;
