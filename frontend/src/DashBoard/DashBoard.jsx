import { useState } from 'react';
import './DashBoard.css';

export default function DashBoard({ user, expenses, totalSpent, balance, loading, saving, addExpenseFn }) {
    const [descText, setDescText] = useState("");
    const [amountText, setAmountText] = useState("");
    const [categoryText, setCategoryText] = useState("");
    const [dateText, setDateText] = useState("");
    const [invalidFields, setInvalidFields] = useState([]);

    const handleAddExpense = async (event) => {
        event.preventDefault();
        const missing = [];
        if (!descText) {missing.push("desc");}
        if (!amountText || Number.isNaN(Number(amountText)) || Number(amountText) <= 0) {missing.push("amount");}
        if (!categoryText) {missing.push("category");}
        if (!dateText) {missing.push("date");}

        setInvalidFields(missing);

        if (missing.length === 0) {
            await addExpenseFn({ name: descText.trim(), amount: Number(amountText), category: categoryText, date: dateText });
            setDescText("");
            setAmountText("");
            setCategoryText("");
            setDateText("");
        }
    }

    return (
        <>
        <div className="dashboard-main">
            <div className="page-heading"><div><p className="eyebrow">{user ? `Good morning, ${user.username}` : 'Get started'}</p><h1>Overview</h1></div><span className="date-pill">{new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span></div>
            <div className="summarySection">
                <SummaryComponent label="Total spent" value={totalSpent} detail={`${expenses.length} transactions`} accent="purple" />
                <SummaryComponent label="Account balance" value={balance} detail="Tracked balance" accent="green" />
                <SummaryComponent label="Average expense" value={expenses.length ? totalSpent / expenses.length : 0} detail="Per transaction" accent="orange" />
            </div>
            <div className="addExpenseSection">
                <AddExpenseBox disabled={!user || saving} saving={saving} descText={descText} setDescText={setDescText} amountText={amountText} setAmountText={setAmountText}
                categoryText={categoryText} setCategoryText={setCategoryText} dateText={dateText} setDateText={setDateText} 
                onAddExpense={handleAddExpense} invalidFields={invalidFields} setInvalidFields={setInvalidFields}/>
                <ExpenseChart expenses={expenses} loading={loading} />
            </div>
        </div>
        </>
    )
}

function SummaryComponent({ label, value, detail, accent }) {
    return (
        <div className={`summaryComponent ${accent}`}>
            <p>{label}</p><h2>${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2><span>{detail}</span>
        </div>
    )
}

function AddExpenseBox({ disabled, saving, descText, setDescText, amountText, setAmountText, 
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
        <form className="addExpenseBox" onSubmit={onAddExpense}>
            <div className="section-title"><div><p className="eyebrow">Quick entry</p><h3>Add an expense</h3></div><span className="plus-icon">+</span></div>
            <label>Description<input type="text" value={descText} onChange={handleDescChange} placeholder="e.g. Coffee with friends" className={invalidFields.includes("desc") ? "invalid" : ""} disabled={disabled}/></label>
            <div className="form-row"><label>Amount<input type="number" min="0.01" step="0.01" value={amountText} onChange={handleAmountChange} placeholder="0.00"
                className={invalidFields.includes("amount") ? "invalid" : ""}/>
                </label><label>Category<select id="category" value={categoryText} onChange={handleCategoryChange}
                className={invalidFields.includes("category") ? "invalid" : ""}>
                    <option value="">Select...</option>
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Other">Other</option>
                </select></label></div>
            <label>Date<input type="date" value={dateText} onChange={handleDateChange} className={invalidFields.includes("date") ? "invalid" : ""} disabled={disabled}/></label>
            <button className="primary-button" type="submit" disabled={disabled}>{saving ? 'Saving…' : disabled ? 'Create an account first' : 'Add expense'} <span>→</span></button>
        </form>
    )
}

function ExpenseChart({ expenses, loading }) {
    const categories = expenses.reduce((totals, expense) => ({ ...totals, [expense.category]: (totals[expense.category] || 0) + Number(expense.amount) }), {})
    const largest = Math.max(...Object.values(categories), 1)
    return (
        <div className="expenseChart">
            <div className="section-title"><div><p className="eyebrow">Spending habits</p><h3>By category</h3></div><span className="chart-symbol">◒</span></div>
            {loading ? <p className="muted">Loading your spending…</p> : Object.keys(categories).length ? Object.entries(categories).map(([category, amount]) => <div className="category-row" key={category}><div><span className={`category-dot ${category.toLowerCase()}`} />{category}<strong>${amount.toFixed(2)}</strong></div><div className="bar"><i style={{ width: `${(amount / largest) * 100}%` }} /></div></div>) : <p className="muted">Your category breakdown will appear here.</p>}
        </div>
    )
}