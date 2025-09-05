import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { makeSpinner, log } from "./logger.js";
import { uiData } from "../constants/uiData.js";

export async function setupRedux(projectPath, isTS) {
  const spinner = makeSpinner("Installing and Setting up Redux...").start();

  try {
    //  Setup Router Example (main.jsx / main.tsx)
    const mainJsxPath = path.join(projectPath, "src", "main.jsx");
    const mainTsxPath = path.join(projectPath, "src", "main.tsx");
    if (isTS) {
      fs.writeFileSync(mainTsxPath, `${uiData.redux.main.ts}\n`);
    } else {
      fs.writeFileSync(mainJsxPath, `${uiData.redux.main.js}\n`);
    }

    // Setup App
    const appPath = path.join(projectPath, "src", isTS ? "App.tsx" : "App.jsx");
    fs.writeFileSync(
      appPath,
      `${isTS ? uiData.redux.App.ts : uiData.redux.App.js}\n`
    );

    //  Setup Redux (store)
    // src/store/store.ts
    const storePath = path.join(projectPath, "src", "store");
    if (!fs.existsSync(storePath)) fs.mkdirSync(storePath, { recursive: true });

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
    const counterSlicePath = path.join(
      projectPath,
      "src",
      "features",
      "counter"
    );
    if (!fs.existsSync(counterSlicePath))
      fs.mkdirSync(counterSlicePath, { recursive: true });

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

    // Install packages
    execSync("npm install @reduxjs/toolkit react-redux", {
      cwd: projectPath,
      stdio: "inherit",
    });
    spinner.success({ text: "Required packages are installed! \n" });

    log.success("Redux(reduxjs/toolkit) setup completed! \n");
  } catch (err) {
    spinner.error({ text: "❌ Setup failed." });
    log.error(err.message);
    process.exit(1);
  }
}
