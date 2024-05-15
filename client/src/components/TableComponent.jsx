import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import Popup from './Popup.jsx';
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
const TableComponent = ({data1}) => {
    const [data,setData]=useState(data1);
    const[isEdit,setIsEdit]=useState(false);
    

  return (
    <div className='text-black mb-[10%] mt-[10%]'>
    
        <div className='mx-auto sm:w-[80%] mt-[5%]' >
          <button className='' onClick={() => setIsEdit(data.tableName)}>
            <MdEdit />
          </button>
          <h2 className='text-xl font-bold'>{data.tableName}</h2>
          <table id='tab_b' className='mt-[2%]'>
            <thead>
              <tr id='tab_b'>
                {data.columns.map((column, index) => (
                  <th id='tab_b' key={index}>{column.name}</th>
                ))}
              </tr>
            </thead>
            <tbody id='tab_b'>
              {data.rows.map((row, rowIndex) => (
                <tr id='tab_b' key={rowIndex}>
                  {data.columns.map((column, colIndex) => (
                    <td id='tab_b' key={colIndex}>{row[column.name]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {isEdit === data.tableName && (
            <Popup trigger={isEdit === data.tableName} setTrigger={setIsEdit}>
              <div className='h-[82vh] w-[46vw] bg-white relative rounded-lg pt-4'>
                <h2 className='text-xl font-bold ml-[5%]'>{data.tableName}</h2>
                <table  id='tab_b' className='mt-[2%] ml-[5%]'>
                  <thead id='tab_b'>
                    <tr id='tab_b'>
                      {data.columns.map((column, index) => (
                        <th id='tab_b' key={index}>{column.name}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.rows.map((row, rowIndex) => (
                     <tr id='tab_b' key={rowIndex}>
                     {data.columns.map((column, colIndex) => (
                       <td id='tab_b' key={colIndex}>
                         {isEdit === data.tableName ? ( // Compare isEdit directly with tableName
                           <input 
                             type={column.type} // Set the type dynamically based on column type
                             value={row[column.name]} 
                             onChange={(e) => {
                                e.stopPropagation();
                               const updatedRows = [...data.rows];
                               updatedRows[rowIndex][column.name] = e.target.value;
                               setData(prevData => ({
                                 ...prevData,
                                 [rowIndex]: {
                                   ...prevData[rowIndex],
                                   [column.name]:e.target.value
                                 }
                               }));
                             }} 
                             onClick={(e) => e.stopPropagation()}
                             onKeyDown={(e) => e.stopPropagation()}
                           />
                         ) : (
                           row[column.name] // Render text when popup is closed
                         )}
                       </td>
                     ))}
                   </tr>
                    ))}
                  </tbody>
                </table>
                <button className='bg-black absolute left-1 bottom-4 text-white px-2 rounded-md py-1 mx-2' onClick={() => setIsEdit(null)}>Close</button>
                <button className='bg-black absolute right-1 bottom-4 text-white px-2 rounded-md py-1 mx-2' onClick={() => {
                    console.log("U", data);
                    setIsEdit(null)}}>Save</button>
              </div>
            </Popup>
          )}
        </div>
     
  </div>
  )
}

export default TableComponent;
