// GraphQL + Express Server Setup Utility
// Creates Express + Apollo GraphQL server with @as-integrations/express5

import fs from "fs";
import path from "path";
import { setupNpm, installDependencies } from "../../installDeps.js";
import { log } from "../../logger.js";
import { generateGitignore, generateEnvExample, generateReadme } from "../generateProjectFiles.js";
import { initGitRepo } from "../initGitRepo.js";
import { mongoDBConnectionTemplate } from "../databases/connectMongoDB.js";
import { sequelizeConnectionTemplate } from "../databases/connectSequelize.js";
import { mysqlConnectionTemplate } from "../databases/connectMySQL.js";

// GraphQL typedef template
const typeDefTemplate = `// GraphQL Type Definitions

export const typeDefs = \`#graphql
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
\`;
`;

// GraphQL resolver template
const resolverTemplate = `// GraphQL Resolvers

export const resolvers = {
  // Resolver for fields inside Todos type
  Todos: {
    user: async (todo) => {
      const { userId } = todo;
      const data = await fetch(
        \`https://jsonplaceholder.typicode.com/users/\${userId}\`
      );
      return await data.json();
    },
  },

  // Resolver for fields inside Users type
  Users: {
    todos: async (user) => {
      const data = await fetch(
        \`https://jsonplaceholder.typicode.com/todos?userId=\${user.id}\`
      );
      return await data.json();
    },
  },

  // Root-level Query resolvers
  Query: {
    getTodos: async () => {
      const data = await fetch("https://jsonplaceholder.typicode.com/todos");
      return await data.json();
    },
    getUsers: async () => {
      const data = await fetch("https://jsonplaceholder.typicode.com/users");
      return await data.json();
    },
    getUsersById: async (_, { id }) => {
      const data = await fetch(
        \`https://jsonplaceholder.typicode.com/users/\${id}\`
      );
      return await data.json();
    },
  },
};
`;

// Middleware template
const middlewareTemplate = `// Create your middleware functions here
// Don't forget to call next() to pass control to the next middleware

export function Middleware(req, res, next) {
  console.log("Middleware executed");
  next();
}
`;

/**
 * Set up GraphQL + Express Server with database support
 * @param {string} projectName - Name of the project
 * @param {string} projectPath - Path to project (server folder)
 * @param {string} databaseType - 'mongodb' | 'sequelize' | 'mysql-native'
 */
export async function setUpGraphQLExpressServer(projectName, projectPath, databaseType) {
  const folders = [
    "config",
    "connections",
    "middlewares",
    "models",
    "graphql",
    "controllers",
  ];

  // Create folders
  folders.forEach((folder) => {
    const folderPath = path.join(projectPath, folder);
    fs.mkdirSync(folderPath, { recursive: true });
  });

  // Create files
  const files = {
    "graphql/typedef.js": typeDefTemplate,
    "graphql/resolver.js": resolverTemplate,
    "middlewares/middleware.js": middlewareTemplate,
    "config/config.js": "// Write your configuration code here\n",
  };

  // Add database-specific connection file
  switch (databaseType) {
    case "mongodb":
      files["connections/connectMongoDB.js"] = mongoDBConnectionTemplate;
      break;
    case "sequelize":
      files["connections/connectSequelize.js"] = sequelizeConnectionTemplate;
      break;
    case "mysql-native":
      files["connections/connectMySQL.js"] = mysqlConnectionTemplate;
      break;
  }

  // Generate index.js based on database type
  files["index.js"] = generateGraphQLExpressIndex(databaseType);

  // Create files
  for (const [file, content] of Object.entries(files)) {
    const filePath = path.join(projectPath, file);
    fs.writeFileSync(filePath, content.trimStart());
  }

  // Generate project files (.gitignore, .env.example, README.md)
  generateGitignore(projectPath);
  generateEnvExample(projectPath, databaseType);
  generateReadme(projectPath, {
    projectName,
    serverType: "graphql-express",
    databaseType,
    isSSR: false,
  });

  // Setup npm and install packages
  await setupNpm(projectPath, {
    start: "node index.js",
    dev: "nodemon index.js",
  });

  // Install dependencies based on database type
  const deps = ["express", "cors", "dotenv", "@apollo/server", "@as-integrations/express5"];
  switch (databaseType) {
    case "mongodb":
      deps.push("mongoose");
      break;
    case "sequelize":
      deps.push("sequelize", "mysql2", "pg");
      break;
    case "mysql-native":
      deps.push("mysql2");
      break;
  }

  await installDependencies(projectPath, deps, ["nodemon"]);

  // Initialize git repository
  await initGitRepo(projectPath);
}

/**
 * Generate Express + GraphQL index.js based on database type
 */
function generateGraphQLExpressIndex(databaseType) {
  const serverText = "`🚀 GraphQL Server running at http://localhost:${PORT}/graphql`";
  
  let dbImport = "";
  let dbConnect = "";

  switch (databaseType) {
    case "mongodb":
      dbImport = `import { connectMongoDB } from './connections/connectMongoDB.js';`;
      dbConnect = `// Connect to database
await connectMongoDB();`;
      break;
    case "sequelize":
      dbImport = `import { connectSequelize } from './connections/connectSequelize.js';`;
      dbConnect = `// Connect to database
await connectSequelize();`;
      break;
    case "mysql-native":
      dbImport = `import { connectMySQL } from './connections/connectMySQL.js';`;
      dbConnect = `// Connect to database
const dbConnection = await connectMySQL();`;
      break;
  }

  return `import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { typeDefs } from './graphql/typedef.js';
import { resolvers } from './graphql/resolver.js';
${dbImport}
import { Middleware } from './middlewares/middleware.js';

const app = express();
const PORT = process.env.PORT || 3000;

${dbConnect}

// Express middlewares
app.use(cors());
app.use(express.json());
app.use(Middleware);

// Create Apollo Server
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
  console.log(${serverText});
});
`;
}