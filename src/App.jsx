import { useState } from 'react'
import './App.css'
import SideBar from './SideBar/SideBar.jsx'
import DashBoard from './DashBoard/DashBoard.jsx'
import ExpenseList from './ExpenseList/ExpenseList.jsx'

function App() {
  const [expenses, setExpenses] = useState([{name: "Placeholder", amount: "$100", category: "Food", date: "1-1-26"}])

  const addExpense = (name, amount, category, date) => {
    setExpenses([...expenses.slice(), {name: name, amount: amount, category: category, date: date}])
  }
  
  return (
    <>
      <div className="body">
        <SideBar />
        <DashBoard addExpenseFn={addExpense}/>
        <ExpenseList expenses={expenses}/>
      </div>
    </>
  )
}

export default App
