import inquirer from "inquirer";
import fs from "fs-extra";
import path from "path";
import { execSync } from "child_process";
import chalk from "chalk";

process.on("exit", () => {
  process.exit(0);
});

const PROJECT_ROOT = process.cwd();
const DEFAULT_PROJECT_NAME = path.basename(PROJECT_ROOT); // Get current directory name

export async function createExpressApp() {
  console.log(chalk.blueBright("\nWelcome to Express code Generator!\n"));

  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "appName",
      message: chalk.yellow("Enter the project name:"),
      default: DEFAULT_PROJECT_NAME, // Use current directory name as default
    },
    {
      type: "input",
      name: "description",
      message: chalk.yellow("Enter project description:"),
      default: "",
    },
    {
      type: "confirm",
      name: "useSrc",
      message: chalk.yellow(
        "Do you want to place controllers, models, routes, and config inside 'src/'?"
      ),
      default: true,
    },
  ]);

  const appDir =
    answers.appName === DEFAULT_PROJECT_NAME
      ? PROJECT_ROOT
      : path.join(PROJECT_ROOT, answers.appName);

  // Check if the directory already exists if user provided a project name
  if (answers.appName !== DEFAULT_PROJECT_NAME && fs.existsSync(appDir)) {
    console.log(chalk.red(`Directory "${answers.appName}" already exists.`));
    return;
  }

  console.log(chalk.green("\nCreating project structure..."));
  // Ensure the directory is created only if the app name is provided and it's not the current directory
  if (answers.appName !== DEFAULT_PROJECT_NAME) {
    fs.ensureDirSync(appDir);
  }

  execSync("npm init -y", { cwd: appDir });

  console.log(chalk.green("Setting up folder structure..."));
  const basePath = answers.useSrc ? path.join(appDir, "src") : appDir;

  fs.ensureDirSync(path.join(appDir, "public"));
  fs.ensureDirSync(path.join(basePath, "config"));
  fs.ensureDirSync(path.join(basePath, "controllers"));
  fs.ensureDirSync(path.join(basePath, "models"));
  fs.ensureDirSync(path.join(basePath, "routes"));
  fs.ensureDirSync(path.join(basePath, "middleware"));
  fs.ensureDirSync(path.join(basePath, "utils"));

  console.log(chalk.green("Creating necessary files..."));

  // Server file
  fs.writeFileSync(
    path.join(basePath, "server.js"),
    `require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors("*"));

app.use("/api", require("./routes/index"));

const PORT = process.env.PORT || 3000;

if (process.env.MONGO_URI) {
  connectDB();
}

app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));
`
  );

  // Routes
  fs.writeFileSync(
    path.join(basePath, "routes", "index.js"),
    `const express = require("express");
const router = express.Router();
router.use("/ping", require("./ping"));
module.exports = router;
`
  );

  fs.writeFileSync(
    path.join(basePath, "routes", "ping.js"),
    `const express = require("express");
const router = express.Router();
const pingController = require("../controllers/ping");

router.get("/", pingController.ping);

module.exports = router;
`
  );

  // Controllers
  fs.writeFileSync(
    path.join(basePath, "controllers", "ping.js"),
    `exports.ping = (req, res) => {
   return res.status(200).json({
    greeting: 'Hello from Express',
    date: new Date(),
    url: req.originalUrl,
    headers: Object.assign({}, req.headers),
  });
};
`
  );

  // Database Config
  fs.writeFileSync(
    path.join(basePath, "config", "db.js"),
    `const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected successfully...");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
  }
};
module.exports = connectDB;
`
  );

  const envData = `PORT=3000
MONGO_URI=mongodb://localhost:27017/${answers.appName}
`;
  // Environment Files
  fs.writeFileSync(path.join(appDir, ".env"), envData);
  fs.writeFileSync(
    path.join(appDir, ".env.sample"),
    `# Environment Variables Sample\n${envData}`
  );

  // Gitignore
  fs.writeFileSync(path.join(appDir, ".gitignore"), `node_modules/\n.env\n`);

  // Package.json
  fs.writeFileSync(
    path.join(appDir, "package.json"),
    JSON.stringify(
      {
        name: answers.appName,
        version: "1.0.0",
        description: answers.description,
        main: `${answers.useSrc ? "src/" : ""}server.js`,
        scripts: {
          start: `node ${answers.useSrc ? "src/" : ""}server.js`,
          dev: `nodemon ${answers.useSrc ? "src/" : ""}server.js`,
        },
      },
      null,
      2
    )
  );

  console.log(chalk.cyan("\nInstalling dependencies..."));
  execSync("npm install express dotenv cors mongoose", {
    cwd: appDir,
    stdio: "inherit",
  });

  console.log(chalk.cyan("Installing development dependencies..."));
  execSync("npm install --save-dev nodemon", { cwd: appDir, stdio: "inherit" });

  console.log(
    chalk.greenBright(
      `\nExpress app "${answers.appName}" generated successfully! 🎉\n`
    )
  );

  if (answers.appName !== DEFAULT_PROJECT_NAME) {
    console.log(chalk.yellow(`Change directory: cd ${answers.appName}`));
  }

  console.log(chalk.yellow("Start development server: npm run dev"));
}
