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
  editing: {},
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

// create slice

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    editActive: (state, action) => {
      state.editing = action.payload
    },
    editInActive: (state) => {
      state.editing = {}
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.isError = false
        state.isLoading = true
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isError = false
        state.isLoading = false
        state.transactions = action.payload
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.transactions = []
        state.error = action.error?.message
      })
      .addCase(createTransaction.pending, (state) => {
        state.isError = false
        state.isLoading = true
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.isError = false
        state.isLoading = false
        state.transactions.push(action.payload)
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.error = action.error?.message
      })
      .addCase(updateTransaction.pending, (state) => {
        state.isError = false
        state.isLoading = true
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        state.isError = false
        state.isLoading = false
        const indexToUpdate = state.transactions.findIndex(
          (transaction) => transaction.id === action.payload.id,
        )
        state.transactions[indexToUpdate] = action.payload
      })
      .addCase(updateTransaction.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.error = action.error?.message
      })
      .addCase(removeTransaction.pending, (state) => {
        state.isError = false
        state.isLoading = true
      })
      .addCase(removeTransaction.fulfilled, (state, action) => {
        console.log(action)
        state.isError = false
        state.isLoading = false
        state.transactions = state.transactions.filter(
          // (transaction) => transaction.id !== action.payload,
          (transaction) => transaction.id !== action.meta.arg,
        )
      })
      .addCase(removeTransaction.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.error = action.error?.message
      })
  },
})

export default transactionSlice.reducer
export const { editActive, editInActive } = transactionSlice.actions
