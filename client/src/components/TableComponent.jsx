import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import Popup from './Popup.jsx';
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
const TableComponent = () => {
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
    <div className='text-black mb-[10%] mt-[10%]'>
      {data && Array.isArray(data) && data
      .filter(table => table.tableName !== "metadata")
      .map((table, index) => (
        <div className='mx-auto sm:w-[80%] mt-[5%]' key={index}>
            <Popup trigger={isEdit} setTrigger={setIsEdit} >
        {/* <h1>Pop activated</h1> */}
        <div className='h-auto bg-white relative rounded-lg pt-4' >     
      <MdDelete className='absolute bottom-3 left-[49%] cursor-pointer ' onClick={()=>{
        setIsEdit(!isEdit);
        }}></MdDelete>
      <button className='absolute left-1 bottom-1 bg-black text-white px-2 rounded-md py-1 mx-2' onClick={() => {
setIsEdit(!isEdit);
  console.log("isEdit toggled:", isEdit);
}} >Close</button>
      <button className='absolute right-1 bottom-1 bg-black text-white px-2 rounded-md py-1 mx-2' onClick={() => {
  setIsEdit(!isEdit);
  console.log("isEdit toggled:", isEdit);

}} >Save</button>
        </div>
      </Popup>
      <button className='' onClick={() => {
  setIsEdit(!isEdit);
  // console.log("isEdit", isEdit);
}}><MdEdit /></button>
          <h2 className='text-xl font-bold'>{table.tableName}</h2>
          <table id='tab_b' className='mt-[2%] '>
            <thead id='tab_b'>
              <tr>
                {table.columns.map((column, index) => (
                  <th id='tab_b' key={index}>{column.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row, index) => (
                <tr id='tab_b' key={index}>
                  {table.columns.map((column, index) => (
                    <td id='tab_b' key={index}>{row[column.name]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
      
    </div>
  )
}

export default TableComponent;
