import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import Popup from './Popup.jsx';
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import TableComponent from './TableComponent.jsx';

const Home = (props) => {
    const [data1,setData1]=useState([]);
    const[isEdit,setIsEdit]=useState(false);
    const updateParentState = (newValue) => {
      // setData1(newValue);
      console.log("New data is",data1);
      
    };
     
useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/users/all-tables'); 
        console.log(response);
        setData1(response.data.data);
      } catch (error) {
        console.error('Error fetching table data:', error);
        toast.error(error.message)
        // Handle error
      }
    };

    fetchData();
  }, []);
  return (
    <div>
         {data1 && Array.isArray(data1) && data1
      .filter(table => table.tableName !== "metadata")
      .map((table, index) => (
       <TableComponent data2={table} setData1={setData1} updateParentState={updateParentState} allTableData={data1} key={index}/>
      ))}
      
    </div>
  )
}

export default Home
