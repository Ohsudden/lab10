import { db } from './firebase';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
} from 'firebase/firestore';

const expensesCollectionRef = collection(db, 'expenses');

export const addExpense = async (expense) => {
  try {
    const expenseWithTimestamp = {
      ...expense,
      date: Timestamp.fromDate(expense.date),
    };
    const docRef = await addDoc(expensesCollectionRef, expenseWithTimestamp);
    return { id: docRef.id, ...expense };
  } catch (error) {
    console.error('Failed to catch expense: ', error);
    throw error;
  }
};

export const getExpenses = async () => {
  try {
    const querySnapshot = await getDocs(expensesCollectionRef);
    const expenses = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        date: data.date.toDate(),
      };
    });
    return expenses;
  } catch (error) {
    console.error('Failed to catch expense: ', error);
    return [];
  }
};

export const updateExpense = async (id, updatedExpense) => {
  try {
    const expenseDocRef = doc(db, 'expenses', id);
    const updatedExpenseWithTimestamp = {
      ...updatedExpense,
      date: Timestamp.fromDate(updatedExpense.date),
    };
    await updateDoc(expenseDocRef, updatedExpenseWithTimestamp);
    return { id, ...updatedExpense };
  } catch (error) {
    console.error('Failed to update expense: ', error);
    throw error;
  }
};

export const deleteExpense = async (id) => {
  try {
    const expenseDocRef = doc(db, 'expenses', id);
    await deleteDoc(expenseDocRef);
  } catch (error) {
    console.error('Failed to delete expense:  ', error);
    throw error;
  }
};