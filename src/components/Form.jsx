/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-expressions */

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  createTransaction,
  fetchTransactions,
} from "../features/transaction/transactionSlice"

export default function Form() {
  const [name, setName] = useState("")
  const [type, setType] = useState("")
  const [amount, setAmount] = useState("")
  const [editMode, setEditMode] = useState(false)
  const dispatch = useDispatch()

  const { isLoading, isError } = useSelector((state) => state.transaction)

  useEffect(() => {
    dispatch(fetchTransactions())
  }, [dispatch])

  const reset = () => {
    setName("")
    setType("")
    setAmount("")
  }

  const handleCreate = (e) => {
    e.preventDefault()

    const data = { name, type, amount: Number(amount) }

    dispatch(createTransaction(data))
    reset()
  }

  const cancelEditMode = () => {
    setEditMode(false)
  }

  return (
    <div className="form">
      <h3>Add new transaction</h3>

      <form onSubmit={handleCreate}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group radio">
          <label>Type</label>
          <div className="radio_group">
            <input
              type="radio"
              value={type}
              name="type"
              checked={type === "income"}
              onChange={(e) => setType("income")}
              required
            />
            <label>Income</label>
          </div>
          <div className="radio_group">
            <input
              type="radio"
              value="expense"
              name="type"
              placeholder="Expense"
              checked={type === "expense"}
              onChange={(e) => setType("expense")}
              required
            />
            <label>Expense</label>
          </div>
        </div>

        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            placeholder="enter amount"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn" disabled={isLoading}>
          Add Transaction
        </button>

        {!isLoading && isError && (
          <p className="error">There was an error occurred</p>
        )}
      </form>
      {editMode && (
        <button className="btn cancel_edit" onClick={cancelEditMode}>
          Cancel Edit
        </button>
      )}
    </div>
  )
}
