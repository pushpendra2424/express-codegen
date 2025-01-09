import { toCamelCase } from "./utils.js";
import fs from "fs";
import path from "path";
import chalk from "chalk";
import prettier from "prettier";

// Helper function to generate field definitions
function generateFieldDefinition(field) {
  let fieldDefinition = `type: ${field.type}`;

  // Handle nested fields
  if (field.nestedFields && field.nestedFields.length > 0) {
    const nestedFields = field.nestedFields
      .map(
        (nestedField) =>
          `${nestedField.name}: { ${generateFieldDefinition(nestedField)} }`
      )
      .join(",\n    ");
    fieldDefinition = `{ ${nestedFields} }`;
  }

  if (field.type === "mongoose.Schema.Types.ObjectId" && field.ref) {
    fieldDefinition += `, ref: '${field.ref}'`;
  }

  if (field.required) fieldDefinition += ", required: true";
  if (field.default !== null)
    fieldDefinition += `, default: ${JSON.stringify(field.default)}`;
  if (field.type === "String" && field.trim) fieldDefinition += ", trim: true";

  // Handle arrays
  if (field.isArray) {
    fieldDefinition = `[${fieldDefinition}]`;
  }

  return fieldDefinition;
}

// Generate a model file
export async function generateModel(name, fields) {
  try {
    const modelName = toCamelCase(name);
    const schemaName = `${modelName}Schema`;

    const schemaFields = fields
      .map((field) => `${field.name}: { ${generateFieldDefinition(field)} }`)
      .join(",\n  ");

    const modelTemplate = `const mongoose = require('mongoose');

    const ${schemaName} = new mongoose.Schema({
      ${schemaFields}
    });

    module.exports = mongoose.model('${modelName}', ${schemaName});
  `;

    const formattedModel = await prettier.format(modelTemplate.trim(), {
      parser: "babel",
    });

    // Define possible models directories
    const rootModelsDir = path.join(process.cwd(), "models");
    const srcModelsDir = path.join(process.cwd(), "src/models");

    let modelsDir = null;

    if (fs.existsSync(rootModelsDir)) {
      modelsDir = rootModelsDir;
    } else if (fs.existsSync(srcModelsDir)) {
      modelsDir = srcModelsDir;
    } else {
      console.log(
        chalk.redBright(
          "Models directory does not exist. Please create 'models' or 'src/models' directory first."
        )
      );
      process.exit(1); // Terminate process
    }

    const filePath = path.join(modelsDir, `${toCamelCase(name)}.js`);

    fs.writeFileSync(filePath, formattedModel);

    console.log(
      chalk.greenBright(
        `\n✔ Model "${modelName}" created successfully at ${filePath}`
      )
    );
  } catch (err) {
    console.error(chalk.redBright(`Error generating model: ${err.message}`));
  }
}
