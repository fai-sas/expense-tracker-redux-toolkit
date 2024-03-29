/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-expressions */

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  createTransaction,
  fetchTransactions,
  updateTransaction,
} from "../features/transaction/transactionSlice"

export default function Form() {
  const [name, setName] = useState("")
  const [type, setType] = useState("")
  const [amount, setAmount] = useState("")
  const [editMode, setEditMode] = useState(false)
  const dispatch = useDispatch()

  const data = { name, type, amount: Number(amount) }

  const { editing, isLoading, isError } = useSelector(
    (state) => state.transaction,
  )

  //   const editing = useSelector((state) => state.editing)

  useEffect(() => {
    dispatch(fetchTransactions())
  }, [dispatch])

  useEffect(() => {
    const { id, name, type, amount } = editing || {}
    if (id) {
      setEditMode(true)
      setName(name)
      setType(type)
      setAmount(amount)
    } else {
      setEditMode(false)
      reset()
    }
  }, [editing])

  const reset = () => {
    setName("")
    setType("")
    setAmount("")
  }

  const handleCreate = (e) => {
    e.preventDefault()

    dispatch(createTransaction(data))
    reset()
  }

  const handleUpdate = (e) => {
    e.preventDefault()

    // const data = { name, type, amount: Number(amount) }

    dispatch(updateTransaction({ id: editing?.id, data }))
    setEditMode(false)
    reset()
  }

  const cancelEditMode = () => {
    setEditMode(false)
    reset()
  }

  return (
    <div className="form">
      <h3>Add new transaction</h3>

      <form onSubmit={editMode ? handleUpdate : handleCreate}>
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
          {editMode ? "Update Transaction" : " Add Transaction"}
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
