import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import { createSpinner } from "nanospinner";

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

export async function welcome() {
  const title = chalkAnimation.rainbow(
    "\n✨ Welcome to create-jaimeet-app CLI ✨\n"
  );
  await sleep(1500);
  title.stop();
  console.log(chalk.greenBright("Let's build your project in seconds!"));
  console.log(
    chalk.greenBright(
      "I will set everything up for you. Just answer a few questions!\n"
    )
  );
}

export async function askProjectName() {
  const { projectName } = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "📁 Enter your project name:",
      default: "my-app",
      validate: (input) => (input ? true : "Project name cannot be empty."),
    },
  ]);
  return projectName; // it will convert to lowercase and replace spaces with hyphens
}

export async function askProjectType() {
  const { projectType } = await inquirer.prompt([
    {
      type: "list",
      name: "projectType",
      message: "🚀 Choose your project type:",
      choices: [
        "Next.js ▲",
        "MERN Stack 🔥",
        "React (TypeScript) ⚛",
        "React (JavaScript) ⚛️",
        "Backend with API 🛠️",
        "Backend with SSR 🗄️",
      ],
    },
  ]);
  
  return projectType;
}




export async function askUIFeatures() {
  const answers = await inquirer.prompt([
    {
      type: "confirm",
      name: "tailwind",
      message: "Do you want to enable Tailwind CSS?",
      default: true,
    },
    {
      type: "confirm",
      name: "router",
      message: "Do you want routing (react-router-dom) enabled with example? (File-based routing will be in next update!)",
      default: true,
    },
    {
      type: "confirm",
      name: "redux",
      message: "Do you want to implement Redux (Redux Toolkit)?",
      default: false,
    },
  ]);

  return answers;
}


