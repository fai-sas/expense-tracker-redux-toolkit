/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */

import Balance from "./components/Balance.jsx"
import Form from "./components/Form.jsx"
import Layout from "./components/Layout.jsx"
import Transactions from "./components/Transactions/Transactions.jsx"

function App() {
  return (
    <Layout>
      <Balance />
      <Form />
      <Transactions />
    </Layout>
  )
}

export default App
