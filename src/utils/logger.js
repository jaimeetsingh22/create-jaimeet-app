import chalk from "chalk";
import { createSpinner } from "nanospinner";

export const log = {
  success: (msg) => console.log(chalk.greenBright(`✅ ${msg}`)),
  error: (msg) => console.log(chalk.redBright(`❌ ${msg}`)),
  info: (msg) => console.log(chalk.blueBright(`ℹ️  ${msg}`)),
  warn: (msg) => console.log(chalk.yellowBright(`⚠️  ${msg}`)),
};

export const makeSpinner = (text = "Processing...") => {
  const spinner = createSpinner(text).start();
  return spinner;
};
