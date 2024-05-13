
// import dotenv from "dotenv";
// import { Sequelize, DataTypes } from 'sequelize';
// import app from "./app.js";
// import sequelize from "./db/index.js";

// // Load the configuration
// dotenv.config();
// const port=process.env.PORT||8000;
// const DynamicTable = sequelize.define('dynamic_table', {
//   table_name: sequelize.STRING,
//   // Add other attributes as needed
// });

// // Check if the metadata table exists
// DynamicTable.sync()
//   .then(() => {
//     console.log('Dynamic table metadata synced');
//   })
//   .catch((error) => {
//     console.error('Error syncing dynamic table metadata:', error);
//   });

// // Start the server after ensuring metadata table is created
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });



import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
import app from './app.js'
import {DB_NAME} from './constants.js'
import userRouter from './routes/user.routes.js'
import { initializeDatabase, sequelize } from './db/index.js';


dotenv.config();


const port = process.env.PORT || 8000;


// Create Sequelize instance
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
sequelize.authenticate()
.then(() => {
  // Start the server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
})
.catch((error) => {
  console.error('Error initializing database:', error);
});
  // Start the server after ensuring metadata table is created
  
  // app.listen(port, () => {
  //   console.log(`Server is running on port ${port}`);
  // });