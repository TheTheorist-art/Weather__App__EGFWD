/**
 * The endpoint object that holds all the data
 */
 let project__data = {};

 /**
  * Requiring express Module
  * cors module
  * i used the express internal parsing functions because the body parser alread deprecated.
  */
 const express = require("express");
 const cors = require("cors");
 
 /**
  * Creating New express instance
  * Allowing all cors requests
  * using internal express parser
  */
 
 const app = express();
 app.use(cors());
 app.use(express.json());
 app.use(express.urlencoded({ extended: false }));
 
 /**
  * Static Files Handeling
  */
 
 app.use(express.static("website"));
 
 /**
  * Making the routs for the post and get requests
  *
  */
 // POST route setup
 app.post("/add", async (req, res) => {
   project__data = await req.body;
   res.send(project__data);
   console.log(project__data);
 });
 
 // GET route setup
 app.get("/all", async (req, res) => {
   res.send(project__data);
 });
 
 // declaring the port and the host for listening
 const port = 4000;
 const host = "127.0.0.1";
 
 // logging the listening status in the terminal
 const listening__status = (_) => {
   console.log(`Server Listening On --> http://${host}:${port}`);
 };
 
 // start the listening on the specified port
 app.listen(port, listening__status);
 