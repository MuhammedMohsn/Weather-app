// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
let express = require('express');

// Start up an instance of app
let app=express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
let Cors = require('cors');
// Initialize the main project folder
app.use(Cors({origin:"*"}))
app.use(express.static('website'));
// Setup Server
const port=4000;
app.listen(port,()=>{
    console.log(`server is running on port:${port}`)
});
// create  endpoint for the server to get the data from the server
app.get("/get",(_req, res) => {res.send(projectData)});
// create endpoint for the server to post data into the server
app.post("/post",(req, res) => {
    projectData.temperature=req.body.temperature;
    projectData.date=req.body.date;
    projectData.content=req.body.content
    res.send(projectData);
    console.log("the projectdata is : ",projectData)
})