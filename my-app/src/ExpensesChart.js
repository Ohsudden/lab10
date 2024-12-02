// ExpensesChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from 'chart.js';

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement);

function ExpensesChart({ expenses }) {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Prepare data for each month
  const monthlyExpenses = Array(12).fill(0);
  expenses.forEach((expense) => {
    const month = expense.date.getMonth();
    monthlyExpenses[month] += expense.amount;
  });

  const data = {
    labels: months,
    datasets: [
      {
        label: 'Expenses by Month',
        data: monthlyExpenses,
        backgroundColor: 'rgba(75,192,192,0.6)',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    // Optional: Make the chart responsive
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div style={{ width: '400px', height: '200px', margin: '0 auto' }}>
      <Bar data={data} options={options} />
    </div>
  );
}

export default ExpensesChart;