import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar.jsx'
import CreateTableForm from './components/CreateTableForm.jsx'
import TableComponent from './components/TableComponent.jsx'
function App() {
 

  return (
    <>
      <Navbar/>
      <CreateTableForm/>
      <TableComponent/>
    </>
  )
}

export default App
