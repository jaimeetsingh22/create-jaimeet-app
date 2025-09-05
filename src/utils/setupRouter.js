import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { makeSpinner, log } from "./logger.js";
import { uiData } from "../constants/uiData.js";

export async function setupRouter(projectPath, isTS) {
  const spinner = makeSpinner(
    "Installing and Setting up Router Example..."
  ).start();

  try {
  
    //  Setup Router Example (main.jsx / main.tsx)
    const mainJsxPath = path.join(projectPath, "src", "main.jsx");
    const mainTsxPath = path.join(projectPath, "src", "main.tsx");
    if (isTS) {
      fs.writeFileSync(
        mainTsxPath,
        `${uiData.router.main.ts}\n`
      );
    } else {
      fs.writeFileSync(
        mainJsxPath,
        `${uiData.router.main.js}\n`
      );
    }

    // Setup App
    const appPath = path.join(projectPath, "src", isTS ? "App.tsx" : "App.jsx");
    fs.writeFileSync(appPath, `${uiData.router.App}\n`);

    // Setup Example Pages
    const pagesPath = path.join(projectPath, "src", "pages");
    if (!fs.existsSync(pagesPath)) fs.mkdirSync(pagesPath, { recursive: true });

    if (isTS) {
      fs.writeFileSync(
        path.join(pagesPath, "Home.tsx"),
        `${uiData.router.Home}\n`
      );
    } else {
      fs.writeFileSync(
        path.join(pagesPath, "Home.jsx"),
        `${uiData.router.Home}\n`
      );
    }

    if (isTS) {
      fs.writeFileSync(
        path.join(pagesPath, "About.tsx"),
        `${uiData.router.About}\n`
      );
    } else {
      fs.writeFileSync(
        path.join(pagesPath, "About.jsx"),
        `${uiData.router.About}\n`
      );
    }

    // Install packages
    execSync("npm install react-router-dom", {
      cwd: projectPath,
      stdio: "inherit",
    });
    spinner.success({ text: "Required packages are installed! \n" });

    log.success("Router(react-router-dom) setup completed! \n");
  } catch (err) {
    spinner.error({ text: "❌ Setup failed." });
    log.error(err.message);
    process.exit(1);
  }
}
