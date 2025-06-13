import fs from "fs";
import path from "path";
import { backend_with_SSR_data } from "../../constants/data.js";
import { setupNpm, installDependencies } from "../../utils/installDeps.js";
import { log } from "../../utils/logger.js";

export async function generateBackendSSR(projectPath, projectName) {
  const folders = [
    "config",
    "connections",
    "middlewares",
    "models",
    "router",
    "views",
    "public",
    "controllers"
  ];

  const files = {
    "index.js": backend_with_SSR_data.index,
    "connections/connectToDB.js": backend_with_SSR_data.connectToDB,
    "middlewares/middleware.js": backend_with_SSR_data.middlewares,
    "router/route.js": backend_with_SSR_data.route,
    "config/config.js": "// write your configuration code here",
    "views/index.ejs": backend_with_SSR_data.view,
    "public/style.css": backend_with_SSR_data.public,
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
    `# ${projectName}\n\nThis is a Node.js project with SSR (EJS).\n`
  );

  // Setup npm and install packages
  await setupNpm(projectPath, {
    start: "node index.js",
    dev: "nodemon index.js",
  });

  await installDependencies(
    projectPath,
    [
      "express",
      "cors",
      "dotenv",
      "mongoose",
      "ejs",
      "cookie-parser",
      "jsonwebtoken",
      "multer",
    ],
    ["nodemon"]
  );

  log.success(`\n🚀 Your backend with SSR project is ready!\n`);
}
