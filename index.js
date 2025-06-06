#!/usr/bin/env node

// welcome to the open source code of create-jaimeet-app cli
// improved with graceful termination and better spinner handling

// imports
import fs from "fs";
import path from "path";
import chalk from "chalk";
import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
import { createSpinner } from "nanospinner";
import childProcess from "child_process";
import { backend_with_API_data, backend_with_SSR_data } from "./data.js";

const sleep = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms));

// Graceful exit on Ctrl+C or process termination
function handleExit(message) {
  console.clear();
  console.log(
    chalk.redBright(`\n✖️  CLI terminated by user (${message}). Goodbye!\n`)
  );
  process.exit(0);
}

process.on("SIGINT", () => handleExit("Ctrl + C"));
process.on("SIGTERM", () => handleExit("termination"));

// Patch inquirer to suppress raw error
inquirer.prompt = ((originalPrompt) => async (questions) => {
  try {
    return await originalPrompt(questions);
  } catch (err) {
    if (err.isTtyError || err.message.includes('SIGINT')) {
      handleExit("Ctrl + C");
    }
    throw err;
  }
})(inquirer.prompt);

// welcome message
async function welcome() {
  const title = chalkAnimation.rainbow("\n✨ Welcome to create-jaimeet-app CLI ✨\n");
  await sleep();
  title.stop();
  console.log(
    chalk.greenBright("This CLI will help you scaffold a Node.js app with ease.\n")
  );
}

let projectName;

async function createProject() {
  const { project_name } = await inquirer.prompt([
    {
      type: "input",
      name: "project_name",
      message: "📁 Enter your project name:",
      validate: (input) => (input ? true : "Project name cannot be empty."),
      default: "my-app",
    },
  ]);

  projectName = project_name;
  const projectPath = path.join(process.cwd(), project_name);
  const spinner = createSpinner("Creating project directory...").start();
  await sleep();

  if (fs.existsSync(projectPath)) {
    spinner.error({ text: `Project '${project_name}' already exists!` });
    process.exit(1);
  }

  fs.mkdirSync(projectPath);
  spinner.success({ text: `✅ Project '${project_name}' created successfully!` });
}

async function chooseBackend() {
  const { backend } = await inquirer.prompt([
    {
      type: "list",
      name: "backend",
      message: "⚙️  Choose your backend setup:",
      choices: ["Backend with SSR", "Backend with API"],
      default: "Backend with API",
    },
  ]);
  return handleBackendChoice(backend);
}

async function handleBackendChoice(backend) {
  const projectPath = path.join(process.cwd(), projectName);

  if (backend === "Backend with SSR") {
    console.log(chalk.blueBright("\n🔧 Setting up Backend with SSR...\n"));
    await createBackendWithSSR(projectPath);
  } else {
    console.log(chalk.blueBright("\n🔧 Setting up Backend with API...\n"));
    await createBackendWithAPI(projectPath);
  }

  const spinner1 = createSpinner("📦 Initializing npm...").start();
  await sleep(2000);

  try {
    childProcess.execSync("npm init -y", { cwd: projectPath, stdio: "inherit" });
    childProcess.execSync("npm pkg set type=module", { cwd: projectPath, stdio: "inherit" });
    childProcess.execSync('npm pkg set scripts.start="node index.js"', { cwd: projectPath, stdio: "inherit" });
    childProcess.execSync('npm pkg set scripts.dev="nodemon index.js"', { cwd: projectPath, stdio: "inherit" });
    spinner1.success({ text: "✅ npm initialized!" });

    const spinner2 = createSpinner("⬇️ Installing dependencies...").start();
    await sleep(2000);

    const deps = backend === "Backend with SSR"
      ? "express cors dotenv mongoose ejs cookie-parser jsonwebtoken multer"
      : "express cors dotenv mongoose";

    childProcess.execSync(`npm install ${deps}`, { cwd: projectPath, stdio: "inherit" });
    childProcess.execSync("npm install nodemon --save-dev", { cwd: projectPath, stdio: "inherit" });

    spinner2.success({
      text: chalk.greenBright(
        `✅ All set!\n\nTo get started:\n  cd ${projectName}\n  npm run dev    # For development\n  npm start      # For production`
      ),
    });
  } catch (error) {
    console.error(chalk.red("\n❌ Error during npm setup."));
    process.exit(1);
  }
}

async function createBackendWithSSR(projectPath) {
  const folders = ["config", "connections", "middlewares", "models", "router", "views", "public"];
  const files = [
    "index.js",
    "connections/connectToDB.js",
    "middlewares/middleware.js",
    "router/route.js",
    "config/config.js",
    "views/index.ejs",
    "public/style.css",
  ];

  fs.appendFileSync(
    path.join(projectPath, "README.md"),
    `# ${projectName}\n\nThis is a Node.js project with SSR.\n`
  );

  folders.forEach((folder) => {
    const folderPath = path.join(projectPath, folder);
    if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath);
  });

  files.forEach((file) => {
    const filePath = path.join(projectPath, file);
    if (!fs.existsSync(filePath)) {
      if (file === "index.js") fs.writeFileSync(filePath, backend_with_SSR_data.index);
      else if (file === "connections/connectToDB.js") fs.writeFileSync(filePath, backend_with_SSR_data.connectToDB);
      else if (file === "router/route.js") fs.writeFileSync(filePath, backend_with_SSR_data.route);
      else if (file === "config/config.js") fs.writeFileSync(filePath, "// write your configuration code here");
      else if (file === "views/index.ejs") fs.writeFileSync(filePath, backend_with_SSR_data.view);
      else if (file === "public/style.css") fs.writeFileSync(filePath, backend_with_SSR_data.public);
      else if (file === "middlewares/middleware.js") fs.writeFileSync(filePath, backend_with_SSR_data.middlewares);
    }
  });
}

async function createBackendWithAPI(projectPath) {
  const folders = ["config", "connections", "middlewares", "models", "router", "public"];
  const files = [
    "index.js",
    "connections/connectToDB.js",
    "middlewares/middleware.js",
    "router/route.js",
    "config/config.js",
  ];

  fs.appendFileSync(
    path.join(projectPath, "README.md"),
    `# ${projectName}\n\nThis is a Node.js project with REST API.\n`
  );

  folders.forEach((folder) => {
    const folderPath = path.join(projectPath, folder);
    if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath);
  });

  files.forEach((file) => {
    const filePath = path.join(projectPath, file);
    if (!fs.existsSync(filePath)) {
      if (file === "index.js") fs.writeFileSync(filePath, backend_with_API_data.index);
      else if (file === "connections/connectToDB.js") fs.writeFileSync(filePath, backend_with_API_data.connectToDB);
      else if (file === "router/route.js") fs.writeFileSync(filePath, backend_with_API_data.route);
      else if (file === "middlewares/middleware.js") fs.writeFileSync(filePath, backend_with_API_data.middlewares);
      else if (file === "config/config.js") fs.writeFileSync(filePath, "// write your configuration code here");
    }
  });
}

await welcome();
await createProject();
await chooseBackend();
