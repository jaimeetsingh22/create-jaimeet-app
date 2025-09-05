import fs from "fs";
import path from "path";
import { backend_with_API_data } from "../../constants/backendData.js";
import { setupNpm, installDependencies } from "../../utils/installDeps.js";
import { log } from "../../utils/logger.js";

export async function generateBackendAPI(projectPath, projectName) {
  const folders = [
    "config",
    "connections",
    "middlewares",
    "models",
    "router",
    "public",
    "controllers"
  ];
  const files = {
    "index.js": backend_with_API_data.index,
    "connections/connectToDB.js": backend_with_API_data.connectToDB,
    "middlewares/middleware.js": backend_with_API_data.middlewares,
    "router/route.js": backend_with_API_data.route,
    "config/config.js": "// write your configuration code here",
  };

  // Create folders
  folders.forEach((folder) => {
    const folderPath = path.join(projectPath, folder);
    if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath);
  });

  // Create files
  for (const [file, content] of Object.entries(files)) {
    const filePath = path.join(projectPath, file);
    fs.writeFileSync(filePath, content.trimStart());
  }

  // Add README
  fs.writeFileSync(
    path.join(projectPath, "README.md"),
    `# ${projectName}\n\nThis is a Node.js project with REST API.\n`
  );

  // Setup npm and install packages
  await setupNpm(projectPath, {
    start: "node index.js",
    dev: "nodemon index.js",
  });

  await installDependencies(
    projectPath,
    ["express", "cors", "dotenv", "mongoose"],
    ["nodemon"]
  );

  log.success(`\n🚀 Your backend with API project is ready!\n`);
}
