import { execSync } from "child_process";
import { log, makeSpinner } from "../../utils/logger.js";

export async function generateNextJS(projectPath, projectName) {
  const spinner = makeSpinner("⚙️ Launching Next.js CLI...").start();

  try {
    spinner.stop();
    console.log("\n🧩 Switching to Next.js CLI wizard. Please follow the prompts:\n");

    // Just launch CLI wizard — user will decide everything
    execSync(`npx create-next-app@latest ${projectName}`, {
      stdio: "inherit",
    });

    log.success(`\n✅ Next.js app created via official CLI!\n`);
  } catch (err) {
    log.error("❌ Next.js CLI setup failed.");
    process.exit(1);
  }
}
