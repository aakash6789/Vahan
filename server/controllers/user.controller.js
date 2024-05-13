import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import ApiError from "../utils/ApiError.js";
import {sequelize} from "../db/index.js";
const createTable=async(req, res) => {
    const { tableName, columns } = req.body;
     console.log(tableName,columns);
sequelize.query(`SHOW TABLES LIKE '${tableName}'`)
    .then(([existingTables]) => {
        if (existingTables.length > 0) {
            // Table already exists
            res.status(400).json({ error: 'Table already exists' });
            return;
        }

        // Generate column definitions dynamically
    //     const columnDefinitions = Array.from({ length: columns }, (_, index) => `column_${index + 1} VARCHAR(255)`).join(', ');

    //     // Create the table
    //     const createTableQuery = `CREATE TABLE ${tableName} (${columnDefinitions})`;
 
    // sequelize.query(createTableQuery)
    // .then(() => {
    //     // Insert metadata into metadata table
    //     const insertMetadataQuery = `INSERT INTO metadata (table_name, columns) VALUES (?, ?)`;
    //     const metadataValues = [tableName, `Number of columns: ${columns}`];
    //     return sequelize.query(insertMetadataQuery, { replacements: metadataValues });
    // })
    // .then(() => {
    //     res.json({ message: 'Table created successfully' });
    // })
    // .catch((error) => {
    //     console.error('Error creating table:', error);
    //     res.status(500).json({ error: 'Error creating table' });
    // });
    const columnDefinitions = columns.map(column => `${column.name} ${column.type}`).join(', ');

    // Create the table
    const createTableQuery = `CREATE TABLE ${tableName} (${columnDefinitions})`;

    sequelize.query(createTableQuery)
        .then(() => {
            res.json({ message: 'Table created successfully' });
        })
        .catch((error) => {
            console.error('Error creating table:', error);
            res.status(500).json({ error: 'Error creating table' });
        });
    })
    .catch((error) => {
        console.error('Error checking if table exists:', error);
        res.status(500).json({ error: 'Error checking if table exists' });
    });
}

const addEntryToTable = async (req, res) => {
    const { tableName, entry } = req.body;
  console.log(tableName,entry);
    try {
        // Insert the entry into the existing table
        // await sequelize.query(`INSERT INTO ${tableName} SET ?`, {
        //     replacements: entry,
        //     type: sequelize.QueryTypes.INSERT
        // });
        const columns = Object.keys(entry).join(', ');
        const values = Object.values(entry).map(value => typeof value === 'string' ? `'${value}'` : value).join(', ');
        const query = `INSERT INTO ${tableName} (${columns}) VALUES (${values})`;

        // Execute SQL query
        await sequelize.query(query);

        res.json({ message: 'Entry added successfully' });
    } catch (error) {
        console.error('Error adding entry:', error);
        res.status(500).json({ error: 'Error adding entry' });
    }
};


export {createTable,addEntryToTable};



   //     sequelize.query(createTableQuery)
    // .then(() => {
    //     // Insert metadata into metadata table
    //     const insertMetadataQuery = `INSERT INTO metadata (table_name, columns) VALUES (?, ?)`;
    //     const metadataValues = [tableName, `Number of columns: ${columns}`];
    //     return sequelize.query(insertMetadataQuery, { replacements: metadataValues });
    // })
    // .then(() => {
    //     res.json({ message: 'Table created successfully' });
    // })
    // .catch((error) => {
    //     console.error('Error creating table:', error);
    //     res.status(500).json({ error: 'Error creating table' });
    // });