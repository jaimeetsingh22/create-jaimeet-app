// Git repository initialization utility
// Gracefully handles missing git installation

import { execSync } from "child_process";
import { log } from "../logger.js";

/**
 * Initialize git repository with initial commit
 * Gracefully warns if git is not installed (doesn't crash)
 * @param {string} projectPath - Path to project root
 */
export async function initGitRepo(projectPath) {
  try {
    // Check if git is available
    try {
      execSync("git --version", { stdio: "ignore" });
    } catch {
      log.warn("Git is not installed. Skipping git initialization.");
      log.info("You can install git from https://git-scm.com/ and run 'git init' manually.");
      return false;
    }

    // Initialize git repo
    execSync("git init", { cwd: projectPath, stdio: "ignore" });
    
    // Add all files
    execSync("git add .", { cwd: projectPath, stdio: "ignore" });
    
    // Create initial commit
    execSync('git commit -m "chore: initial project setup via create-jaimeet-app"', {
      cwd: projectPath,
      stdio: "ignore",
    });

    log.success("Git repository initialized with initial commit!");
    return true;
  } catch (error) {
    log.warn("Failed to initialize git repository. You can do this manually.");
    return false;
  }
}
