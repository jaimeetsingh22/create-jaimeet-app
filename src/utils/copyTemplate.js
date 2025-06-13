import fs from "fs";
import path from "path";
import { createSpinner } from "nanospinner";
import chalk from "chalk";

export async function createProjectFolder(projectName) {
  const projectPath = path.join(process.cwd(), projectName);
  const spinner = createSpinner("📁 Creating project folder...").start();

  if (fs.existsSync(projectPath)) {
    spinner.error({ text: `❌ Folder '${projectName}' already exists!` });
    process.exit(1);
  }

  fs.mkdirSync(projectPath);
  spinner.success({ text: `✅ Folder '${projectName}' created!` });

  return projectPath;
}
