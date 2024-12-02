// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import Button from './Button';
import Filter from './Filter';
import ExpensesChart from './ExpensesChart';
import Loader from './loader'; 
import { getExpenses, updateExpense, deleteExpense } from './crud_service';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [loading, setLoading] = useState(true); 

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const expensesData = await getExpenses();
      setExpenses(expensesData);
      await new Promise(resolve => setTimeout(resolve, 3000));
    } catch (error) {
      console.error('Error fetching expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const filterByYear = (year) => {
    setSelectedYear(year);
  };

  const filteredExpenses = selectedYear
    ? expenses.filter((expense) => expense.date.getFullYear() === selectedYear)
    : expenses;

  const handleUpdate = async (id) => {
    const updatedExpense = {
      title: prompt('Enter new title:', 'Updated Item'),
      amount: parseFloat(prompt('Enter new amount:', '200')),
      date: new Date(),
    };
    try {
      await updateExpense(id, updatedExpense);
      fetchExpenses();
    } catch (error) {
      console.error('Error updating expense:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteExpense(id);
      fetchExpenses();
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const listItems = filteredExpenses.map((expense) => (
    <div className="card expense-item" key={expense.id}>
      <div className="expense-date">
        <div className="expense-date__month">
          {months[expense.date.getMonth()]}
        </div>
        <div className="expense-date__year">
          {expense.date.getFullYear()}
        </div>
        <div className="expense-date__day">
          {expense.date.getDate()}
        </div>
      </div>
      <div className="expense-item__description">
        <h2>{expense.title}</h2>
        <div className="expense-item__price">${expense.amount}</div>
        <button onClick={() => handleUpdate(expense.id)}>Update</button>
        <button onClick={() => handleDelete(expense.id)}>Delete</button>
      </div>
    </div>
  ));

  return (
    <div className="App">
      <h1>My Expenses Template</h1>
      <Button fetchExpenses={fetchExpenses} />
      <Filter filterByYear={filterByYear} />
      <ExpensesChart expenses={filteredExpenses} />
      {loading ? (
        <Loader /> 
      ) : (
        <div className="card expenses">
          {listItems}
        </div>
      )}
    </div>
  );
}

export default App;