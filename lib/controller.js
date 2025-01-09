import fs from "fs";
import path from "path";
import prettier from "prettier";
import { capitalize, toCamelCase } from "./utils.js";
import chalk from "chalk";

// Generate Controller file
export async function generateController(name) {
  try {
    const capitalizeControllerName = capitalize(name);
    const toCamelCaseControllerName = toCamelCase(name);
    const controllerTemplate = `
        const ${capitalizeControllerName} = require('../models/${toCamelCaseControllerName}');
        
        exports.create = async (req, res) => {
            try {
                const ${toCamelCaseControllerName} = await ${capitalizeControllerName}.create(req.body);
                res.status(201).json({ data: ${toCamelCaseControllerName} });
            } catch (err) {
                res.status(400).json({ error: err.message });
            }
        };
        
        exports.getAll = async (req, res) => {
            try {
                const { page = 1, limit = 10 } = req.query;
                const [totalRecords, data] = await Promise.all([
                    ${capitalizeControllerName}.countDocuments(),
                    ${capitalizeControllerName}.find().skip((+page - 1) * limit).limit(+limit),
                ]);
                
                return res.status(200).json({ totalRecords, data });
            } catch (err) {
                res.status(400).json({ error: err.message });
            }
        };
        
        exports.getById = async (req, res) => {
            try {
                const ${toCamelCaseControllerName} = await ${capitalizeControllerName}.findById(req.params.id);
                if (!${toCamelCaseControllerName}) 
                    return res.status(404).json({ message: '${capitalizeControllerName} not found' });
                
                return res.status(200).json(${toCamelCaseControllerName});
            } catch (err) {
                res.status(400).json({ error: err.message });
            }
        };
        
        exports.updateById = async (req, res) => {
            try {
                const ${toCamelCaseControllerName} = await ${capitalizeControllerName}.findByIdAndUpdate(req.params.id, req.body, { new: true });
                if (!${toCamelCaseControllerName}) 
                    return res.status(404).json({ message: '${capitalizeControllerName} not found' });
                
                return res.status(200).json({ message: "Updated successfully", data: ${toCamelCaseControllerName} });
            } catch (err) {
                res.status(400).json({ error: err.message });
            }
        };
        
        exports.deleteById = async (req, res) => {
            try {
                const ${toCamelCaseControllerName} = await ${capitalizeControllerName}.findByIdAndDelete(req.params.id);
                if (!${toCamelCaseControllerName}) 
                    return res.status(404).json({ message: '${capitalizeControllerName} not found' });
                
                return res.status(204).json({ message: '${capitalizeControllerName} deleted successfully' });
            } catch (err) {
                res.status(400).json({ error: err.message });
            }
        };
    `;

    const formattedController = await prettier.format(
      controllerTemplate.trim(),
      {
        parser: "babel",
      }
    );

    // Define possible controllers directories
    const rootControllersDir = path.join(process.cwd(), "controllers");
    const srcControllersDir = path.join(process.cwd(), "src/controllers");

    let controllersDir = null;

    if (fs.existsSync(rootControllersDir)) {
      controllersDir = rootControllersDir;
    } else if (fs.existsSync(srcControllersDir)) {
      controllersDir = srcControllersDir;
    } else {
      console.log(
        chalk.redBright(
          "Controllers directory does not exist. Please create 'controllers' or 'src/controllers' directory first."
        )
      );
      process.exit(1); // Terminate process
    }

    const filePath = path.join(controllersDir, `${toCamelCase(name)}.js`);

    fs.writeFileSync(filePath, formattedController);

    console.log(
      chalk.greenBright(
        `✔ Controller file "${toCamelCaseControllerName}.js" has been created successfully at ${filePath}.`
      )
    );
  } catch (error) {
    console.error(
      chalk.redBright(`Error generating controller: ${error.message}`)
    );
  }
}
