import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelizeConnection = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl:
      process.env.SSL === 'true'
        ? {
            required: true,
            rejectUnauthorized: false,
          }
        : false,
  },
});

export default sequelizeConnection;
