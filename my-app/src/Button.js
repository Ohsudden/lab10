// Button.js
import React, { useState } from 'react';
import './App.css';
import { addExpense } from './crud_service'; 
function CreateForm({ setShowForm, fetchExpenses }) {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const amount = parseFloat(event.target.amount.value);
    const date = new Date(event.target.date.value);

    const newExpense = { title, amount, date };

    try {
      await addExpense(newExpense); 
      fetchExpenses();             
      setShowForm(false);           
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  return (
    <form id="newform" onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="Title" required />
      <input type="number" name="amount" placeholder="Amount" step="0.01" required />
      <input type="date" name="date" required />
      <button type="submit" id="submit">Submit</button>
    </form>
  );
}

function Button({ fetchExpenses }) {
  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    setShowForm(true);
  };

  return (
    <div>
      <button onClick={handleClick}>Add Expense</button>
      {showForm && (
        <CreateForm setShowForm={setShowForm} fetchExpenses={fetchExpenses} />
      )}
    </div>
  );
}

export default Button;