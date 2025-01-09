// import chalk from "chalk";
// import { generateController } from "../controller.js";
// import { generateRoutes } from "../route.js";
// import { checkIfFileExists } from "../utils.js";
// import inquirer from "inquirer";

// // Prompt for controller creation
// export function promptForController() {
//   inquirer
//     .prompt([
//       {
//         type: "input",
//         name: "controllerName",
//         message: chalk.green("Enter the controller name:"),
//         validate: (input) =>
//           input?.trim() ? true : "Controller name is required.",
//       },
//     ])
//     .then(({ controllerName }) => {
//       if (checkIfFileExists(controllerName, "controllers")) {
//         console.log(
//           chalk.yellowBright(
//             `The controller "${controllerName}" already exists. Please try another name.`
//           )
//         );
//         return promptForController(); // Retry
//       }

//       generateController(controllerName);
//       generateRoutes(controllerName);
//     });
// }

import chalk from "chalk";
import { generateController } from "../controller.js";
import { generateRoutes } from "../route.js";
import { checkIfFileExists } from "../utils.js";
import inquirer from "inquirer";

// Prompt for controller creation
export function promptForController() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "controllerName",
        message: chalk.green("Enter the controller name (letters only):"),
        filter: (input) => input.trim(), // Trim input before validation
        validate: (input) => {
          if (!input) return "Controller name is required.";
          if (!/^[a-zA-Z]+$/.test(input))
            return "Only letters (a-z, A-Z) are allowed.";
          return true;
        },
      },
    ])
    .then(({ controllerName }) => {
      if (checkIfFileExists(controllerName, "controllers")) {
        console.log(
          chalk.yellowBright(
            `The controller "${controllerName}" already exists. Please try another name.`
          )
        );
        return promptForController(); // Retry
      }

      generateController(controllerName);
      generateRoutes(controllerName);
    });
}
