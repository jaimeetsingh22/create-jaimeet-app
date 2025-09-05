import { exec, execSync } from "child_process";
import path from "path";
import { log, makeSpinner } from "../../utils/logger.js";
import { runSetup } from "../../utils/runSetup.js";
import { askUIFeatures } from "../../prompts/projectType.js";

export async function generateReactTS(projectPath, projectName) {
  const spinner = makeSpinner("⚛️ Creating Vite + React TypeScript project...").start();

  try {
    execSync(`npm create vite@latest ${projectName} -- --template react-ts`, {
      cwd: path.dirname(projectPath),
      stdio: "ignore",
    });
    spinner.success({ text: "\n ✅ React + TypeScript project created with Vite!" });
  } catch (err) {
    spinner.error({ text: "❌ Failed to create Vite + TS project." });
    process.exit(1);
  }
  const features = await askUIFeatures();
  await runSetup(projectPath,features,true);
  log.success(`\n🚀 Your React TypeScript project is ready!\nTo start:\n  cd ${projectName}\n  npm run dev\n`);
}
