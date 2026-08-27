const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1'

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })

  if (!response.ok) {
    let message = `Request failed (${response.status})`
    try {
      const body = await response.json()
      message = body.message || message
    } catch {
      // Keep the HTTP status when the server doesn't return JSON.
    }
    throw new Error(message)
  }

  if (response.status === 204) return null
  const text = await response.text()
  return text ? JSON.parse(text) : null
}

export const api = {
  getUsers: () => request('/user'),
  createUser: (user) => request('/user', { method: 'POST', body: JSON.stringify(user) }),
  getExpenses: (userId) => request(`/expense/user/${userId}`),
  createExpense: (userId, expense) => request(`/expense/user/${userId}`, { method: 'POST', body: JSON.stringify(expense) }),
  updateExpense: (userId, expenseId, expense) => request(`/expense/user/${userId}/expense/${expenseId}`, { method: 'PUT', body: JSON.stringify(expense) }),
  deleteExpense: (userId, expenseId) => request(`/expense/user/${userId}/expense/${expenseId}`, { method: 'DELETE' }),
}
