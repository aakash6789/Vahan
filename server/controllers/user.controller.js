import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import ApiError from "../utils/ApiError.js";
import { sequelize } from "../db/index.js";
// const createTable = asyncHandler(async (req, res) => {
//     const { tableName, columns } = req.body;
//     console.log(tableName, columns);
//     sequelize.query(`SHOW TABLES LIKE '${tableName}'`)
//         .then(([existingTables]) => {
//             if (existingTables.length > 0) {              // To check if table exists
//                 return res.status(409).json(new ApiResponse(409, {}, 'Table already exists'));
//             }
//             const columnDefinitions = columns.map(column => `${column.name} ${column.type}`).join(', ');
//             const createTableQuery = `CREATE TABLE ${tableName} (${columnDefinitions})`;

//             sequelize.query(createTableQuery)
//                 .then(() => {
//                     const tableSchemaQuery = `SHOW COLUMNS FROM ${tableName}`;
//                     const createdTable = sequelize.query(tableSchemaQuery, { type: sequelize.QueryTypes.SHOWTABLES }).then((data) => res.status(200).json(new ApiResponse(200, data, 'Table created successfully'))).catch((error) => {
//                         console.error('Error creating table:', error);
//                         throw new ApiError(500, `${error.message}`);
//                     });
//                 })
//                 .catch((error) => {
//                     console.error('Error creating table:', error);
//                     throw new ApiError(500, `${error.message}`);

//                 });
//         })
//         .catch((error) => {
//             console.error('Error checking if table exists:', error);
//             throw new ApiError(500, 'Error checking if table exists');

//         });
// });
const createTable = asyncHandler(async (req, res) => {
    const { tableName, columns } = req.body;
  
    // Check if there is exactly one primary key column
    const primaryKeyColumns = columns.filter(column => column.primaryKey);
    if (primaryKeyColumns.length !== 1) {
      return res.status(400).json(new ApiResponse(400, {}, 'Exactly one primary key column must be specified'));
    }
  
    sequelize.query(`SHOW TABLES LIKE '${tableName}'`)
      .then(([existingTables]) => {
        if (existingTables.length > 0) {
          return res.status(409).json(new ApiResponse(409, {}, 'Table already exists'));
        }
  
        const columnDefinitions = columns.map(column => {
          if (column.primaryKey) {
            return `${column.name} ${column.type} PRIMARY KEY`;
          } else {
            return `${column.name} ${column.type}`;
          }
        }).join(', ');
  
        const createTableQuery = `CREATE TABLE ${tableName} (${columnDefinitions})`;
  
        sequelize.query(createTableQuery)
          .then(() => {
            const tableSchemaQuery = `SHOW COLUMNS FROM ${tableName}`;
            const createdTable = sequelize.query(tableSchemaQuery, { type: sequelize.QueryTypes.SHOWTABLES })
              .then((data) => res.status(200).json(new ApiResponse(200, data, 'Table created successfully')))
              .catch((error) => {
                console.error('Error creating table:', error);
                throw new ApiError(500, `${error.message}`);
              });
          })
          .catch((error) => {
            console.error('Error creating table:', error);
            throw new ApiError(500, `${error.message}`);
          });
      })
      .catch((error) => {
        console.error('Error checking if table exists:', error);
        throw new ApiError(500, 'Error checking if table exists');
      });
  });
  const deleteEntryFromTable = async (req, res) => {
    console.log(req.body);
    const { tableName, primaryKey, primaryKeyValue } = req.body;
    try {
        const query = `DELETE FROM ${tableName} WHERE ${primaryKey} = '${primaryKeyValue}'`;
        await sequelize.query(query);
        const updatedTableQuery = `SELECT * FROM ${tableName}`;
        const [tableData] = await sequelize.query(updatedTableQuery);
        res.status(200).json(new ApiResponse(200, tableData, 'Entry deleted successfully'));
    } catch (error) {
        console.error('Error deleting entry:', error);
        res.status(500).json({ error: 'Error deleting entry' });
    }
};

