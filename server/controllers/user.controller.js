import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import ApiError from "../utils/ApiError.js";
import { sequelize } from "../db/index.js";
const createTable = asyncHandler(async (req, res) => {
    const { tableName, columns } = req.body;
    console.log(tableName, columns);
    sequelize.query(`SHOW TABLES LIKE '${tableName}'`)
        .then(([existingTables]) => {
            if (existingTables.length > 0) {              // To check if table exists
                return res.status(409).json(new ApiResponse(409, {}, 'Table already exists'));
            }
            const columnDefinitions = columns.map(column => `${column.name} ${column.type}`).join(', ');
            const createTableQuery = `CREATE TABLE ${tableName} (${columnDefinitions})`;

            sequelize.query(createTableQuery)
                .then(() => {
                    const tableSchemaQuery = `SHOW COLUMNS FROM ${tableName}`;
                    const createdTable = sequelize.query(tableSchemaQuery, { type: sequelize.QueryTypes.SHOWTABLES }).then((data) => res.status(200).json(new ApiResponse(200, data, 'Table created successfully'))).catch((error) => {
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

const addEntryToTable = async (req, res) => {
    const { tableName, entry } = req.body;
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
const updateEntryInTable = async (req, res) => {
    const { tableName, primaryKey, primaryKeyValue, updatedValues } = req.body;

    try {
        const setValues = Object.keys(updatedValues).map(key => `${key} = '${updatedValues[key]}'`).join(', ');
        const query = `UPDATE ${tableName} SET ${setValues} WHERE ${primaryKey} = '${primaryKeyValue}'`;
        await sequelize.query(query);
        const updatedTableQuery = `SELECT * FROM ${tableName}`;
        const [tableData] = await sequelize.query(updatedTableQuery);
        res.status(200).json(new ApiResponse(200, tableData, 'Entry updated successfully'));
    } catch (error) {
        console.error('Error updating entry:', error);
        res.status(500).json({ error: 'Error updating entry' });
    }
};
const deleteEntryFromTable = async (req, res) => {
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
      // Query to fetch column details from information_schema.columns
      const columnQuery = `
        SELECT column_name, data_type
        FROM information_schema.columns
        WHERE table_schema = DATABASE()
        AND table_name = '${tableName}'`;
  
      // Execute the column query
      const [columns, columnMetadata] = await sequelize.query(columnQuery);
  
      // Extract column details
      const tableSchema = columns.map(column => ({
        name: column.column_name,
        type: column.data_type
      }));
  
      // Query to fetch rows from the table
      const rowsQuery = `SELECT * FROM ${tableName}`;
  
      // Execute the rows query
      const [rows, rowMetadata] = await sequelize.query(rowsQuery);
  
      // Combine table schema and rows into a single response object
      const tableData = {
        tableName: tableName,
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
    //   const query = `
    //     SELECT table_name, column_name, data_type
    //     FROM information_schema.columns
    //     WHERE table_schema = DATABASE()`;
  

    //   const [tableColumns, metadata] = await sequelize.query(query);
    //   const tables = {};
    //   tableColumns.forEach(row => {
    //     const tableName = row.table_name;
    //     const columnName = row.column_name;
    //     const dataType = row.data_type;
    //     if (!tables[tableName]) {
    //       tables[tableName] = [];
    //     }
    //     tables[tableName].push({ name: columnName, type: dataType });
    //   });
    //   const tablesArray = Object.keys(tables).map(tableName => ({
    //     tableName: tableName,
    //     columns: tables[tableName]
    //   }));
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

export { createTable, addEntryToTable, updateEntryInTable, deleteEntryFromTable,deleteTable,fetchAllTables };



