
import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
import app from '../app.js';
import {DB_NAME} from '../constants.js'
import mysql from 'mysql2/promise';
import userRouter from '../routes/user.routes.js'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const envPath = join(__dirname, '../.env');

dotenv.config({path:envPath});

const initializeDatabase = async () => {
    const connection = mysql.createPool({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
    });
  
    try {
      
      await connection.execute(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`);
      console.log('Database created or already exists');
    } catch (error) {
      console.error('Error creating database:', error);
    } finally {
    
      await connection.end();
    }
  };
  
const sequelize = new Sequelize(DB_NAME,  process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
  });
  

  const DynamicTable = sequelize.define('metadata', {                    // Creating metadata table
    table_name: DataTypes.STRING,
    columns: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true 
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true 
}
  
  });
  
  
  DynamicTable.sync()
    .then(() => {
      console.log('Dynamic table metadata synced');                // To check if metadata table exists
    })
    .catch((error) => {
      console.error('Error syncing dynamic table metadata:', error);
    });
export  {initializeDatabase,sequelize};