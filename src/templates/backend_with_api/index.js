import fs from "fs";
import path from "path";
import inquirer from "inquirer";
import chalk from "chalk";
import { log, makeSpinner } from "../../utils/logger.js";
import { setUpBasicExpressServer } from "../../utils/backend-utils/servers/setUpBasicExpressServer.js";
import { setUpGraphQLExpressServer } from "../../utils/backend-utils/servers/setUpGraphQLExpressServer.js";
import { setUpGraphQLStandaloneServer } from "../../utils/backend-utils/servers/setUpStandAloneGraphQLServer.js";

export async function generateBackendAPI(projectPath, projectName) {
  console.log(
    chalk.yellow("\nLet's configure your Backend API project.\n")
  );

  // Ask for server type
  const { serverType } = await inquirer.prompt([
    {
      type: "list",
      name: "serverType",
      message: "🔧 Choose your backend server type:",
      choices: [
        { name: "Express REST API", value: "express" },
        { name: "GraphQL (Apollo + Express)", value: "graphql-express" },
        { name: "GraphQL (Apollo Standalone)", value: "graphql-standalone" },
      ],
      default: "express",
    },
  ]);

  // Ask for database type
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

  // Setup server based on selected server type
  const serverSpinner = makeSpinner("🛠️ Setting up your backend...").start();
  
  try {
    switch (serverType) {
      case "express":
        serverSpinner.stop();
        await setUpBasicExpressServer(projectName, projectPath, databaseType);
        break;
      case "graphql-express":
        serverSpinner.stop();
        await setUpGraphQLExpressServer(projectName, projectPath, databaseType);
        break;
      case "graphql-standalone":
        serverSpinner.stop();
        await setUpGraphQLStandaloneServer(projectName, projectPath, databaseType);
        break;
    }
  } catch (err) {
    serverSpinner.error({ text: "❌ Failed to setup backend." });
    console.error(err);
    process.exit(1);
  }

  // ------------------ DYNAMIC LOGS ------------------
  const serverLabel = getServerLabel(serverType);
  const databaseLabel = getDatabaseLabel(databaseType);

  log.success(`\n🎉 Backend with API Project Setup Complete!\n`);

  log.info(`📁 Project structure:`);
  console.log(`
${projectName}/
├── config/           # Configuration files
├── connections/      # Database connection
├── middlewares/      # Express middlewares${serverType.includes("graphql") ? `
├── graphql/          # GraphQL schema & resolvers` : `
├── routes/           # API routes`}
├── models/           # Database models
├── .env.example      # Environment template
├── .gitignore        # Git ignore rules
└── index.js          # Entry point
`);

  log.info(`📦 Installed & configured:`);
  console.log(`
✔️  ${serverLabel}
✔️  ${databaseLabel}
✔️  Nodemon + CORS + dotenv
`);

  log.info(`ℹ️  Database is not connected by default.`);
  console.log(`   Update .env file to enable database connection.\n`);

  log.info(`🚀 To get started:\n`);
  console.log(
    `  cd ${projectName}\n  npm run dev\n`
  );

  if (serverType.includes("graphql")) {
    const endpoint = serverType === "graphql-express" 
      ? "http://localhost:3000/graphql" 
      : "http://localhost:3000";
    log.info(`🔮 GraphQL Playground available at: ${endpoint}\n`);
  }
}

// Helper functions
function getServerLabel(serverType) {
  switch (serverType) {
    case "express": return "Express REST API";
    case "graphql-standalone": return "GraphQL Standalone (Apollo)";
    case "graphql-express": return "Express + GraphQL (Apollo)";
    default: return "Express";
  }
}

function getDatabaseLabel(databaseType) {
  switch (databaseType) {
    case "mongodb": return "MongoDB (Mongoose)";
    case "sequelize": return "PostgreSQL/MySQL (Sequelize)";
    case "mysql-native": return "MySQL Native (mysql2)";
    default: return "Database";
  }
}
