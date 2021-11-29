import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

// const sequelizeConnection = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PW,
//   {
//     host: process.env.DB_HOST,
//     dialect: 'postgres',
//   }
// );

const DB_URI =
  process.env.SSL === 'true'
    ? `${process.env.DATABASE_URL}?ssl=true`
    : process.env.DATABASE_URL;

const sequelizeConnection = new Sequelize(DB_URI);

export default sequelizeConnection;
