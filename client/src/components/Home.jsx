import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import Popup from './Popup.jsx';
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import TableComponent from './TableComponent.jsx';

const Home = (props) => {
    const [data,setData]=useState([]);
    const[isEdit,setIsEdit]=useState(false);
    
useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/users/all-tables'); 
        console.log(response);
        setData(response.data.data);
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
         {data && Array.isArray(data) && data
      .filter(table => table.tableName !== "metadata")
      .map((table, index) => (
       <TableComponent data1={table} setData1={setData} key={index}/>
      ))}
      
    </div>
  )
}

export default Home
