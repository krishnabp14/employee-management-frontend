import './App.css'
import AddEmployee from './components/AddEmployee'
import ResponsiveAppBar from './components/Appbar'
import EmployeeTable from './components/EmployeeTable'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UpdateEmployee from './components/UpdateEmployee'

function App() {

  return (
    <>
      <BrowserRouter>
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={<EmployeeTable />}></Route>
          <Route path="/add" element={<AddEmployee />}></Route>
          <Route path="/update" element={<UpdateEmployee />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
