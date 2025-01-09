import chalk from "chalk";
import { generateRoutes } from "../route.js";
import { checkIfFileExists } from "../utils.js";
import inquirer from "inquirer";

// Prompt for route creation
export function promptForRoutes() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "routeName",
        message: chalk.green("Enter the route name:"),
        validate: (input) => (input?.trim() ? true : "Route name is required."),
      },
    ])
    .then(({ routeName }) => {
      if (checkIfFileExists(routeName, "routes")) {
        console.log(
          chalk.yellowBright(
            `The route "${routeName}" already exists. Please try another name.`
          )
        );
        return promptForRoutes(); // Retry
      }

      generateRoutes(routeName);
    });
}
