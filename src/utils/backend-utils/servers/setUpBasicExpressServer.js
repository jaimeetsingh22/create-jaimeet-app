// Basic Express Server Setup Utility
// Creates a full Express REST API project structure

import fs from "fs";
import path from "path";
import { backend_with_API_data } from "../../../constants/backendData.js";
import { setupNpm, installDependencies } from "../../installDeps.js";
import { log } from "../../logger.js";
import { generateGitignore, generateEnvExample, generateReadme } from "../generateProjectFiles.js";
import { initGitRepo } from "../initGitRepo.js";
import { mongoDBConnectionTemplate } from "../databases/connectMongoDB.js";
import { sequelizeConnectionTemplate } from "../databases/connectSequelize.js";
import { mysqlConnectionTemplate } from "../databases/connectMySQL.js";

/**
 * Set up Basic Express Server with database support
 * @param {string} projectName - Name of the project
 * @param {string} projectPath - Path to project (server folder)
 * @param {string} databaseType - 'mongodb' | 'sequelize' | 'mysql-native'
 */
export async function setUpBasicExpressServer(projectName, projectPath, databaseType) {
  const folders = [
    "config",
    "connections",
    "middlewares",
    "models",
    "routes",
    "controllers",
  ];

  // Create folders
  folders.forEach((folder) => {
    const folderPath = path.join(projectPath, folder);
    fs.mkdirSync(folderPath, { recursive: true });
  });

  // Create files based on database type
  const files = {
    "middlewares/middleware.js": backend_with_API_data.middlewares,
    "routes/route.js": backend_with_API_data.route,
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
  files["index.js"] = generateExpressIndex(databaseType);

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
    serverType: "express",
    databaseType,
    isSSR: false,
  });

  // Setup npm and install packages
  await setupNpm(projectPath, {
    start: "node index.js",
    dev: "nodemon index.js",
  });

  // Install dependencies based on database type
  const deps = ["express", "cors", "dotenv"];
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
 * Generate Express index.js based on database type
 */
function generateExpressIndex(databaseType) {
  const serverText = "`Server is running on http://localhost:${PORT}`";
  
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
${dbImport}
import { Middleware } from './middlewares/middleware.js';
import route from './routes/route.js';

const app = express();
const PORT = process.env.PORT || 3000;

${dbConnect}

// Middlewares
app.use(cors());
app.use(express.json());
app.use(Middleware);

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to your Express API!' });
});

// API routes
app.use('/api', route);

app.listen(PORT, () => {
  console.log(${serverText});
});
`;
}