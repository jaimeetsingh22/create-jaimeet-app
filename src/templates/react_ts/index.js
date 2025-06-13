import { execSync } from "child_process";
import path from "path";
import fs from "fs";
import { log, makeSpinner } from "../../utils/logger.js";
import { askTailwindEnable } from "../../prompts/projectType.js";
import { setupTailwind } from "../../utils/setupTailwind.js";
import { autoInstallDeps } from "../../utils/npmInstall.js";

export async function generateReactTS(projectPath, projectName) {
  const spinner = makeSpinner("⚛️ Creating Vite + React TypeScript project...").start();

  try {
    execSync(`npm create vite@latest ${projectName} -- --template react-ts`, {
      cwd: path.dirname(projectPath),
      stdio: "ignore",
    });
    spinner.success({ text: "✅ React + TypeScript project created with Vite!" });
  } catch (err) {
    spinner.error({ text: "❌ Failed to create Vite + TS project." });
    process.exit(1);
  }

  const enableTailwind = await askTailwindEnable();

  if (enableTailwind) {
    await setupTailwind(projectPath);
    await autoInstallDeps(projectPath);
log.success(`\n🚀 Your React TypeScript project is ready!\nTo start:\n  cd ${projectName}\n  npm run dev`);
    return;
  }
  await autoInstallDeps(projectPath);
  log.success(`\n🚀 Your React TypeScript project is ready!\nTo start:\n  cd ${projectName}\n  npm run dev\n`);
}
