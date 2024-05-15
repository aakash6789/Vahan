import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
const TableComponent = () => {
    const [data,setData]=useState([]);
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
  }, [data]);
  return (
    <div className='text-black mb-[10%] mt-[10%]'>
      {data && Array.isArray(data) && data
      .filter(table => table.tableName !== "metadata")
      .map((table, index) => (
        <div className='mx-auto sm:w-[80%] mt-[5%]' key={index}>
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
