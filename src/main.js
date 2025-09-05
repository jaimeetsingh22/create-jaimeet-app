import chalk from "chalk";
import inquirer from "inquirer";
import {
  welcome,
  askProjectName,
  askProjectType,
} from "./prompts/projectType.js";
import { createProjectFolder } from "./utils/copyTemplate.js";
import { generateBackendAPI } from "./templates/backend_with_api/index.js";
import { generateBackendSSR } from "./templates/backend_with_ssr/index.js";
import { generateReactJS } from "./templates/react_js/index.js";
import { generateReactTS } from "./templates/react_ts/index.js";
import { generateMERN } from "./templates/mern_stack/index.js";
import { generateNextJS } from "./templates/nextjs/index.js";

// Graceful exit
function handleExit(message) {
  console.clear();
  console.log(
    chalk.redBright(`\n✖️  CLI terminated by user (${message}). Goodbye!\n`)
  );
  process.exit(0);
}

process.on("SIGINT", () => handleExit("Ctrl + C"));
process.on("SIGTERM", () => handleExit("Termination Signal"));

// Patch inquirer to catch Ctrl+C and exit cleanly
inquirer.prompt = ((originalPrompt) => async (questions) => {
  try {
    return await originalPrompt(questions);
  } catch (err) {
    const msg = (err.message || "").toLowerCase();
    const isUserCancel =
      err.isTtyError || msg.includes("sigint") || msg.includes("canceled");

    if (isUserCancel) {
      handleExit("Ctrl + C");
    }

    throw err;
  }
})(inquirer.prompt);

let projectName = "";
async function runCLI() {
  await welcome();
  const recievedProjectName = await askProjectName();
  projectName = recievedProjectName.trim().toLowerCase().replace(/\s+/g, "-");
  const projectPath = await createProjectFolder(projectName);

  const stack = await askProjectType();


  switch (stack) {
    case "Next.js ▲":
      await generateNextJS(projectPath, projectName);
      break;

    case "MERN Stack 🔥":
      await generateMERN(projectPath, projectName);
      break;

    case "React (TypeScript) ⚛":
      await generateReactTS(projectPath, projectName);
      break;

    case "React (JavaScript) ⚛️":
      await generateReactJS(projectPath, projectName);
      break;

    case "Backend with API 🛠️":
      await generateBackendAPI(projectPath, projectName);
      break;

    case "Backend with SSR 🗄️":
      await generateBackendSSR(projectPath, projectName);
      break;

    default:
      console.log("❌ Unknown stack. Exiting.");
      process.exit(1);
  }
}

export default runCLI;
