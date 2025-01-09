import fs from "fs";
import path from "path";
import prettier from "prettier";
import { toCamelCase, pluralize } from "./utils.js";
import chalk from "chalk";

// Generate route file
export async function generateRoutes(name) {
  const toCamelCaseRouteName = toCamelCase(name);
  const routeName = pluralize(name).toLowerCase();
  const routeTemplate = `
const express = require('express');
const router = express.Router();
const ${toCamelCaseRouteName}Controller = require('../controllers/${toCamelCaseRouteName}');

// Routes
router.post('/', ${toCamelCaseRouteName}Controller.create);
router.get('/', ${toCamelCaseRouteName}Controller.getAll);
router.get('/:id', ${toCamelCaseRouteName}Controller.getById);
router.patch('/:id', ${toCamelCaseRouteName}Controller.updateById);
router.delete('/:id', ${toCamelCaseRouteName}Controller.deleteById);

module.exports = router;
`;

  const formattedRoutes = await prettier.format(routeTemplate.trim(), {
    parser: "babel",
  });

  // Define possible routes directories
  const rootRoutesDir = path.join(process.cwd(), "routes");
  const srcRoutesDir = path.join(process.cwd(), "src/routes");

  let routesDir = null;

  if (fs.existsSync(rootRoutesDir)) {
    routesDir = rootRoutesDir;
  } else if (fs.existsSync(srcRoutesDir)) {
    routesDir = srcRoutesDir;
  } else {
    console.log(
      chalk.redBright(
        "Routes directory does not exist. Please create 'routes' or 'src/routes' directory first."
      )
    );
    process.exit(1);
  }

  const filePath = path.join(routesDir, `${toCamelCase(name)}.js`);

  // Write the route file
  fs.writeFileSync(filePath, formattedRoutes);

  console.log(
    chalk.greenBright(
      `✔ Routes file "${toCamelCaseRouteName}.js" has been created successfully at ${filePath}.`
    )
  );

  // Update index.js to import the new route
  const indexFilePath = path.join(routesDir, "index.js");

  let indexFileContent = "";
  if (fs.existsSync(indexFilePath)) {
    indexFileContent = fs.readFileSync(indexFilePath, "utf-8");

    // Check if the route is already imported to avoid duplication
    if (!indexFileContent.includes(toCamelCaseRouteName)) {
      const importStatement = `router.use("/${routeName}", require("./${toCamelCaseRouteName}"));\n`;
      indexFileContent = indexFileContent.replace(
        /module\.exports = router;/,
        `${importStatement}\nmodule.exports = router;\n`
      );
    }
  } else {
    console.log(
      chalk.redBright("index.js not found in the routes directory.")
    );
    return;
  }

  // Write the updated content back to index.js
  fs.writeFileSync(indexFilePath, indexFileContent, "utf-8");

  console.log(
    chalk.greenBright(
      `✔ Successfully imported the new route in index.js.`
    )
  );
}
