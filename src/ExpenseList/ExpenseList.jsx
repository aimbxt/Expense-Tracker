import { useState } from 'react'
import './ExpenseList.css'

export default function ExpenseList( { expenses }) {
    
    return (
        <>
            <div className="expenselist-main">
                <h1>Expenses:</h1>
                <ul>
                    {expenses.map((currentExpense, index) => (
                        <ExpenseItem expense={currentExpense} key={index}/>
                    ))}
                </ul>
            </div>
        </>
    )
}

function ExpenseItem({ expense }) {
    return (
        <li className="expenselist-item">
            {expense.name + ": " + expense.amount } 
        </li>
    )
}



