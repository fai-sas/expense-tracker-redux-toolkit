/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */

export default function Layout({ children }) {
  return (
    <div className="App">
      <div className="header">
        <h1>Expense Tracker</h1>
      </div>

      <div className="main">
        <div className="container">{children}</div>
      </div>

      <div className="footer">&copy;2024 Expense Tracker</div>
    </div>
  )
}
