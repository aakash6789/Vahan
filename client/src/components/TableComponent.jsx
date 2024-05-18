

import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import Popup from './Popup.jsx';
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";

const TableComponent = ({ data2,setData1,allTableData,updateParentState }) => {
  const [data, setData] = useState(data2);
  const [isEdit, setIsEdit] = useState(false);
  const [updateData, setUpdateData] = useState(null);
  const [newRow, setNewRow] = useState({});
  const [tdata,setTdata]=useState(allTableData);
  const deleteRow = async (rowIndex) => {
    const rowToDelete = data.rows[rowIndex];
    const response = await axios.post('http://localhost:3000/api/v1/users/delete-entry', { tableName: data.tableName, primaryKey:[data.primaryKey],primaryKeyValue: rowToDelete[data.primaryKey] })
      .then(res => {
        console.log("Row deletion response is", res);
        toast.success("Row deleted successfully!");
        setData(prevData => ({
          ...prevData,
          rows: prevData.rows.filter((_, index) => index !== rowIndex)
        }));
      })
      .catch(err => {
        console.log("Error while deleting row:", err);
        toast.error("Error deleting row!");
      });
  };
  const dropTable=async(Tdata)=>{
    console.log(Tdata);
    const response= await axios.post('http://localhost:3000/api/v1/users/delete-table',Tdata)
    .then(res => {
      console.log("Table deletion response is", res);
      toast.success("Table dropped successfully!");
      const filteredData=tdata.filter(table => table.tableName !== "metadata" &&table.tableName !== Tdata.tableName);
      setData1(filteredData);
      console.log("Filtered data is",filteredData);
      updateParentState(filteredData);
      
    })
    .catch(err => {
      console.log("Error while deleting row:", err);
      toast.error("Error deleting row!");
    });
  }
  // useEffect(() => {
  //   // Initialize newRow with empty values
  //   const emptyRow = {};
  //   data.columns.forEach(column => {
  //     emptyRow[column.name] = '';
  //   });
  //   setNewRow(emptyRow);
  // }, [data.columns]);

  const sendUpdatedData = async () => {
    console.log(updateData);
    const response = await axios.post('http://localhost:3000/api/v1/users/update-entry', updateData)
      .then(res => {
        console.log("Data Updation response is", res);
        toast.success("Data updated successfully!");
      })
      .catch(err => {
        console.log("Error while updating data:", err);
        toast.error("Error updating data!");
      });
  }

  const addNewRow = () => {
    setData(prevData => ({
      ...prevData,
      rows: [...prevData.rows, newRow]
    }));
    setNewRow({});
  }

  const sendNewRowData = async () => {
    console.log(newRow);
    const response = await axios.post('http://localhost:3000/api/v1/users/add-entry', { tableName: data.tableName, newRow })
      .then(res => {
        // setData(res.data.data);
        setData(prevData => ({
          ...prevData,
          rows: [...prevData.rows, newRow]
        }));
        setNewRow({});
        console.log("New row addition response is", res);
        toast.success("Row added successfully!");
      })
      .catch(err => {
        console.log("Error while adding new row:", err);
        toast.error("Error adding new row!");
      });
  }

  return (
    <div className='text-black mb-[10%] mt-[10%]'>
      <div className='mx-auto sm:w-[80%] mt-[5%]'>
        <button className='' onClick={() => setIsEdit(data.tableName)}>
          <MdEdit />
        </button>
        <button className='ml-[15%]' onClick={() =>dropTable({tableName:data.tableName})}>
          <MdDelete />
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
        {/* <button className='bg-green-500 text-white px-2 rounded-md py-1 mx-2 mt-4' onClick={addNewRow}>Add Row</button> */}
        {isEdit === data.tableName && (
          <Popup trigger={isEdit === data.tableName} setTrigger={setIsEdit}>
            <div className='h-[92vh] max-sm:w-[80vw]  max-sm:ml-[1%] max-h-[100vh] xl:w-[60vw] sm:w-[80vw] lg:[65vw] md:w-[68vw] bg-white relative rounded-lg pt-4'>
              <h2 className='text-xl font-bold ml-[5%]'>{data.tableName}</h2>
              <table id='tab_b' className='mt-[5%] ml-[5%] max-sm:mt-[10%] max-sm:ml-[2%] max-sm:max-w-[10%] max-sm:text-[0.6rem] '>
                <thead id='tab_b'>
                  <tr id='tab_b'>
                    {data.columns.map((column, index) => (
                      <th id='tab_b' key={index}>{column.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.rows.map((row, rowIndex) => (
                    <tr id='tab_b' className='' key={rowIndex}>
                      {data.columns.map((column, colIndex) => (
                        <td id='tab_b' key={colIndex}>
                          {isEdit === data.tableName ? (
                            <input
                              type={column.type}
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
                               const updatedEntry = {
                                [data.primaryKey]: row[data.primaryKey], 
                                updatedValues: {
                                    [column.name]: e.target.value
                                }
                            };
                            setUpdateData(prevUpdateData => ({
                                ...prevUpdateData,
                                tableName: data.tableName,
                                primaryKey: data.primaryKey,
                                updatedEntries: [
                                    ...(prevUpdateData?.updatedEntries || []), // Append to existing entries
                                    updatedEntry
                                ]
                            }));
                              console.log(updateData);
                             }} 
                              onClick={(e) => e.stopPropagation()}
                              onKeyDown={(e) => e.stopPropagation()}
                            />
                          ) : (
                            row[column.name]
                          )}
                        </td>
                      ))}
                      <td id='' className=''>
                        <button className='bg-red-500 text-white px-2 rounded-md py-1 mx-2' onClick={() => deleteRow(rowIndex)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr id='tab_b'>
                    {data.columns.map((column, colIndex) => (
                      <td id='tab_b' key={colIndex}>
                        <input
                          type={column.type}
                          value={newRow[column.name]}
                          onChange={(e) => {
                            setNewRow(prevNewRow => ({
                              ...prevNewRow,
                              [column.name]: e.target.value
                            }));
                          }}
                        />
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
              <button className='bg-black absolute left-1 bottom-4 text-white px-2 rounded-md py-1 mx-2' onClick={() => setIsEdit(null)}>Close</button>
              <button className='bg-black absolute right-1 bottom-4 text-white px-2 rounded-md py-1 mx-2' onClick={() => {
                sendUpdatedData();
                // sendNewRowData();
                setIsEdit(null);
              }}>Save</button>
              <button className='bg-blue-400 absolute top-2 right-2 text-white px-2 rounded-md py-1 mx-2 mt-4 ml-[45%]' onClick={addNewRow}>Add Row</button>
              <button className='bg-black absolute right-1 bottom-16 text-white px-2 rounded-md py-1 mx-2' onClick={() => {
                sendNewRowData();
                // setIsEdit(null);
              }}>Save New Row</button>
            </div>
          </Popup>
        )}
      </div>
    </div>
  )
}

export default TableComponent;
