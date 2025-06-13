import { execSync } from "child_process";
import { makeSpinner, log } from "./logger.js";

export async function autoInstallDeps(projectPath) {
  const spinner = makeSpinner("📦 Installing dependencies...").start();
  try {
    execSync("npm install", { cwd: projectPath, stdio: "inherit" });
    spinner.success({ text: "✅ npm install completed!" });
  } catch (err) {
    spinner.error({ text: "❌ npm install failed." });
    log.error(err.message);
    process.exit(1);
  }
}
