import { BrowserRouter as Router, Routes, Route, HashRouter } from 'react-router-dom'
import Home from "./pages/Home";
import AccountingPlan from './components/accounting-plan/AccountingPlan';
import AccountingPlanList from './components/accounting-plan/ListAccountingPlan';
import AddAccountingPlan from './components/accounting-plan/AddAccountingPlan';
import ClassGroup from "./components/class-group/ClassGroup";
import ClassGroupsList from "./pages/class-group/ClassGroupList";
import AddClassGroup from "./components/class-group/AddClassGroup";
import SchoolsCenters from './components/schoolCenters/SchoolCenters'
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/private-route/PrivateRoute";
import SignIn from "./components/user/SignIn";
import SignUp from "./components/user/SignUp";
import TaskPage from "./pages/task-page/TaskPage"
import NavStateProvider from "./context/nav-menu/NavStateProvider";
import NavegationMenu from "./components/navegation-menu/NavegationMenu";

import Account from './components/account/Account';
import AccountList from './components/account/ListAccount';
import AddAccount from './components/account/AddAccount';
import HelpExample from './components/help-example/HelpExample';
import HelpExampleList from './components/help-example/ListHelpExample';
import AddHelpExample from './components/help-example/AddHelpExample';


import './App.css';
import './assets/Styles/Global.css';
import TaskListAndDetails from './components/task/taskListAndDetails';
import StatementsList from './components/statements/StatementList';
import StatementForm from './components/statements/StatementForm';
import TaskEditForm from './components/task/TaskEditForm';

function App() {

  return (
    <>
      <Router>
        <AuthProvider>
          <NavStateProvider>
            <NavegationMenu />
            <div className='app-main'>
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/sign_in" element={<SignIn />} />
                <Route path="*" element={<Home />} />
                <Route element={<PrivateRoute allowedRoles={['admin', 'teacher', 'student']} />}>
                  <Route path="/accounting-plans" element={<AccountingPlanList />} />
                  <Route path="/accounting-plans/:id" element={<AccountingPlan />} />
                   {/* PRUEBA COMPONENTES ACCOUNTS AND HELP EXAMPLES */}
                  <Route path="/accounts" element={<AccountList />} />
                  <Route path="/accounts/:id" element={<Account />} />
                  <Route path="/add-account" element={<AddAccount />} />
                  <Route path="/help-examples" element={<HelpExampleList />} />
                  <Route path="/help-examples/:id" element={<HelpExample />} />
                  <Route path="/add-help-example" element={<AddHelpExample />} />

                  <Route path="/modes" element={<TaskPage />} />
                  <Route element={<PrivateRoute allowedRoles={['admin', 'teacher']} />}>
                    <Route path="/tasks" element={<TaskListAndDetails />} />
                    <Route path="/tasks/:id" element={<TaskEditForm />} />
                    <Route path="/statements" element={<StatementsList />} />
                    <Route path="/add-statements" element={<StatementForm />} />
                    <Route path="/add-accounting-plan" element={<AddAccountingPlan />} />
                    <Route path="/schools" element={<SchoolsCenters />} />
                    <Route path="/class-list" element={<ClassGroupsList />} />
                    <Route path="/add-class-list" element={<AddClassGroup />} />
                    <Route path="/class-list/:id" element={<ClassGroup />} />
                    <Route element={<PrivateRoute allowedRoles={['admin']} />}>
                      <Route path="/sign_up" element={<SignUp />} />
                    </Route>
                  </Route>
                </Route>
              </Routes>
            </div>
          </NavStateProvider>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App;

// # A