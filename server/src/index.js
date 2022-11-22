require('dotenv').config();
require('./config/database').connect();
require('./config/startup').createAdminUser();
const express = require('express');
const cors = require('cors');
const http = require('http');
const router = require('./router');

const { API_PORT } = process.env;
const app = express();
const server = http.Server(app);
const port = process.env.PORT || API_PORT;

app.use(cors());
app.use(express.json());
app.use(router);

server.listen(port, () => 
    {
        console.log(`server started at port ${port}`);
    }
);
