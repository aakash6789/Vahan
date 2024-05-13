import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import ApiError from "../utils/ApiError.js";
import {sequelize} from "../db/index.js";
const createTable=async(req, res) => {
    const { tableName, columns } = req.body;
     console.log(tableName,columns);
   
//     const columnDefinitions = Array.from({ length: columns }, (_, index) => `column_${index + 1} VARCHAR(255)`).join(', ');

// // Create the table
// const createTableQuery = `CREATE TABLE ${tableName} (${columnDefinitions})`;

// sequelize.query(createTableQuery, (error, results) => {
//     if (error) {
//         console.error('Error creating table:', error);
//         res.status(500).json({ error: 'Error creating table' });
//         return;
//     }

//     // Insert metadata into metadata table
//     const insertMetadataQuery = `INSERT INTO metadata (table_name, columns) VALUES (?, ?)`;
//     const metadataValues = [tableName, `Number of columns: ${columns}`];
//     sequelize.query(insertMetadataQuery, { replacements: metadataValues })
//         .then(() => {
//             res.json({ message: 'Table created successfully' });
//         })
//         .catch((error) => {
//             console.error('Error inserting metadata:', error);
//             res.status(500).json({ error: 'Error inserting metadata' });
//         });
// });
sequelize.query(`SHOW TABLES LIKE '${tableName}'`)
    .then(([existingTables]) => {
        if (existingTables.length > 0) {
            // Table already exists
            res.status(400).json({ error: 'Table already exists' });
            return;
        }

        // Generate column definitions dynamically
        const columnDefinitions = Array.from({ length: columns }, (_, index) => `column_${index + 1} VARCHAR(255)`).join(', ');

        // Create the table
        const createTableQuery = `CREATE TABLE ${tableName} (${columnDefinitions})`;

        // sequelize.query(createTableQuery)
        //     .then(() => {
        //         // Insert metadata into metadata table
        //         const insertMetadataQuery = `INSERT INTO metadata (metadata, columns) VALUES (?, ?)`;
        //         const metadataValues = [tableName, `Number of columns: ${columns}`];
        //         return sequelize.query(insertMetadataQuery, { replacements: metadataValues });
        //     })
        //     .then(() => {
        //         res.json({ message: 'Table created successfully' });
        //     })
        //     .catch((error) => {
        //         console.error('Error creating table:', error);
        //         res.status(500).json({ error: 'Error creating table' });
        //     });
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
    sequelize.query(createTableQuery)
    .then(() => {
        // Insert metadata into metadata table
        const insertMetadataQuery = `INSERT INTO metadata (table_name, columns) VALUES (?, ?)`;
        const metadataValues = [tableName, `Number of columns: ${columns}`];
        return sequelize.query(insertMetadataQuery, { replacements: metadataValues });
    })
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


export {createTable};