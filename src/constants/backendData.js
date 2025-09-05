
const serverText = "`Server is running on http://localhost:${PORT}`";
export const backend_with_SSR_data = {
  connectToDB: `
    import mongoose from "mongoose";    
    
    export const connectToDB = async (dbURI, db_name) => {  
      try {  
        await mongoose.connect(dbURI, {  
          dbName: db_name,  
        });  
        console.log("Connected to MongoDB successfully!", db_name);  
      } catch (error) {  
        console.error("Error connecting to MongoDB:", error);  
        process.exit(1);  
      }  
    };
    `,
  middlewares: `// create your middleware functions in the middlewares directory and don't forget to call the next() function to pass control to the next middleware or route handler and export the middleware function
          

export function Middleware(req, res, next) {   
  console.log("Middleware executed");   
  // You can add more logic here if needed   
  next(); // Call next() to pass control to the next middleware or route handler  
}`,

public:`
*{  
    margin: 0;  
    padding: 0;  
}  

body{  
    height: 100vh;  
    display: flex;  
    flex-direction: column;  
    justify-content: center;  
    align-items: center;  
    background-color: #282c34;  
    color: white;  
    gap: 20px;  
}  
h1{  
    color:white;  
    text-shadow: 0px 0px 10px whitesmoke;  
}  
`,
route:`
import {Router} from "express"  

const route = Router();  

// Define your routes here  
route.get('/test', (req, res) => {  
  res.send('Welcome to the Home Page');  
});  

export default route;  
`,
view:`
<!DOCTYPE html>  
<html lang="en">  
  <head>  
    <meta charset="UTF-8" />  
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />  
    <title>test page</title>  
    <link rel="stylesheet" type="text/css" href="/style.css" />  
  </head>  
  
  <body>  
    <h1>Jaimeet CLI</h1>  
    <p>Edit index.js</p>  
  </body>  
</html>  

`,
index:`
 
import { connectToDB } from './connections/connectToDB.js';  
import { Middleware } from './middlewares/middleware.js';  
import dotenv from 'dotenv';   
dotenv.config();  
import express from 'express';  
import path from 'path';  
import route from './router/route.js';    

const app = express();    

const PORT = process.env.PORT || 3000;  

// enter your mongodb uri
let dbUri = null;    

// enter your database name here  
let dbName = null;      


// connecting to the database 
if(dbName && dbUri){
await connectToDB(dbUri, dbName);    
}  

// setting ejs views  
app.set('view engine','ejs');  
app.set('views', path.join(process.cwd(), 'views'));  
app.use(express.static(path.join(process.cwd(), 'public')));      

// middlewares here  
app.use(Middleware)      

// views    
app.get('/', (req, res) => {  
  res.render('index', { title: 'Welcome to My App' });  
});      

app.use('/api', route);     
app.listen(PORT, () => {   
  console.log(${serverText});  
});

`

};

export const backend_with_API_data = {
  connectToDB: `
    import mongoose from "mongoose";    
    
    export const connectToDB = async (dbURI, db_name) => {  
      try {  
        await mongoose.connect(dbURI, {  
          dbName: db_name,  
        });  
        console.log("Connected to MongoDB successfully!", db_name);  
      } catch (error) {  
        console.error("Error connecting to MongoDB:", error);  
        process.exit(1);  
      }  
    };
    `,
  middlewares: `// create your middleware functions in the middlewares directory and don't forget to call the next() function to pass control to the next middleware or route handler and export the middleware function
          

export function Middleware(req, res, next) {   
  console.log("Middleware executed");   
  // You can add more logic here if needed   
  next(); // Call next() to pass control to the next middleware or route handler  
}`,


route:`
import {Router} from "express"  

const route = Router();  

// Define your routes here  
route.get('/test', (req, res) => {  
  res.json({message:'Welcome to the Home Page'});  
});  

export default route;  
`,

index:`
 
import { connectToDB } from './connections/connectToDB.js';  
import { Middleware } from './middlewares/middleware.js';  
import dotenv from 'dotenv';   
dotenv.config();  
import express from 'express';  
import route from './router/route.js';    

const app = express();    

const PORT = process.env.PORT || 3000;

// enter your mongodb uri
let dbUri = null;    

// enter your database name here  
let dbName = null;      


// connecting to the database 
if(dbName && dbUri){
await connectToDB(dbUri, dbName);    
}

// middlewares here  
app.use(Middleware)      

// views    
app.get('/', (req, res) => {  
  res.json({message:'hello world'})
});      
      

app.use('/api', route);     
app.listen(PORT, () => {   
  console.log(${serverText});  
});

`

};

