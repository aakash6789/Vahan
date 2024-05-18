import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar.jsx'
import CreateTableForm from './components/CreateTableForm.jsx'
import TableComponent from './components/TableComponent.jsx'
import Home from './components/Home.jsx';

import {
  RouterProvider,
  NavLink,
  Router,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from './components/Layout.jsx'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route
        path=""
        element={
          <>
           <CreateTableForm/>
          </>
        }
      />
      <Route path="/view-tables" element={<Home/>} />
     
    </Route>
  )
);
function App() {
 

  return (
    <>
      {/* <Navbar/>
      <CreateTableForm/>
  
      <Home/> */}
        <RouterProvider router={router} />
    </>
  )
}

export default App
