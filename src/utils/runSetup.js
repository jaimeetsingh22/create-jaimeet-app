import { askUIFeatures } from "../prompts/projectType.js";
import { autoInstallDeps } from "./npmInstall.js";
import { setupRedux } from "./setupRedux.js";
import { setupRouter } from "./setupRouter.js";
import { setupRouterRedux } from "./setupRouterRedux.js";
import { setupTailwind } from "./setupTailwind.js";
import { setupTailwindRedux } from "./setupTailwindRedux.js";
import { setupTailwindRouter } from "./setupTailwindRouter.js";
import { setupTailwindRouterRedux } from "./setupTailwindRouterRedux.js";

export async function runSetup(projectPath, features, isTS) {
  const { tailwind, router, redux } = features;

  switch (true) {
    case tailwind && router && redux:
      await setupTailwindRouterRedux(projectPath, isTS);
      break;
    case tailwind && router:
      await setupTailwindRouter(projectPath, isTS);
      break;
    case router && redux:
      await setupRouterRedux(projectPath, isTS);
      break;
    case tailwind && redux:
      await setupTailwindRedux(projectPath, isTS);
      break;
    case tailwind:
      await setupTailwind(projectPath, isTS);
      break;
    case router:
      await setupRouter(projectPath, isTS);
      break;
    case redux:
      await setupRedux(projectPath, isTS);
      break;
    default:
      await autoInstallDeps(projectPath);
      break;
  }
}
