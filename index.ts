require('dotenv').config();
const Express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const PORT = process.env.SERVER_PORT || 8000;

const app = Express();

app.use(cors());
app.use(morgan('short'));
app.use(helmet());
app.use(Express.json());

app.get('/', (req, res) => res.send('server works!'));

app.listen(PORT, () =>
  console.log(`🚀 server running on http://localhost:${PORT}`)
);
