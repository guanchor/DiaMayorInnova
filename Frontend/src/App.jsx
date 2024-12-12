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

import './App.css';
import './assets/Styles/Global.css';
import TaskListAndDetails from './components/task/taskListAndDetails';
import StatementsList from './components/statements/StatementList';
import StatementForm from './components/statements/StatementForm';
import TaskEditForm from './components/task/TaskEditForm';
import Modes from './pages/modes/Modes';
import EntriesSection from './components/entries-section/EntriesSection';
import PracticePage from './pages/practice-page/PracticePage';

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
                  <Route path="/accounting-plans" element={<AccountingPlanList />} />
                  <Route path="/accounting-plans/:id" element={<AccountingPlan />} />
                  <Route path="/modes" element={<Modes />} >
                    <Route path='tarea/:id' element={<TaskPage />} />
                    <Route path='practica/' element={<PracticePage />} />
                    <Route path='examen/:id' element={<EntriesSection />} />
                  </Route>
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
      </Router >
    </>
  )
}

export default App;
