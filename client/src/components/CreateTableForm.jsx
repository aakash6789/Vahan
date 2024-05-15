import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
const CreateTableForm = () => {
  const [tableName, setTableName] = useState('');
  const [columns, setColumns] = useState([{ name: '', type: '' }]);

  const handleColumnNameChange = (index, event) => {
    const newColumns = [...columns];
    newColumns[index].name = event.target.value;
    setColumns(newColumns);
  };

//   const handleColumnTypeChange = (index, event) => {
//     console.log(event);
//     const newColumns = [...columns];
//     newColumns[index].type = event.target.value;
//     setColumns(newColumns);
//   };
  const handleColumnTypeChange = (index, event) => {
    console.log(event);
    const newColumns = [...columns];
    newColumns[index].type = event;
    setColumns(newColumns);
  };

  const handleAddColumn = () => {
    setColumns([...columns, { name: '', type: '' }]);
  };

  const handleRemoveColumn = index => {
    const newColumns = [...columns];
    newColumns.splice(index, 1);
    setColumns(newColumns);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const formData = {
      tableName,
      columns
    };
    if(tableName===""){
        toast.error("TableName cannot be null");
    }
formData.columns.forEach(element => {
    if(element===""){
        toast.error("Data type cannot be empty");
    }
    });
    console.log(formData); 
    const callReg=async(formData)=>{
        
         const savedUserResponse=await axios.post(
          `http://localhost:3000/api/v1/users/create-table`,formData
         ).then(res=>{
          console.log("Response is",res);
         })
         .catch(err=>{
           console.log("Error is:",err);
         })
      }
      callReg(formData);
  };

  return (
    <div className='mt-[10%] max-sm:mt-[20%]'>
    <form className='mx-auto sm:w-[80%]' onSubmit={handleSubmit}>
      <div className='mx-auto'>
        <label htmlFor="tableName">Table Name:</label>
        <input
          type="text"
          id="tableName"
          value={tableName}
          className='border-[2px] ml-[1%] mb-[2%] pl-[5px]'
          onChange={e => setTableName(e.target.value)}
          required
        />
      </div>
      <div>
        <label >Columns:</label>
        {columns.map((column, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Column Name"
              className='border-[2px] mt-[2px] py-[2px] pl-[5px]'
              value={column.name}
              onChange={e => handleColumnNameChange(index, e)}
              required
            />
            {/* <input
              type="text"
              placeholder="Column Type"
              value={column.type}
              onChange={e => handleColumnTypeChange(index, e)}
              required
            /> */}
           <select
//   value={column.type}
  onChange={e => handleColumnTypeChange(index, e.target.value)}
  required
  className='border-[2px] ml-[2%] text-sm px-2 py-1'
>
  <option value="" selected={column.type === ''}>Select Column Type</option>
  <option value="INTEGER" selected={column.type === 'INTEGER'}>INTEGER</option>
  <option value="VARCHAR(255)" selected={column.type === 'VARCHAR(255)'}>VARCHAR(255)</option>
  <option value="DATE" selected={column.type === 'DATE'}>DATE</option>
  <option value="DATETIME" selected={column.type === 'DATETIME'}>DATETIME</option>
  <option value="TIMESTAMP" selected={column.type === 'TIMESTAMP'}>TIMESTAMP</option>
  {/* Add more options as needed */}
</select>

            <button type="button" className='ml-[1%] rounded-lg px-4 text-[0.8rem] bg-black text-white' onClick={() => handleRemoveColumn(index)}>Remove</button>
          </div>
        ))}
        <button type="button" className='mt-[1%] rounded-lg px-3 text-[0.8rem] bg-black text-white' onClick={handleAddColumn}>Add Column</button>
      </div>
      <button type="submit" className='mt-[5%] rounded-lg px-4 bg-black text-white'>Create Table</button>
    </form>
    </div>
  );
};

export default CreateTableForm;