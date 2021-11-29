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

const sequelizeConnection = new Sequelize(process.env.DATABASE_URL);

export default sequelizeConnection;
