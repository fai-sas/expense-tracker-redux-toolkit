/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-expressions */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import {
  getTransactions,
  addTransaction,
  editTransaction,
  deleteTransaction,
} from "./transactionAPI"

const initialState = {
  transactions: [],
  isLoading: false,
  isError: false,
  error: "",
}

// async thunks

export const fetchTransactions = createAsyncThunk(
  "transaction/fetchTransactions",
  async () => {
    const transactions = await getTransactions()
    return transactions
  },
)

export const createTransaction = createAsyncThunk(
  "transaction/createTransaction",
  async (data) => {
    const transaction = await addTransaction(data)
    return transaction
  },
)

export const updateTransaction = createAsyncThunk(
  "transaction/updateTransaction",
  async ({ id, data }) => {
    const transaction = await editTransaction(id, data)
    return transaction
  },
)

export const removeTransaction = createAsyncThunk(
  "transaction/removeTransaction",
  async (id) => {
    const transaction = await deleteTransaction(id)
    return transaction
  },
)
