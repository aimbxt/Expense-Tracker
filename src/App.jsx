import { useState } from 'react'
import './App.css'
import SideBar from './SideBar'
import DashBoard from './DashBoard'
import ExpenseList from './ExpenseList'

function App() {
  const [expenses, setExpenses] = useState([{name: "Placeholder", amount: "$100"}])
  
  return (
    <>
      <div className="body">
        <SideBar />
        <DashBoard />
        <ExpenseList expenses={expenses}/>
      </div>
    </>
  )
}

export default App
