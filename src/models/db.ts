// TODO - connect sequelize to database and init all models
// import fs from 'fs';
// import path from 'path';
// import { Sequelize, Model, DataTypes } from 'sequelize';

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PW,
//   {
//     host: process.env.DB_HOST,
//     dialect: 'postgres',
//   }
// );

// type DB = {
//   sequelize: Sequelize;
//   models?: {
//     [name: string]: Model;
//   };
// };

// const db: DB = { sequelize };

// // Initialize all models in models folder
// const files = fs.readdirSync(__dirname);

// for (const file of files) {
//   if (file !== 'db.ts') {
//     const model = require(path.join(__dirname, file))(sequelize, DataTypes);
//     db.models[model.name] = model;
//   }
// }

// for (const model in db) {
//   if (db[model].associate) db[model].associate(db);
// }

// export default db;
