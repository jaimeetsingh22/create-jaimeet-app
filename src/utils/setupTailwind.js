import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { makeSpinner, log } from "./logger.js";
import { uiData } from "../constants/uiData.js";


export async function setupTailwind(projectPath,isTS) {
  const spinner = makeSpinner("🎨 Installing Tailwind CSS...").start();

  try {
    // 1. Install packages
    execSync("npm install -D tailwindcss @tailwindcss/vite", {
      cwd: projectPath,
      stdio: "inherit",
    });
    spinner.success({ text: " Tailwind packages installed! \n" });

    // 2. Determine vite config file
    const jsPath = path.join(projectPath, "vite.config.js");
    const tsPath = path.join(projectPath, "vite.config.ts");

    let vitePath;
    if (fs.existsSync(jsPath)) {
      vitePath = jsPath;
    } else if (fs.existsSync(tsPath)) {
      vitePath = tsPath;
    } else {
      throw new Error("vite.config.js or vite.config.ts not found.");
    }

    // 3. Modify vite config
    let viteCode = fs.readFileSync(vitePath, "utf-8");

    if (!viteCode.includes("@tailwindcss/vite")) {
      viteCode = `import tailwindcss from "@tailwindcss/vite";\n` + viteCode;
    }

    viteCode = viteCode.replace(
      /plugins:\s*\[(.*?)\]/s,
      (match, p1) => `plugins: [${p1.trim()}, tailwindcss()]`
    );

    fs.writeFileSync(vitePath, viteCode);

    // 4. Create index.css
    const cssPath = path.join(projectPath, "src", "index.css");
    const appJsxPath = path.join(projectPath,"src","App.jsx")
    const appTsxPath = path.join(projectPath,"src","App.tsx");
    fs.writeFileSync(cssPath, `${uiData.tailwind.indexCss}\n`);

    if(fs.existsSync(appJsxPath)){
      fs.writeFileSync(appJsxPath,`${uiData.tailwind.App}\n`)
    }else if(fs.existsSync(appTsxPath)){
      fs.writeFileSync(appTsxPath,`${uiData.tailwind.App}\n`)
    }

    log.success("Tailwind CSS setup completed! \n");
  } catch (err) {
    spinner.error({ text: "❌ Tailwind setup failed." });
    log.error(err.message);
    process.exit(1);
  }
}
