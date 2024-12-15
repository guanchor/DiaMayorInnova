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
import NavStateProvider from "./context/nav-menu/NavStateProvider";
import NavegationMenu from "./components/navegation-menu/NavegationMenu";
import Account from './components/account/Account';
// import AccountList from './components/account/ListAccount';
// import AddAccount from './components/account/AddAccount';
import HelpExample from './components/help-example/HelpExample';
import HelpExampleList from './components/help-example/ListHelpExample';
import AddHelpExample from './components/help-example/AddHelpExample';
import TaskListAndDetails from './components/task/taskListAndDetails';
import StatementsList from './components/statements/StatementList';
import StatementForm from './components/statements/StatementForm';
import TaskEditForm from './components/task/TaskEditForm';
import Modes from './pages/modes/Modes';
import AccountingPlans from './pages/accounting-plan/AccountingPlans';
import TaskPage from './pages/modes/task-page/TaskPage';
import PracticePage from './pages/modes/practice-page/PracticePage';
import ExamPage from './pages/modes/exam-page/ExamPage';
import Accounts from './pages/account/Accounts';
import 'react-tooltip/dist/react-tooltip.css'
import './App.css';
import './assets/Styles/Global.css';

function App() {

  return (
    <>
      <Router>
        <AuthProvider>
          <NavStateProvider>
            <NavegationMenu />
            <div className='app-main'>
              <Routes>
                <Route path="/sign_in" element={<SignIn />} />
                <Route path="*" element={<Home />} />
                <Route element={<PrivateRoute allowedRoles={['admin', 'teacher', 'student']} />}>
                  <Route path="/home" element={<Home />} />
                  <Route path="/accounting-plans-test" element={<AccountingPlanList />} />
                  <Route path="/accounting-plans-test/:id" element={<AccountingPlan />} />
                  <Route path="/modes" element={<Modes />} >
                    <Route path='tarea/' element={<TaskPage />} />
                    <Route path='practica/' element={<PracticePage />} />
                    <Route path='examen/' element={<ExamPage />} />
                  </Route>
                  <Route path="/help-examples" element={<HelpExampleList />} />
                  <Route path="/help-examples/:id" element={<HelpExample />} />
                  <Route path="/add-help-example" element={<AddHelpExample />} />
                  <Route element={<PrivateRoute allowedRoles={['admin', 'teacher']} />}>
                    <Route path="/accounting-plans" element={<AccountingPlans />} />
                    <Route path="/accounting-plans/:id" element={<AccountingPlan />} />
                    <Route path="/accounts" element={<Accounts />} />
                    <Route path="/accounts/:id" element={<Account />} />
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
                      <Route path="/home" element={<Home />} >
                        <Route path='escuelas/' element={<SchoolsCenters />} />
                        <Route path='usuarios/' element={<SignUp />} />
                      </Route >

                    </Route>
                  </Route>
                </Route>
              </Routes>
            </div>
          </NavStateProvider>
        </AuthProvider>
      </Router >
    </>
  )
}

export default App;

// # A