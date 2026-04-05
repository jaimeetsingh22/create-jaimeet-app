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
  console.log(`Server is running on http://localhost:${PORT}`);  
});

