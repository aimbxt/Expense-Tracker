import { useState } from 'react'
import './ExpenseList.css'

export default function ExpenseList({ expenses, loading, onUpdate, onDelete }) {
    let content = <div className="expense-table">
        {expenses.map((expense) => <ExpenseItem expense={expense} key={expense.id} onUpdate={onUpdate} onDelete={onDelete} />)}
    </div>
    if (loading) content = <p className="muted">Loading transactions…</p>
    if (!loading && expenses.length === 0) content = <div className="empty-state"><span>✦</span><h3>No expenses yet</h3><p>Add your first expense to start seeing your spending clearly.</p></div>

    return (
        <section className="expenselist-main">
            <div className="list-heading"><div><p className="eyebrow">Recent activity</p><h2>Transactions</h2></div><span className="transaction-count">{expenses.length} total</span></div>
            {content}
        </section>
    )
}

function ExpenseItem({ expense, onUpdate, onDelete }) {
    const [editing, setEditing] = useState(false)
    const [draft, setDraft] = useState(expense)
    const formattedDate = new Date(`${expense.date}T00:00:00`).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
    const save = async (event) => {
        event.preventDefault()
        await onUpdate(expense.id, { ...draft, amount: Number(draft.amount) })
        setEditing(false)
    }

    if (editing) return (<form className="expenselist-item editing" onSubmit={save}>
        <input value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} aria-label="Description" required />
        <input type="number" min="0.01" step="0.01" value={draft.amount} onChange={(event) => setDraft({ ...draft, amount: event.target.value })} aria-label="Amount" required />
        <select value={draft.category} onChange={(event) => setDraft({ ...draft, category: event.target.value })} aria-label="Category"><option>Food</option><option>Transport</option><option>Utilities</option><option>Other</option></select>
        <input type="date" value={draft.date} onChange={(event) => setDraft({ ...draft, date: event.target.value })} aria-label="Date" required />
        <div className="expense-actions"><button type="submit">Save</button><button type="button" onClick={() => setEditing(false)}>Cancel</button></div>
    </form>)
    return (
        <article className="expenselist-item">
            <div className={`expense-icon ${expense.category?.toLowerCase()}`}>{expense.category?.charAt(0)}</div>
            <div className="expense-details"><strong>{expense.name}</strong><span>{expense.category} · {formattedDate}</span></div>
            <strong className="expense-amount">-${Number(expense.amount).toFixed(2)}</strong>
            <div className="expense-actions"><button onClick={() => setEditing(true)} aria-label={`Edit ${expense.name}`}>Edit</button><button onClick={() => onDelete(expense.id)} aria-label={`Delete ${expense.name}`}>Delete</button></div>
        </article>
    )
}



