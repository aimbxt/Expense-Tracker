import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { api } from './api.js'
import SideBar from './SideBar/SideBar.jsx'
import DashBoard from './DashBoard/DashBoard.jsx'
import ExpenseList from './ExpenseList/ExpenseList.jsx'

function App() {
  const [users, setUsers] = useState([])
  const [selectedUserId, setSelectedUserId] = useState(null)
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const selectedUser = users.find((user) => user.id === selectedUserId) || null

  useEffect(() => {
    api.getUsers()
      .then((loadedUsers) => {
        setUsers(loadedUsers)
        setSelectedUserId(loadedUsers[0]?.id || null)
      })
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (!selectedUserId) {
      setExpenses([])
      return
    }
    setLoading(true)
    api.getExpenses(selectedUserId)
      .then(setExpenses)
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false))
  }, [selectedUserId])

  const addExpense = async (expense) => {
    setSaving(true)
    setError('')
    try {
      await api.createExpense(selectedUserId, expense)
      setExpenses(await api.getExpenses(selectedUserId))
    } catch (requestError) {
      setError(requestError.message)
      throw requestError
    } finally {
      setSaving(false)
    }
  }

  const updateExpense = async (expenseId, expense) => {
    await api.updateExpense(selectedUserId, expenseId, expense)
    setExpenses(await api.getExpenses(selectedUserId))
  }

  const deleteExpense = async (expenseId) => {
    await api.deleteExpense(selectedUserId, expenseId)
    setExpenses((currentExpenses) => currentExpenses.filter((expense) => expense.id !== expenseId))
  }

  const createUser = async (username) => {
    const newUser = await api.createUser({ username, password: 'local-user' })
    const loadedUsers = await api.getUsers()
    setUsers(loadedUsers)
    setSelectedUserId(newUser?.id || loadedUsers.find((user) => user.username === username)?.id)
  }

  const totalSpent = useMemo(() => expenses.reduce((total, expense) => total + Number(expense.amount || 0), 0), [expenses])
  const balance = Number(selectedUser?.balance || 0)
  
  return (
    <>
      <div className="body">
        <SideBar users={users} selectedUserId={selectedUserId} onSelectUser={setSelectedUserId} onCreateUser={createUser} />
        <main className="app-content">
          {error && <div className="error-banner" role="alert">{error}<button onClick={() => setError('')} aria-label="Dismiss error">×</button></div>}
          <DashBoard user={selectedUser} expenses={expenses} totalSpent={totalSpent} balance={balance} loading={loading} saving={saving} addExpenseFn={addExpense} />
          <ExpenseList expenses={expenses} loading={loading} onUpdate={updateExpense} onDelete={deleteExpense} />
        </main>
      </div>
    </>
  )
}

export default App
