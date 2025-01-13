// import chalk from "chalk";
// import { generateController } from "../controller.js";
// import { generateRoutes } from "../route.js";
// import { checkIfFileExists } from "../utils.js";
// import inquirer from "inquirer";
// import { generateModel } from "../model.js";

// // Function to create a model
// export function promptForModel() {
//   inquirer
//     .prompt([
//       {
//         type: "input",
//         name: "modelName",
//         message: chalk.green("Enter the model name:"),
//         validate: (input) => (input?.trim() ? true : "Model name is required."),
//       },
//     ])
//     .then(({ modelName }) => {
//       if (checkIfFileExists(modelName, "models")) {
//         console.log(
//           chalk.yellowBright(
//             `The model "${modelName}" already exists. Please try another name.`
//           )
//         );
//         promptForModel(); // Retry with a new name
//       } else {
//         promptForModelFields(modelName);
//       }
//     });
// }

// export function promptForModelFields(modelName) {
//   console.log(
//     chalk.bold.blue("\nNOTE => ") +
//       chalk.blue(
//         "If you don't need to add another property, when asked 'Would you like to add another field?', simply press 'n' to finish. Next, you'll be asked, 'Would you like to generate a controller and route as well?' If you press 'y', both the controller and route will be created. If you press 'n', the process will be terminated.\n"
//       )
//   );
//   console.log(chalk.yellowBright(`Define schema fields for "${modelName}".`));

//   const fields = [];

//   const askField = () => {
//     inquirer
//       .prompt([
//         {
//           type: "input",
//           name: "fieldName",
//           message: chalk.green("Enter field name:"),
//           validate: (input) => {
//             if (input.trim() === "") {
//               return "Field name is required.";
//             }
//             if (fields.some((field) => field.name === input.trim())) {
//               return "Field name must be unique.";
//             }
//             return true;
//           },
//         },
//         {
//           type: "list",
//           name: "fieldType",
//           message: chalk.green("Select the field type:"),
//           choices: [
//             "String",
//             "Number",
//             "Date",
//             "Boolean",
//             "Object",
//             "Array",
//             "mongoose.Schema.Types.ObjectId",
//           ],
//         },
//         {
//           type: "confirm",
//           name: "isRequired",
//           message: chalk.green("Is this field required?"),
//         },
//         {
//           type: "confirm",
//           name: "isTrim",
//           message: chalk.green("Should this field be trimmed?"),
//           when: (answers) => answers.fieldType === "String",
//         },
//         {
//           type: "input",
//           name: "defaultValue",
//           message: chalk.green("Enter a default value for this field:"),
//           when: (answers) => !answers.isRequired,
//         },
//         {
//           type: "input",
//           name: "ref",
//           message: chalk.green(
//             "Enter reference model name (only for ObjectId fields):"
//           ),
//           when: (answers) =>
//             answers.fieldType === "mongoose.Schema.Types.ObjectId",
//         },
//         {
//           type: "confirm",
//           name: "addAnotherField",
//           message: chalk.green("Would you like to add another field?"),
//         },
//       ])
//       .then(async (answers) => {
//         // Add field
//         fields.push({
//           name: answers.fieldName,
//           type: answers.fieldType,
//           required: answers.isRequired,
//           default: answers.defaultValue || null,
//           ref: answers.ref || null,
//           trim: answers.isTrim || false,
//         });

//         // Check if the user wants to finish adding fields
//         if (!answers.addAnotherField) {
//           // Generate the model and move on to controller and routes
//           await generateModel(modelName, fields);
//           setTimeout(() => {
//             promptForControllerAndRoutes(modelName);
//           }, 0);
//         } else {
//           // ask for more
//           askField();
//         }
//       });
//   };

//   askField();
// }

// // Prompt the user if they want to generate both the controller and routes
// const promptForControllerAndRoutes = (modelName) => {
//   inquirer
//     .prompt([
//       {
//         type: "confirm",
//         name: "generateBoth",
//         message:
//           "Do you want to generate both the controller and routes for this model?",
//         default: true,
//       },
//     ])
//     .then((answers) => {
//       if (answers.generateBoth) {
//         generateController(modelName); // Generate controller
//         generateRoutes(modelName); // Generate routes
//       } else {
//         console.log(
//           chalk.green(
//             "You can generate the controller and routes separately later."
//           )
//         );
//       }
//     });
// };

