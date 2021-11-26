require('dotenv').config();
const Express = require('express');

const app = Express();

app.get('/', (req, res) => res.send('server works!'));

app.listen(
  process.env.SERVER_PORT,
  () => `🚀 server running on http://localhost:${process.env.SERVER_PORT}`
);
