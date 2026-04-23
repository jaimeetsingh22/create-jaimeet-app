
const serverText = "`Server is running on http://localhost:${PORT}`";
const graphqlExpressText = "`🚀 Your GraphQL Server is running at http://localhost:${PORT}/graphql`";
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

const graphql = {
  typeDef:`#graphql

  # Define a Todo type
  type Todos {
    userId: ID!
    id: ID!
    title: String!
    completed: Boolean
    user: Users
  }

  # Define a User type
  type Users {
    id: ID!
    name: String
    username: String
    email: String
    phone: String
    website: String
    company: String
    todos: [Todos]
  }

  # Define root-level queries
  type Query {
    getTodos: [Todos]
    getUsers: [Users]
    getUsersById(id: ID!): Users
  }
  `,
  resolver:{
  // Resolver for fields inside Todos type
  Todos: {
    // Resolve the 'user' field inside a Todo
    user: async (todo) => {
      const { userId } = todo;
 
      const data = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      );
      console.log(`Fetched user data: ${JSON.stringify(data)}`);

      return await data.json(); // returns a single user object
    },
  },

  // Resolver for fields inside Users type
  Users: {
    // Resolve the 'todos' field inside a User
    todos: async (user) => {
      const data  = await fetch(
        `https://jsonplaceholder.typicode.com/todos?userId=${user.id}`
      );
      return await data.json(); // returns an array of todos belonging to this user
    },
  },

  // Root-level Query resolvers
  Query: {
    // Fetch all todos
    getTodos: async () => {
      const  data  = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      return await data.json();
    },

    // Fetch all users
    getUsers: async () => {
      const data  = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      return await data.json();
    },

    // Fetch single user by ID
    getUsersById: async (_, { id }) => {
      const  data  = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      return await data.json();
    },
  },
},

graphqlExpressServer:`
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { typeDefs } from './graphql/typedef.js';
import { resolvers } from './graphql/resolver.js';
import { Middleware } from './middlewares/middleware.js';
// Import your database connection based on your choice:
// import { connectMongoDB } from './connections/connectMongoDB.js';
// import { connectSequelize } from './connections/connectSequelize.js';
// import { connectMySQL } from './connections/connectMySQL.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to database (uncomment the one you're using)
// await connectMongoDB();
// await connectSequelize();
// await connectMySQL();

// Express middlewares
app.use(cors());
app.use(express.json());
app.use(Middleware);

// ApolloServer setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await server.start();

// Apply GraphQL middleware at /graphql endpoint
app.use("/graphql", expressMiddleware(server));

// Root endpoint
app.get("/", (req, res) => {
  res.json({ message: "GraphQL server running. Visit /graphql" });
});

app.listen(PORT, () => {
  console.log(${graphqlExpressText});
});
`,
standAloneServer:`
import dotenv from 'dotenv';
dotenv.config();
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from './graphql/typedef.js';
import { resolvers } from './graphql/resolver.js';
// Import your database connection based on your choice:
// import { connectMongoDB } from './connections/connectMongoDB.js';
// import { connectSequelize } from './connections/connectSequelize.js';
// import { connectMySQL } from './connections/connectMySQL.js';

const PORT = process.env.PORT || 3000;

// Connect to database (uncomment the one you're using)
// await connectMongoDB();
// await connectSequelize();
// await connectMySQL();

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start standalone server
const { url } = await startStandaloneServer(server, {
  listen: { port: PORT },
});

console.log("🚀 GraphQL Server ready at", url);
`

}
