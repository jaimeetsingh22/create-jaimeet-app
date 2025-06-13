import { execSync } from "child_process";
import { makeSpinner, log } from "./logger.js";

const sleep = (ms = 1500) => new Promise((res) => setTimeout(res, ms));

export async function setupNpm(projectPath, scripts = {}) {
  const spinner = makeSpinner("📦 Initializing npm...");

  try {
    await sleep();
    execSync("npm init -y", { cwd: projectPath, stdio: "ignore" });

    execSync("npm pkg set type=module", { cwd: projectPath });

    for (const [key, val] of Object.entries(scripts)) {
      execSync(`npm pkg set scripts.${key}="${val}"`, { cwd: projectPath });
    }

    spinner.success({ text: "✅ npm initialized!" });
  } catch (err) {
    spinner.error({ text: "❌ npm init failed!" });
    process.exit(1);
  }
}

export async function installDependencies(projectPath, deps = [], devDeps = []) {
  const spinner = makeSpinner("⬇️ Installing dependencies...");
  try {
    await sleep();
    if (deps.length)
      execSync(`npm install ${deps.join(" ")}`, { cwd: projectPath, stdio: "inherit" });
    if (devDeps.length)
      execSync(`npm install -D ${devDeps.join(" ")}`, { cwd: projectPath, stdio: "inherit" });

    spinner.success({ text: "✅ Dependencies installed!" });
  } catch (err) {
    spinner.error({ text: "❌ Failed to install dependencies!" });
    process.exit(1);
  }
}
