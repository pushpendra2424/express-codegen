#!/usr/bin/env node

import chalk from "chalk";
import { displayWelcomeMessage } from "../lib/asciiArt.js";
import { showMainMenu } from "../lib/prompts/mainMenu.js";
import { createRequire } from "module";
import { promptForModel } from "../lib/prompts/model.js";
import { promptForController } from "../lib/prompts/controller.js";
import { promptForRoutes } from "../lib/prompts/route.js";
import { showHelp } from "../commands/help.js";
import { createExpressApp } from "../lib/prompts/app.js";
const require = createRequire(import.meta.url);
const packageJson = require("../package.json");

process.on("SIGINT", () => {
  console.log(chalk.yellowBright("\nProcess interrupted. Exiting..."));
  process.exit(0);
});

process.on("exit", () => {
  process.exit(0);
});

// Get CLI arguments
const args = process.argv.slice(2);

if (args.includes("-v") || args.includes("--version")) {
  console.log(chalk.green(`express-codegen Version: ${packageJson.version}`));
  process.exit(0);
} else if (args.includes("-h") || args.includes("--help")) {
  showHelp();
  process.exit(0);
} else if (args.includes("model")) {
  promptForModel();
} else if (args.includes("controller")) {
  promptForController();
} else if (args.includes("route")) {
  promptForRoutes();
} else if (args.includes("app")) {
  createExpressApp();
  process.exit(0);
} else if (args.length > 0) {
  console.log(chalk.redBright(`\nError: Unknown command "${args.join(" ")}"`));
  console.log(
    chalk.yellow("Use 'express-codegen --help' to see available commands.\n")
  );
  process.exit(1);
} else {
  displayWelcomeMessage();
  showMainMenu();
}
