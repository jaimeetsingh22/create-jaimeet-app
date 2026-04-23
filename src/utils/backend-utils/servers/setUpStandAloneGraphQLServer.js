// GraphQL Standalone Server Setup Utility
// Creates Apollo Standalone GraphQL server (no Express needed)

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

/**
 * Set up GraphQL Standalone Server with database support
 * @param {string} projectName - Name of the project
 * @param {string} projectPath - Path to project (server folder)
 * @param {string} databaseType - 'mongodb' | 'sequelize' | 'mysql-native'
 */
export async function setUpGraphQLStandaloneServer(projectName, projectPath, databaseType) {
  const folders = [
    "config",
    "connections",
    "models",
    "graphql",
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
  files["index.js"] = generateGraphQLStandaloneIndex(databaseType);

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
    serverType: "graphql-standalone",
    databaseType,
    isSSR: false,
  });

  // Setup npm and install packages
  await setupNpm(projectPath, {
    start: "node index.js",
    dev: "nodemon index.js",
  });

  // Install dependencies based on database type
  const deps = ["dotenv", "@apollo/server"];
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
 * Generate GraphQL Standalone index.js based on database type
 */
function generateGraphQLStandaloneIndex(databaseType) {
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
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from './graphql/typedef.js';
import { resolvers } from './graphql/resolver.js';
${dbImport}

const PORT = process.env.PORT || 3000;

${dbConnect}

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
`;
}
