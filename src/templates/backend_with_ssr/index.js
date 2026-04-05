import fs from "fs";
import path from "path";
import inquirer from "inquirer";
import chalk from "chalk";
import { backend_with_SSR_data } from "../../constants/backendData.js";
import { setupNpm, installDependencies } from "../../utils/installDeps.js";
import { log, makeSpinner } from "../../utils/logger.js";
import { generateGitignore, generateEnvExample, generateReadme } from "../../utils/backend-utils/generateProjectFiles.js";
import { initGitRepo } from "../../utils/backend-utils/initGitRepo.js";
import { mongoDBConnectionTemplate } from "../../utils/backend-utils/databases/connectMongoDB.js";
import { sequelizeConnectionTemplate } from "../../utils/backend-utils/databases/connectSequelize.js";
import { mysqlConnectionTemplate } from "../../utils/backend-utils/databases/connectMySQL.js";

export async function generateBackendSSR(projectPath, projectName) {
  console.log(
    chalk.yellow("\nLet's configure your Backend SSR project.\n")
  );
  
  // NOTE: SSR does NOT support GraphQL - only Express REST
  console.log(
    chalk.blue("ℹ️  SSR projects use Express + EJS for server-side rendering.\n")
  );

  // Ask for database type only (no GraphQL option for SSR)
  const { databaseType } = await inquirer.prompt([
    {
      type: "list",
      name: "databaseType",
      message: "🗄️ Select a database for your backend:",
      choices: [
        { name: "MongoDB (with Mongoose)", value: "mongodb" },
        { name: "PostgreSQL / MySQL (with Sequelize ORM)", value: "sequelize" },
        { name: "MySQL Native (mysql2 – raw SQL)", value: "mysql-native" },
      ],
      default: "mongodb",
    },
  ]);

  const folders = [
    "config",
    "connections",
    "middlewares",
    "models",
    "routes",
    "views",
    "public",
    "controllers"
  ];

  // Create folders
  folders.forEach((folder) => {
    const folderPath = path.join(projectPath, folder);
    if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, { recursive: true });
  });

  // Create files
  const files = {
    "middlewares/middleware.js": backend_with_SSR_data.middlewares,
    "routes/route.js": backend_with_SSR_data.route,
    "config/config.js": "// Write your configuration code here\n",
    "views/index.ejs": backend_with_SSR_data.view,
    "public/style.css": backend_with_SSR_data.public,
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
  files["index.js"] = generateSSRIndex(databaseType);

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
    isSSR: true,
  });

  // Setup npm and install packages
  await setupNpm(projectPath, {
    start: "node index.js",
    dev: "nodemon index.js",
  });

  // Install dependencies based on database type
  const deps = [
    "express",
    "cors",
    "dotenv",
    "ejs",
    "cookie-parser",
  ];
  
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

  // ------------------ DYNAMIC LOGS ------------------
  const databaseLabel = getDatabaseLabel(databaseType);

  log.success(`\n🎉 Backend with SSR Project Setup Complete!\n`);

  log.info(`📁 Project structure:`);
  console.log(`
${projectName}/
├── config/           # Configuration files
├── connections/      # Database connection
├── middlewares/      # Express middlewares
├── routes/           # API routes
├── models/           # Database models
├── views/            # EJS templates
├── public/           # Static files (CSS, images)
├── .env.example      # Environment template
├── .gitignore        # Git ignore rules
└── index.js          # Entry point
`);

  log.info(`📦 Installed & configured:`);
  console.log(`
✔️  Express + EJS (Server-Side Rendering)
✔️  ${databaseLabel}
✔️  Nodemon + CORS + Cookie Parser + dotenv
`);

  log.info(`ℹ️  Database is not connected by default.`);
  console.log(`   Update .env file to enable database connection.\n`);

  log.info(`🚀 To get started:\n`);
  console.log(
    `  cd ${projectName}\n  npm run dev\n`
  );
}

/**
 * Generate SSR index.js based on database type
 */
function generateSSRIndex(databaseType) {
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
import path from 'path';
import cookieParser from 'cookie-parser';
${dbImport}
import { Middleware } from './middlewares/middleware.js';
import route from './routes/route.js';

const app = express();
const PORT = process.env.PORT || 3000;

${dbConnect}

// Setting EJS views
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));
app.use(express.static(path.join(process.cwd(), 'public')));

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(Middleware);

// Views
app.get('/', (req, res) => {
  res.render('index', { title: 'Welcome to ${projectName || "My App"}' });
});

// API routes
app.use('/api', route);

app.listen(PORT, () => {
  console.log(${serverText});
});
`;
}

// Helper function
function getDatabaseLabel(databaseType) {
  switch (databaseType) {
    case "mongodb": return "MongoDB (Mongoose)";
    case "sequelize": return "PostgreSQL/MySQL (Sequelize)";
    case "mysql-native": return "MySQL Native (mysql2)";
    default: return "Database";
  }
}
