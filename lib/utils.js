import fs from "fs";
import path from "path";

// Utility functions
export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export const toCamelCase = (str) => str.charAt(0).toLowerCase() + str.slice(1);

export function checkIfFileExists(fileName, folderName) {
  const filePath = path.join(
    process.cwd(),
    folderName,
    `${toCamelCase(fileName)}.js`
  );
  return fs.existsSync(filePath);
}

export function pluralize(str) {
  if (typeof str !== "string" || str.trim() === "") {
    throw new Error("Input must be a non-empty string.");
  }

  const lowerStr = str.trim().toLowerCase();

  // Handle already pluralized cases like 'routes'
  if (
    lowerStr.endsWith("s") &&
    !(
      lowerStr.endsWith("ss") ||
      lowerStr.endsWith("is") ||
      lowerStr.endsWith("us")
    )
  ) {
    return str; // Already plural, return as is
  }

  if (lowerStr.endsWith("y") && !/[aeiou]y$/i.test(lowerStr)) {
    return str.slice(0, -1) + "ies";
  } else if (lowerStr.endsWith("f") || lowerStr.endsWith("fe")) {
    return str.replace(/fe?$/, "ves");
  } else if (lowerStr.endsWith("o") && !/[aeiou]o$/i.test(lowerStr)) {
    return str + "es";
  } else if (lowerStr.endsWith("us")) {
    return str.slice(0, -2) + "i";
  } else if (lowerStr.endsWith("is")) {
    return str.slice(0, -2) + "es";
  } else if (lowerStr.endsWith("on")) {
    return str.slice(0, -2) + "a";
  } else if (
    lowerStr.endsWith("x") ||
    lowerStr.endsWith("ch") ||
    lowerStr.endsWith("sh") ||
    lowerStr.endsWith("ss")
  ) {
    return str + "es";
  }

  return str + "s";
}
