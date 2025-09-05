import { exec, execSync } from "child_process";
import path from "path";
import { log, makeSpinner } from "../../utils/logger.js";
import { runSetup } from "../../utils/runSetup.js";
import { askUIFeatures } from "../../prompts/projectType.js";

export async function generateReactJS(projectPath, projectName) {
  const spinner = makeSpinner("⚛️ Creating Vite + React project...").start();

  try {
    execSync(`npm create vite@latest ${projectName} -- --template react`, {
      cwd: path.dirname(projectPath),
      stdio: "ignore",
    });
    spinner.success({ text: "\n✅ React project created with Vite!\n" });
  } catch (err) {
    spinner.error({ text: "❌ Failed to create Vite project." });
    process.exit(1);
  }

  const features = await askUIFeatures();
  await runSetup(projectPath,features,false);
  
  log.success(
    `\n🚀 Your React JS project is ready!\nTo start:\n  cd ${projectName}\n  npm run dev\n`
  );
}
