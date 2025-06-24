import { useState } from 'react'
import './ExpenseList.css'

export default function ExpenseList( { expenses }) {
    const list = (expenses) => {
        return (
            <ul>
                {expenses.map((currentExpense, index) => (
                    <ExpenseItem expense={currentExpense} key={index}/>
                ))}
            </ul>
        )
    }

    return (
        <>
            <div className="expenselist-main">
                <h1>Expenses:</h1>
            </div>
        </>
    )
}

function ExpenseItem( { expense }) {
    return (
        <li>
            {expense.name}
        </li>
    )
}



