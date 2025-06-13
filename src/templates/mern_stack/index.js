import { execSync } from "child_process";
import path from "path";
import fs from "fs";
import { log, makeSpinner } from "../../utils/logger.js";
import { askTailwindEnable } from "../../prompts/projectType.js";
import { backend_with_API_data } from "../../constants/data.js";
import { setupNpm, installDependencies } from "../../utils/installDeps.js";
import { setupTailwind } from "../../utils/setupTailwind.js";
import { autoInstallDeps } from "../../utils/npmInstall.js";

export async function generateMERN(projectPath, projectName) {
  const clientPath = path.join(projectPath, "client");
  const serverPath = path.join(projectPath, "server");

  // ------------------ CLIENT ------------------
  const clientSpinner = makeSpinner("⚛️ Creating client (React + Vite)...").start();
  try {
    execSync(`npm create vite@latest client -- --template react`, {
      cwd: projectPath,
      stdio: "ignore",
    });
    clientSpinner.success({ text: "✅ Client created!" });
  } catch (err) {
    clientSpinner.error({ text: "❌ Failed to create Vite client." });
    process.exit(1);
  }

  // Optional Tailwind
  const enableTailwind = await askTailwindEnable();
  if (enableTailwind) {
    await setupTailwind(clientPath);
  }

  // Install client dependencies (always)
  await autoInstallDeps(clientPath);

  // ------------------ SERVER ------------------
  const folders = [
    "config",
    "connections",
    "middlewares",
    "models",
    "router",
    "public",
  ];

  const files = {
    "index.js": backend_with_API_data.index,
    "connections/connectToDB.js": backend_with_API_data.connectToDB,
    "middlewares/middleware.js": backend_with_API_data.middlewares,
    "router/route.js": backend_with_API_data.route,
    "config/config.js": "// write your configuration code here",
  };

  folders.forEach((folder) => {
    const folderPath = path.join(serverPath, folder);
    fs.mkdirSync(folderPath, { recursive: true });
  });

  for (const [file, content] of Object.entries(files)) {
    const filePath = path.join(serverPath, file);
    fs.writeFileSync(filePath, content.trimStart());
  }

  fs.writeFileSync(
    path.join(serverPath, "README.md"),
    `# Server\n\nNode.js + Express + MongoDB API backend.\n`
  );

  await setupNpm(serverPath, {
    start: "node index.js",
    dev: "nodemon index.js",
  });

  await installDependencies(
    serverPath,
    ["express", "cors", "dotenv", "mongoose"],
    ["nodemon"]
  );

  // ------------------ LOGS ------------------
  log.success(`\n🎉 MERN Stack Project Setup Complete!\n`);

  log.info(`📁 Project structure:`);
  console.log(`
${projectName}/
├── client/   → React (Vite)
└── server/   → Express + MongoDB API
`);

  log.info(`📦 Installed & configured:`);
  console.log(`
✔️  React + Vite (with optional Tailwind)
✔️  Express + Mongoose REST API
✔️  Nodemon + dotenv + CORS
`);

  log.info(`🚀 To get started:\n`);
  console.log(
    `  cd ${projectName}/client     # frontend\n  npm run dev\n\n  cd ../server              # backend\n  npm run dev\n`
  );
}