const addEntryToTable = async (req, res) => {
  console.log("Body is",req.body);
    const tableName = req.body.tableName;
    const entry = req.body.newRow;
    // console.log(tableName, entry);
    try {
        const columns = Object.keys(entry).join(', ');
        const values = Object.values(entry).map(value => typeof value === 'string' ? `'${value}'` : value).join(', ');
        const query = `INSERT INTO ${tableName} (${columns}) VALUES (${values})`;
        await sequelize.query(query);
        const updatedTableQuery = `SELECT * FROM ${tableName}`;
        const [tableData] = await sequelize.query(updatedTableQuery);
        res.status(200).json(new ApiResponse(200, tableData, 'Entry added successfully'));
    } catch (error) {
        console.error('Error adding entry:', error);
        res.status(500).json({ error: 'Error adding entry' });
    }
};
const updateEntriesInTable = async (req, res) => {
    const { tableName, primaryKey, updatedEntries } = req.body;

    try {
        const updatePromises = updatedEntries.map(async entry => {
            const setValues = Object.keys(entry.updatedValues).map(key => `${key} = '${entry.updatedValues[key]}'`).join(', ');
            const query = `UPDATE ${tableName} SET ${setValues} WHERE ${primaryKey} = '${entry[primaryKey]}'`;
            await sequelize.query(query);
        });

        await Promise.all(updatePromises);

        const updatedTableQuery = `SELECT * FROM ${tableName}`;
        const [tableData] = await sequelize.query(updatedTableQuery);
        res.status(200).json(new ApiResponse(200, tableData, 'Entries updated successfully'));
    } catch (error) {
        console.error('Error updating entries:', error);
        res.status(500).json({ error: 'Error updating entries' });
    }
};

const deleteTable = async (req, res) => {
    const { tableName } = req.body;
    try {
        const query = `DROP TABLE IF EXISTS ${tableName}`;
        await sequelize.query(query);
        res.status(200).json(new ApiResponse(200, {}, 'Table deleted successfully'));
    } catch (error) {
        console.error('Error deleting table:', error);
        res.status(500).json({ error: 'Error deleting table' });
    }
};
const fetchTableData = async (tableName) => {
    try {
      const columnQuery = `
        SELECT column_name, data_type
        FROM information_schema.columns
        WHERE table_schema = DATABASE()
        AND table_name = '${tableName}'`;
      

      const [columns, columnMetadata] = await sequelize.query(columnQuery);
      

      const tableSchema = columns.map(column => ({
        name: column.column_name,
        type: column.data_type
      }));

      const primaryKeyQuery = `
        SELECT column_name
        FROM information_schema.key_column_usage
        WHERE table_schema = DATABASE()
        AND table_name = '${tableName}'
        AND constraint_name = 'PRIMARY'`;
  
      const [primaryKeyResult, primaryKeyMetadata] = await sequelize.query(primaryKeyQuery);
      

      const primaryKeyColumnName = primaryKeyResult.length > 0 ? primaryKeyResult[0].column_name : null;

      const rowsQuery = `SELECT * FROM ${tableName}`;
  

      const [rows, rowMetadata] = await sequelize.query(rowsQuery);
  

      const tableData = {
        tableName: tableName,
        primaryKey: primaryKeyColumnName,
        columns: tableSchema,
        rows: rows
      };
  
      return tableData;
    } catch (error) {
      console.error('Error fetching table data:', error);
      throw new Error('Error fetching table data');
    }
  };
const fetchAllTables = async (req,res) => {
    try {
  
    const tableQuery = `
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = DATABASE()
      AND table_type = 'BASE TABLE'`;

    // Execute the table query
    const [tables, metadata] = await sequelize.query(tableQuery);

    // Fetch data for each table
    const tablesData = await Promise.all(tables.map(async (table) => {
      const tableName = table.table_name;
      const tableData = await fetchTableData(tableName);
     return tableData;
    }));
    res.status(200).json(new ApiResponse(200, tablesData, 'Tables fetched successfully'));
    } catch (error) {
      console.error('Error fetching tables:', error);
      throw new ApiError(500, `${error.message}`);
    
    }
  };

export { createTable, addEntryToTable, updateEntriesInTable, deleteEntryFromTable,deleteTable,fetchAllTables };



