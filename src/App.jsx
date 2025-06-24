import { useState } from 'react'
import './App.css'
import SideBar from './SideBar'
import DashBoard from './DashBoard'
import ExpenseList from './ExpenseList'

function App() {
  const [expenses, setExpenses] = useState([{Name: "", Amount: ""}])
  
  return (
    <>
      <div className="body">
        <SideBar />
        <DashBoard />
        <ExpenseList />
      </div>
    </>
  )
}

export default App
