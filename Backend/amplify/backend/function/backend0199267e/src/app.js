/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




const express = require('express')
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth.js');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const { connectDB, getDB } = require('./config/db');
const cors = require('cors');
// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

app.use(cors({
  origin: 'https://develop.d3ec3kobigwan9.amplifyapp.com',
  allowedHeaders: ['Authorization', 'Content-Type'],
  credentials: true
}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", 'https://develop.d3ec3kobigwan9.amplifyapp.com');
  res.header("Access-Control-Allow-Headers", "Authorization, Content-Type");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});
/**********************
 * Example get method *
 **********************/

const startServer = async () => {
  connectDB();
  app.use('/api/auth', authRoutes);

  app.get('/api/auth', function(req, res) {
    // Add your code here
    res.json({success: 'get call succeed!', url: req.url});
  });
  
  app.get('/api/auth/*', function(req, res) {
    // Add your code here
    res.json({success: 'get call succeed!', url: req.url});
  });
  
  /****************************
  * Example post method *
  ****************************/
  
  app.post('/api/auth', function(req, res) {
    // Add your code here
    res.json({success: 'post call succeed!', url: req.url, body: req.body})
  });
  
  app.post('/api/auth/*', function(req, res) {
    // Add your code here
    res.json({success: 'post call succeed!', url: req.url, body: req.body})
  });

  app.listen(3000, () => {
    console.log("App started");
  });
};

startServer().catch(error => {
  console.error("Error starting the server:", error);
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app