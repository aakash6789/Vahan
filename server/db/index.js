
import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
import app from '../app.js';
import {DB_NAME} from '../constants.js'
import mysql from 'mysql2/promise';
import userRouter from '../routes/user.routes.js'
const envPath = '../.env';




// const port = process.env.PORT || 8000;

// // Create Sequelize instance
// const sequelize = new Sequelize(DB_NAME, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
//     host: process.env.MYSQL_HOST,
//     dialect: 'mysql',
//   });
  
//   // Define model for dynamic tables
//   const DynamicTable = sequelize.define('dynamic_table', {
//     table_name: DataTypes.STRING,
//     // Add other attributes as needed
//   });
  
//   // Check if the metadata table exists
//   DynamicTable.sync()
//     .then(() => {
//       console.log('Dynamic table metadata synced');
//     })
//     .catch((error) => {
//       console.error('Error syncing dynamic table metadata:', error);
//     });
  
//   // Start the server after ensuring metadata table is created
//   app.listen(port, () => {
//       console.log(`Server is running on port ${port}`);
//     });
    

//   export default sequelize;

dotenv.config({ path: envPath });
// const connection =  mysql.createPool({
//     host: `${process.env.MYSQL_HOST}`,
//     user: `${process.env.MYSQL_USER}`,
//     password: `${process.env.MYSQL_PASSWORD}`,
//     database: `${DB_NAME}`
// })

// // const result=await connection.query("SELECT * FROM bonus");
// const result=connection.execute(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`)
// .then(([rows, fields]) => {
//     console.log('Database created or already exists');
    
// })
// .catch((err) => {
//     console.error('Error creating database:', err);
// })
const initializeDatabase = async () => {
    const connection = mysql.createPool({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
    });
  
    try {
      // Execute the query to create the database if it doesn't exist
      await connection.execute(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`);
      console.log('Database created or already exists');
    } catch (error) {
      console.error('Error creating database:', error);
    } finally {
      // Close the connection pool
      await connection.end();
    }
  };
  
const sequelize = new Sequelize(DB_NAME, "root", "password1", {
    host: "localhost",
    dialect: 'mysql',
  });
  
  // Define model for dynamic tables
  const DynamicTable = sequelize.define('metadata', {
    table_name: DataTypes.STRING,
    columns: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true // Allow NULL values for createdAt
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true // Allow NULL values for updatedAt
}
    // Add other attributes as needed
  });
  
  // Check if the metadata table exists
  DynamicTable.sync()
    .then(() => {
      console.log('Dynamic table metadata synced');
    })
    .catch((error) => {
      console.error('Error syncing dynamic table metadata:', error);
    });
export  {initializeDatabase,sequelize};