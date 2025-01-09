import chalk from "chalk";

export function showHelp() {
  console.log(
    chalk.blue.bold(
      `
  Welcome to the express-codegen - Help
  =============================================
  Usage: express-codegen [command]

  Commands:
  ---------------------------------------------
  app            - Generate a new Express.js application
  model          - Generate a new Mongoose model
  controller     - Generate a new controller
  route          - Generate RESTful routes
  
  Options:
  ---------------------------------------------
  -v, --version      Show the CLI tool version
  -h, --help         Display this help message
  
  Example Usage:
  ---------------------------------------------
  express-codegen app          # Generate a new Express.js application
  express-codegen model        # Generate a new model
  express-codegen controller   # Generate a new controller
  express-codegen route        # Generate RESTful routes
  express-codegen -v           # Show version
  express-codegen --help       # Show help

  Exit the CLI tool anytime using Ctrl+C
  `
    )
  );
}
