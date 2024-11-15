import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import AddAccountingPlan from './components/AddAccountingPlan'
import AccountingPlanList from './components/ListAccountingPlan'
import { BrowserRouter , Routes , Route} from 'react-router-dom'
import AccountingPlan from './components/AccountingPlan'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/accounting-plans" element={<AccountingPlanList/>}/>
          <Route path="/add" element={<AddAccountingPlan/>}/>
          <Route path="/accounting-plans/:id" element={<AccountingPlan/>}/>
          <Route path="/home" element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
