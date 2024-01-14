/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-expressions */

import { useSelector } from "react-redux"

export default function Balance() {
  const { transactions } = useSelector((state) => state.transaction)

  const calculateIncome = (transactions) => {}

  return (
    <div className="top_card">
      <p>Your Current Balance</p>
      <h3>
        <span>৳ </span>
        {transactions?.length > 0 ? (
          <span>{calculateIncome(transactions)}</span>
        ) : (
          0
        )}
      </h3>
    </div>
  )
}
