import { useState } from 'react';
import './DashBoard.css';

export default function DashBoard( { expenses }) {
    return (
        <>
        <div className="dashboard-main">
            <h1>Dashboard</h1>
            <div className="summarySection">
                <SummaryComponent name={"Balance: $10,950"} />
                <SummaryComponent name={"Budget: $20,000"} />
                <SummaryComponent name={"Income: $560"} />
            </div>
            <div className="addExpenseSection">
                <AddExpenseBox />
                <ExpenseChart />
            </div>
        </div>
        </>
    )
}

function SummaryComponent( {name} ) {
    return (
        <div className="summaryComponent">
            <h2>{name}</h2>
        </div>
    )
}

function AddExpenseBox() {
    return (
        <div className="addExpenseBox">
            <button>Add Expense</button>
            <h4>Description:</h4>
            <input type="text" />
            <div className="desc-cat">
                <h4>Amount:</h4>
                <input type="text" />
                <h4>Category:</h4>
                <label htmlForfor="cars">Choose a car:</label>
                <select id="cars" name="cars">
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="fiat">Fiat</option>
                    <option value="audi">Audi</option>
                </select>
            </div>
            <h4>Date:</h4>
            <input type="date" />
        </div>
    )
}

function ExpenseChart() {
    return (
        <div className="expenseChart">
            Chart
        </div>
    )
}