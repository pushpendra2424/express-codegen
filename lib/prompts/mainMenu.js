import inquirer from "inquirer";
import chalk from "chalk";
import { promptForModel } from "./model.js";
import { promptForController } from "./controller.js";
import { promptForRoutes } from "./route.js";
import { showHelp } from "../../commands/help.js";
import { createExpressApp } from "./app.js";

export function showMainMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: chalk.green("What would you like to do?\n"),
        choices: [
          "Default App",
          "Model",
          "Controller",
          "Routes",
          "Help",
          "Exit",
        ],
      },
    ])
    .then(({ action }) => {
      switch (action) {
        case "Default App":
          createExpressApp();
          break;
        case "Model":
          promptForModel();
          break;
        case "Controller":
          promptForController();
          break;
        case "Routes":
          promptForRoutes();
          break;
        case "Help":
          showHelp();
          break;
        case "Exit":
        default:
          process.exit(0);
      }
    });
}
