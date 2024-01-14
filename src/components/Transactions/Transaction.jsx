/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-expressions */

import deleteImage from "../../assets/images/delete.svg"
import editImage from "../../assets/images/edit.svg"
import { useDispatch } from "react-redux"
import {
  editActive,
  removeTransaction,
} from "../../features/transaction/transactionSlice"
import formatNumberWithCommas from "../../utils/thousandSeparator"

export default function Transaction({ transaction }) {
  const { id, name, amount, type } = transaction || {}

  const dispatch = useDispatch()

  const handleEdit = () => {
    dispatch(editActive(transaction))
  }

  const handleDelete = () => {
    dispatch(removeTransaction(id))
  }

  return (
    <li className={`transaction ${type}`}>
      <p>{name}</p>
      <div className="right">
        <p>৳ {formatNumberWithCommas(amount)}</p>
        <button className="link" onClick={handleEdit}>
          <img alt="Edit" className="icon" src={editImage} />
        </button>
        <button className="link" onClick={handleDelete}>
          <img alt="Delete" className="icon" src={deleteImage} />
        </button>
      </div>
    </li>
  )
}
