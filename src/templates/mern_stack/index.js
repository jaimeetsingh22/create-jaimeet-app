import { execSync } from "child_process";
import fs from "fs";
import inquirer from "inquirer";
import path from "path";
import chalk from "chalk";
import { askUIFeatures } from "../../prompts/projectType.js";
import { log, makeSpinner } from "../../utils/logger.js";
import { runSetup } from "../../utils/runSetup.js";
import { setUpBasicExpressServer } from "../../utils/backend-utils/servers/setUpBasicExpressServer.js";
import { setUpGraphQLExpressServer } from "../../utils/backend-utils/servers/setUpGraphQLExpressServer.js";
import { setUpGraphQLStandaloneServer } from "../../utils/backend-utils/servers/setUpStandAloneGraphQLServer.js";

export async function generateMERN(projectPath, projectName) {
  const clientPath = path.join(projectPath, "client");
  const serverPath = path.join(projectPath, "server");

  // Create server folder first
  fs.mkdirSync(serverPath, { recursive: true });

  // ------------------ CLIENT ------------------
  console.log(
    chalk.yellow("\nLet's set up the client (React + Vite) first.\n")
  );
  const { isTS } = await inquirer.prompt([
    {
      type: "confirm",
      name: "isTS",
      message:
        "Would you like to use TypeScript for the client? (Recommended for larger projects)",
      default: false,
    },
  ]);
  const clientSpinner = makeSpinner(
    "⚛️ Creating client (React + Vite)..."
  ).start();
  try {
    execSync(
      `npm create vite@latest client -- --template ${
        isTS ? "react-ts" : "react"
      }`,
      {
        cwd: projectPath,
        stdio: "ignore",
      }
    );
    clientSpinner.success({ text: "✅ Client created!" });
  } catch (err) {
    clientSpinner.error({ text: "❌ Failed to create Vite client." });
    process.exit(1);
  }

  const features = await askUIFeatures();

  await runSetup(clientPath, features, isTS);

  // ------------------ SERVER ------------------

  console.log(
    chalk.yellow("\nNow, let's set up the server (Node.js + JavaScript).\n")
  );
  console.log(
    chalk.blue("ℹ️  TypeScript support will be added in the next update!\n")
  );

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

  const { databaseType } = await inquirer.prompt([
    {
      type: "list",
      name: "databaseType",
      message: "🗄️ Select a database for your server:",
      choices: [
        { name: "MongoDB (with Mongoose)", value: "mongodb" },
        { name: "PostgreSQL / MySQL (with Sequelize ORM)", value: "sequelize" },
        { name: "MySQL Native (mysql2 – raw SQL)", value: "mysql-native" },
      ],
      default: "mongodb",
    },
  ]);

  // Setup server based on selected server type
  const serverSpinner = makeSpinner("🛠️ Setting up server...").start();
  
  try {
    switch (serverType) {
      case "express":
        serverSpinner.stop();
        await setUpBasicExpressServer(projectName, serverPath, databaseType);
        break;
      case "graphql-express":
        serverSpinner.stop();
        await setUpGraphQLExpressServer(projectName, serverPath, databaseType);
        break;
      case "graphql-standalone":
        serverSpinner.stop();
        await setUpGraphQLStandaloneServer(projectName, serverPath, databaseType);
        break;
    }
  } catch (err) {
    serverSpinner.error({ text: "❌ Failed to setup server." });
    console.error(err);
    process.exit(1);
  }

  // ------------------ DYNAMIC LOGS ------------------
  const serverLabel = getServerLabel(serverType);
  const databaseLabel = getDatabaseLabel(databaseType);
  const frontendLabel = isTS ? "React + TypeScript (Vite)" : "React (Vite)";
  const featuresLabel = getFeaturesLabel(features);

  log.success(`\n🎉 MERN Stack Project Setup Complete!\n`);

  log.info(`📁 Project structure:`);
  console.log(`
${projectName}/
├── client/   → ${frontendLabel}
└── server/   → ${serverLabel}
`);

  log.info(`📦 Installed & configured:`);
  console.log(`
✔️  ${frontendLabel}${featuresLabel}
✔️  ${serverLabel}
✔️  ${databaseLabel}
`);

  log.info(`ℹ️  Database is not connected by default.`);
  console.log(`   Update .env file to enable database connection.\n`);

  log.info(`🚀 To get started:\n`);
  console.log(
    `Frontend:\n  cd ${projectName}/client\n  npm run dev\n\nBackend:\n  cd ${projectName}/server\n  npm run dev\n`
  );
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

function getFeaturesLabel(features) {
  const { tailwind, router, redux } = features;
  const parts = [];
  if (tailwind) parts.push("Tailwind");
  if (router) parts.push("Router");
  if (redux) parts.push("Redux");
  return parts.length > 0 ? ` + ${parts.join(" + ")}` : "";
}
