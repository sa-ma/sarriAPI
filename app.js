/* eslint-disable no-else-return */
/* eslint linebreak-style: ["error", "windows"] */
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import router from './routes/index';
// Setting up express
const app = express();

// Parse incoming request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);
app.use(express.static('static'));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start web server
const port = 5000;
app.listen(port);

export default app;
