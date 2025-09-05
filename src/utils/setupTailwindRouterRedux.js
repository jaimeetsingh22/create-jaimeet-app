import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { makeSpinner, log } from "./logger.js";
import { uiData } from "../constants/uiData.js";

export async function setupTailwindRouterRedux(projectPath, isTS) {
  const spinner = makeSpinner(
    "🎨 Installing Tailwind CSS, Router and Redux..."
  ).start();

  try {

    // 1. Find vite config file
    const jsPath = path.join(projectPath, "vite.config.js");
    const tsPath = path.join(projectPath, "vite.config.ts");

    let vitePath;
    if (fs.existsSync(tsPath)) {
        vitePath = tsPath;
    } else if (fs.existsSync(jsPath)) {
        vitePath = jsPath;
    } else {
      throw new Error("vite.config.js or vite.config.ts not found.");
    }

    // 2. Modify vite config
    let viteCode = fs.readFileSync(vitePath, "utf-8");

    if (!viteCode.includes("@tailwindcss/vite")) {
      viteCode = `import tailwindcss from "@tailwindcss/vite";\n` + viteCode;
    }

    viteCode = viteCode.replace(
      /plugins:\s*\[(.*?)\]/s,
      (match, p1) => `plugins: [${p1.trim()}, tailwindcss()]`
    );

    fs.writeFileSync(vitePath, viteCode);

    // 3. Setup CSS
    const cssPath = path.join(projectPath, "src", "index.css");
    fs.writeFileSync(cssPath, `${uiData.tailwind.indexCss}\n`);


    // 4. Setup Router Example (main.jsx / main.tsx)
    const mainJsxPath = path.join(projectPath, "src", "main.jsx");
    const mainTsxPath = path.join(projectPath, "src", "main.tsx");
    if (isTS) {
      fs.writeFileSync(
        mainTsxPath,
        `${uiData.combinations.tailwind_router_redux.main.ts}\n`
      );   
    } else {
      fs.writeFileSync(
        mainJsxPath,
        `${uiData.combinations.tailwind_router_redux.main.js}\n`
      );
    }

    
    // 5. Setup App
  const appPath = path.join(projectPath, "src", isTS ? "App.tsx" : "App.jsx");
    fs.writeFileSync(
        appPath,
        `${uiData.combinations.tailwind_router_redux.App}\n`
      );

    // 6. Setup Redux (store)
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

    //7. Setup Slice (Counter Slice)
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

    // 8. Setup Example Pages
    const pagesPath = path.join(projectPath, "src", "pages");
  if(!fs.existsSync(pagesPath))fs.mkdirSync(pagesPath,{recursive:true});

    if (isTS) {
      fs.writeFileSync(
        path.join(pagesPath, "Home.tsx"),
        `${uiData.combinations.tailwind_router_redux.Home.ts}\n`
      );
    } else {
      fs.writeFileSync(
        path.join(pagesPath, "Home.jsx"),
        `${uiData.combinations.tailwind_router_redux.Home.js}\n`
      );
    }

    if(isTS){
      fs.writeFileSync(
      path.join(pagesPath, "About.tsx"),
      `${uiData.combinations.tailwind_router_redux.About}\n`
    );
    }else {
      fs.writeFileSync(
      path.join(pagesPath, "About.jsx"),
      `${uiData.combinations.tailwind_router_redux.About}\n`
    );
    }

        // Install packages
    execSync("npm install -D tailwindcss @tailwindcss/vite", {
      cwd: projectPath,
      stdio: "inherit",
    });
    execSync("npm install react-router-dom @reduxjs/toolkit react-redux", {
      cwd: projectPath,
      stdio: "inherit",
    });
    spinner.success({ text: "Required packages are installed!" });


    log.success("Tailwind + Router + Redux setup completed!");
  } catch (err) {
    spinner.error({ text: "❌ Setup failed." });
    log.error(err.message);
    process.exit(1);
  }
}
