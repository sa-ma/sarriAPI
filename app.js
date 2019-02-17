/* eslint-disable no-else-return */
/* eslint linebreak-style: ["error", "windows"] */
import express from "express";
import bodyParser from "body-parser";
import router from "./routes/index";

// Setting up express
const app = express();

// Parse incoming request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

// Start web server
const port = 5000;
app.listen(port);

export default app;
