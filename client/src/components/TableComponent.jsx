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
          <button className='' onClick={() => setIsEdit(table.tableName)}>
            <MdEdit />
          </button>
          <h2 className='text-xl font-bold'>{table.tableName}</h2>
          <table id='tab_b' className='mt-[2%]'>
            <thead>
              <tr id='tab_b'>
                {table.columns.map((column, index) => (
                  <th id='tab_b' key={index}>{column.name}</th>
                ))}
              </tr>
            </thead>
            <tbody id='tab_b'>
              {table.rows.map((row, rowIndex) => (
                <tr id='tab_b' key={rowIndex}>
                  {table.columns.map((column, colIndex) => (
                    <td id='tab_b' key={colIndex}>{row[column.name]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {/* Popup for editing */}
          {isEdit === table.tableName && (
            <Popup trigger={isEdit === table.tableName} setTrigger={setIsEdit}>
              <div className='h-[82vh] w-[38vw] bg-white relative rounded-lg pt-4'>
                <h2 className='text-xl font-bold ml-[5%]'>{table.tableName}</h2>
                <table  id='tab_b' className='mt-[2%] ml-[5%]'>
                  <thead id='tab_b'>
                    <tr id='tab_b'>
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
                <button className='bg-black absolute left-1 bottom-4 text-white px-2 rounded-md py-1 mx-2' onClick={() => setIsEdit(null)}>Close</button>
                <button className='bg-black absolute right-1 bottom-4 text-white px-2 rounded-md py-1 mx-2' onClick={() => setIsEdit(null)}>Save</button>
              </div>
            </Popup>
          )}
        </div>
      ))}
  </div>
  )
}

export default TableComponent;
