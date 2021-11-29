import Express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import router from './router.js';
import checkUserToken from './auth/check-user-token.js';
import authenticateUser from './auth/authenticate-user.js';
import dotenv from 'dotenv';
import sequelizeConnection from './models/sequelize.js';

dotenv.config();

const PORT = process.env.PORT || 8000;

const app = Express();

app.use(cors());
app.use(morgan('short'));
app.use(helmet());
app.use(Express.json());
app.use(checkUserToken);

app.get('/', authenticateUser, (req, res) => {
  res.send('server works!');
});
app.use('/', router);
app.use('**', (req, res) => res.sendStatus(404));

async function start() {
  app.listen(PORT, () => {
    console.log(`🚀 server running on http://localhost:${PORT}`);
  });
  try {
    await sequelizeConnection.authenticate();
    await sequelizeConnection.sync({ alter: true });
    console.log('👍 Connection has been established successfully.');
  } catch (error) {
    console.error('👎 Unable to connect to the database:', error);
  }
}

start();