import chalk from "chalk";
import { generateController } from "../controller.js";
import { generateRoutes } from "../route.js";
import { checkIfFileExists } from "../utils.js";
import inquirer from "inquirer";
import { generateModel } from "../model.js";

// Function to create a model
export function promptForModel() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "modelName",
        message: chalk.green("Enter the model name (letters only):"),
        filter: (input) => input.trim(), // Trim input first
        validate: (input) => {
          if (!input) return "Model name is required.";
          if (!/^[a-zA-Z]+$/.test(input))
            return "Only letters (a-z, A-Z) are allowed.";
          return true;
        },
      },
    ])
    .then(({ modelName }) => {
      if (checkIfFileExists(modelName, "models")) {
        console.log(
          chalk.yellowBright(
            `The model "${modelName}" already exists. Please try another name.`
          )
        );
        return promptForModel(); // Retry
      }

      promptForModelFields(modelName);
    });
}

export function promptForModelFields(modelName) {
  console.log(
    chalk.bold.blue("\nNOTE => ") +
      chalk.blue(
        "If you don't need to add another property, when asked 'Would you like to add another field?', simply press 'n' to finish. Next, you'll be asked, 'Would you like to generate a controller and route as well?' If you press 'y', both the controller and route will be created. If you press 'n', the process will be terminated.\n"
      )
  );
  console.log(chalk.yellowBright(`Define schema fields for "${modelName}".`));

  const fields = [];

  const askField = () => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "fieldName",
          message: chalk.green("Enter field name (letters only):"),
          filter: (input) => input.trim(), // Trim input first
          validate: (input) => {
            if (!input) return "Field name is required.";
            if (!/^[a-zA-Z_]+$/.test(input))
              return "Only letters (a-z, A-Z) and underscores (_) are allowed.";
            if (fields.some((field) => field.name === input))
              return "Field name must be unique.";
            return true;
          },
        },
        {
          type: "list",
          name: "fieldType",
          message: chalk.green("Select the field type:"),
          choices: [
            "String",
            "Number",
            "Date",
            "Boolean",
            "Object",
            "Array",
            "mongoose.Schema.Types.ObjectId",
          ],
        },
        {
          type: "confirm",
          name: "isRequired",
          message: chalk.green("Is this field required?"),
        },
        {
          type: "confirm",
          name: "isTrim",
          message: chalk.green("Should this field be trimmed?"),
          when: (answers) => answers.fieldType === "String",
        },
        {
          type: "input",
          name: "defaultValue",
          message: chalk.green("Enter a default value for this field:"),
          when: (answers) => !answers.isRequired,
        },
        {
          type: "input",
          name: "ref",
          message: chalk.green(
            "Enter reference model name (only for ObjectId fields):"
          ),
          when: (answers) =>
            answers.fieldType === "mongoose.Schema.Types.ObjectId",
        },
        {
          type: "confirm",
          name: "addAnotherField",
          message: chalk.green("Would you like to add another field?"),
        },
      ])
      .then(async (answers) => {
        // Add field
        fields.push({
          name: answers.fieldName,
          type: answers.fieldType,
          required: answers.isRequired,
          default: answers.defaultValue || null,
          ref: answers.ref || null,
          trim: answers.isTrim || false,
        });

        // Check if the user wants to finish adding fields
        if (!answers.addAnotherField) {
          // Generate the model and move on to controller and routes
          await generateModel(modelName, fields);
          setTimeout(() => {
            promptForControllerAndRoutes(modelName);
          }, 0);
        } else {
          // ask for more
          askField();
        }
      });
  };

  askField();
}

// Prompt the user if they want to generate both the controller and routes
const promptForControllerAndRoutes = (modelName) => {
  inquirer
    .prompt([
      {
        type: "confirm",
        name: "generateBoth",
        message:
          "Do you want to generate both the controller and routes for this model?",
        default: true,
      },
    ])
    .then((answers) => {
      if (answers.generateBoth) {
        generateController(modelName); // Generate controller
        generateRoutes(modelName); // Generate routes
      } else {
        console.log(
          chalk.green(
            "You can generate the controller and routes separately later."
          )
        );
      }
    });
};
