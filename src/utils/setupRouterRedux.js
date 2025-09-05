import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { makeSpinner, log } from "./logger.js";
import { uiData } from "../constants/uiData.js";

export async function setupRouterRedux(projectPath, isTS) {
  const spinner = makeSpinner(
    "Installing and Setting up Router and Redux..."
  ).start();

  try {


  
    // Setup Router Example (main.jsx / main.tsx)
    const mainJsxPath = path.join(projectPath, "src", "main.jsx");
    const mainTsxPath = path.join(projectPath, "src", "main.tsx");
    if (isTS) {
      fs.writeFileSync(
        mainTsxPath,
        `${uiData.combinations.router_redux.main.ts}\n`
      );
    } else {
      fs.writeFileSync(
        mainJsxPath,
        `${uiData.combinations.router_redux.main.js}\n`
      );
    }
  
        // Setup Redux (store)
        // src/store/store.ts
        const storePath = path.join(projectPath, "src", "store");
        if (!fs.existsSync(storePath)) fs.mkdirSync(storePath,{recursive:true});
    
        if (isTS) {
          fs.writeFileSync(
            path.join(storePath, "store.ts"),
            `${uiData.redux.store.ts}\n`
          );
        } else {
          fs.writeFileSync(
            path.join(storePath, "store.js"),
            `${uiData.redux.store.js}\n`
          );
        }
    
        // Setup Slice (Counter Slice)
        // path: src/features/counter/counterSlice.ts or counterSlice.js
       const counterSlicePath = path.join(projectPath, "src", "features","counter");
        if (!fs.existsSync(counterSlicePath)) fs.mkdirSync(counterSlicePath,{recursive:true});
    
        if (isTS) {
          fs.writeFileSync(
            path.join(counterSlicePath, "counterSlice.ts"),
            `${uiData.redux.counter_slice.ts}\n`
          );
        } else {
          fs.writeFileSync(
            path.join(counterSlicePath, "counterSlice.js"),
            `${uiData.redux.counter_slice.js}\n`
          );
        }

    // Setup App
    const appPath = path.join(projectPath, "src", isTS ? "App.tsx" : "App.jsx");
    fs.writeFileSync(appPath, `${uiData.combinations.router_redux.App}\n`);


    // Setup Example Pages
    const pagesPath = path.join(projectPath, "src", "pages");
    if (!fs.existsSync(pagesPath)) fs.mkdirSync(pagesPath, { recursive: true });

    if (isTS) {
      fs.writeFileSync(
        path.join(pagesPath, "Home.tsx"),
        `${uiData.combinations.router_redux.Home.ts}\n`
      );
    } else {
      fs.writeFileSync(
        path.join(pagesPath, "Home.jsx"),
        `${uiData.combinations.router_redux.Home.js}\n`
      );
    }

    if (isTS) {
      fs.writeFileSync(
        path.join(pagesPath, "About.tsx"),
        `${uiData.combinations.router_redux.About}\n`
      );
    } else {
      fs.writeFileSync(
        path.join(pagesPath, "About.jsx"),
        `${uiData.combinations.router_redux.About}\n`
      );
    }

    // Install packages
    execSync("npm install react-router-dom @reduxjs/toolkit react-redux", {
      cwd: projectPath,
      stdio: "inherit",
    });
    spinner.success({ text: " Required packages are installed! \n" });

    log.success(" Redux + Router setup completed! \n");
  } catch (err) {
    spinner.error({ text: "❌ Setup failed." });
    log.error(err.message);
    process.exit(1);
  }
}
