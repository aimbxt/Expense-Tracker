import { useState } from 'react'
import './App.css'
import SideBar from './SideBar/SideBar.jsx'
import DashBoard from './DashBoard/DashBoard.jsx'
import ExpenseList from './ExpenseList/ExpenseList.jsx'

function App() {
  const [expenses, setExpenses] = useState([{name: "Placeholder", amount: "$100", category: "Food", date: "1-1-26"}])
  
  return (
    <>
      <div className="body">
        <SideBar />
        <DashBoard expenses={expenses}/>
        <ExpenseList expenses={expenses}/>
      </div>
    </>
  )
}

export default App
