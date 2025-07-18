import { useState } from 'react';
import './DashBoard.css';

export default function DashBoard({addExpenseFn}) {
    const [descText, setDescText] = useState("");
    const [amountText, setAmountText] = useState("");
    const [categoryText, setCategoryText] = useState("");
    const [dateText, setDateText] = useState("");
    const [invalidFields, setInvalidFields] = useState([]);

    const handleAddExpense = () => {
        const missing = [];
        if (!descText) {missing.push("desc");}
        if (!amountText || isNaN(amountText)) {missing.push("amount");}
        if (!categoryText) {missing.push("category");}
        if (!dateText) {missing.push("date");}

        setInvalidFields(missing);

        if (missing.length === 0) {
            addExpenseFn(descText, amountText, categoryText, dateText);
            setDescText("");
            setAmountText("");
            setCategoryText("");
            setDateText("");
        }
        else {
            alert("Fill in all fields!");
        }
    }

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
                <AddExpenseBox descText={descText} setDescText={setDescText} amountText={amountText} setAmountText={setAmountText}
                categoryText={categoryText} setCategoryText={setCategoryText} dateText={dateText} setDateText={setDateText} 
                onAddExpense={handleAddExpense} invalidFields={invalidFields} setInvalidFields={setInvalidFields}/>
                <ExpenseChart />
            </div>
        </div>
        </>
    )
}

function SummaryComponent({name}) {
    return (
        <div className="summaryComponent">
            <h2>{name}</h2>
        </div>
    )
}

function AddExpenseBox({descText, setDescText, amountText, setAmountText, 
    categoryText, setCategoryText, dateText, setDateText, onAddExpense, invalidFields, setInvalidFields}) {
    const handleDescChange = (e) => {
        setDescText(e.target.value);
        setInvalidFields(fields => fields.filter(f => f !== "desc"));
    };
    const handleAmountChange = (e) => {
        setAmountText(e.target.value);
        setInvalidFields(fields => fields.filter(f => f !== "amount"));
    };
    const handleCategoryChange = (e) => {
        setCategoryText(e.target.value);
        setInvalidFields(fields => fields.filter(f => f !== "category"));
    };
    const handleDateChange = (e) => {
        setDateText(e.target.value);
        setInvalidFields(fields => fields.filter(f => f !== "date"));
    };

    return (
        <div className="addExpenseBox">
            <h4>Description:</h4>
            <input type="text" value={descText} onChange={handleDescChange} className={invalidFields.includes("desc") ? "invalid" : ""}/>
            <div className="desc-cat">
                <h4>Amount:</h4>
                <input type="text" value={amountText} onChange={handleAmountChange} 
                className={invalidFields.includes("amount") ? "invalid" : ""}/>
                <h4>Category:</h4>
                <label htmlFor="category">Choose a category:</label>
                <select id="category" value={categoryText} onChange={handleCategoryChange}
                className={invalidFields.includes("category") ? "invalid" : ""}>
                    <option value="">Select...</option>
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <h4>Date:</h4>
            <input type="date" value={dateText} onChange={handleDateChange} 
            className={invalidFields.includes("date") ? "invalid" : ""}/>
            <button onClick={onAddExpense}>Add Expense</button>
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