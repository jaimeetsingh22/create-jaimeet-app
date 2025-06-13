
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

export const uiData = {
  indexCss:`@import "tailwindcss"; 
/* You can remove all the remaining css except @import "tailwindcss"  */

:root {
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}
a:hover {
  color: #535bf2;
}

body {
  margin: 0;
  display: flex;
  place-items: center;
  flex-direction: column;
  min-width: 320px;
  min-height: 100vh;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  a:hover {
    color: #747bff;
  }
  button {
    background-color: #f9f9f9;
  }
}
`,
  App:`import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='flex flex-col items-center justify-center' style={{
      height:"90vh"
    }}>
      <div className='flex items-center justify-center'>
        <a className='block' href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a className='block' href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
`,

}