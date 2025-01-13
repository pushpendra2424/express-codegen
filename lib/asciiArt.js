import chalk from "chalk";

// const welcomeExpressCodeGen = [
//   " __        __   _                            _   _____                                  _        ____          _",
//   " \\ \\      / /__| | ___ ___  _ __ ___   ___  ( ) | ____|_  ___ __  _ __ ___  ___ ___    | |___   / ___|___   __| | ___  __ _  ___ _ __",
//   "  \\ \\ /\\ / / _ \\ |/ __/ _ \\| '_ ` _ \\ / _ \\ |/  |  _| \\ \\/ / '_ \\| '__/ _ \\/ __/ __|_  | / __| | |   / _ \\ / _` |/ _ \\/ _` |/ _ \\ '_ \\",
//   "   \\ V  V /  __/ | (_| (_) | | | | | |  __/     | |___ >  <| |_) | | |  __/\\__ \\__ \\ |_| \\__ \\ | |__| (_) | (_| |  __/ (_| |  __/ | | |",
//   "    \\_/\\_/ \\___|_|\\___\\___/|_| |_| |_|\\___|     |_____/_/\\_\\ .__/|_|  \\___||___/___/\\___/|___/  \\____\\___/ \\__,_|\\___|\\__, |\\___|_| |_|",
//   "                                                           |_|                                                        |___/"
// ];

// const expressCodegen =  [
//   "  _____                                  _        ____          _",
//   " | ____|_  ___ __  _ __ ___  ___ ___    | |___   / ___|___   __| | ___  __ _  ___ _ __",
//   " |  _| \\ \\/ / '_ \\| '__/ _ \\/ __/ __|_  | / __| | |   / _ \\ / _` |/ _ \\/ _` |/ _ \\ '_ \\",
//   " | |___ >  <| |_) | | |  __/\\__ \\__ \\ |_| \\__ \\ | |__| (_) | (_| |  __/ (_| |  __/ | | |",
//   " |_____/_/\\_\\ .__/|_|  \\___||___/___/\\___/|___/  \\____\\___/ \\__,_|\\___|\\__, |\\___|_| |_|",
//   "            |_|                                                        |___/"
// ];

//  const express = [
//   "  _____                               ",
//   " | ____|_  ___ __  _ __ ___  ___ ___ (_)___",
//   " |  _| \\ \\/ / '_ \\| '__/ _ \\/ __/ __|| / __|",
//   " | |___ >  <| |_) | | |  __/\\__ \\__ \\| \\__ \\",
//   " |_____/_/\\_\\ .__/|_|  \\___||___/___// |___/",
//   "            |_|                    |__/"
// ];

const welcomeExpressCodeGen = [
  " __        __   _                            _   _____                                 ____          _                         _ ",
  " \\ \\      / /__| | ___ ___  _ __ ___   ___  ( ) | ____|_  ___ __  _ __ ___  ___ ___   / ___|___   __| | ___  __ _  ___ _ __   ( )",
  "  \\ \\ /\\ / / _ \\ |/ __/ _ \\| '_ ` _ \\ / _ \\ |/  |  _| \\ \\/ / '_ \\| '__/ _ \\/ __/ __| | |   / _ \\ / _` |/ _ \\/ _` |/ _ \\ '_ \\  |/",
  "   \\ V  V /  __/ | (_| (_) | | | | | |  __/     | |___ >  <| |_) | | |  __/\\__ \\__ \\ | |__| (_) | (_| |  __/ (_| |  __/ | | |",
  "    \\_/\\_/ \\___|_|\\___\\___/|_| |_| |_|\\___|     |_____/_/\\_\\ .__/|_|  \\___||___/___/  \\____\\___/ \\__,_|\\___|\\__, |___|_| |_|",
  "                                                           |_|                                              |___/",
];

const expressCodegen = [
  " _____                                 ____          _",
  "| ____|_  ___ __  _ __ ___  ___ ___   / ___|___   __| | ___  __ _  ___ _ __    ",
  "|  _| \\ \\/ / '_ \\| '__/ _ \\/ __/ __| | |   / _ \\ / _` |/ _ \\/ _` |/ _ \\ '_ \\   ",
  "| |___ >  <| |_) | | |  __/\\__ \\__ \\ | |__| (_) | (_| |  __/ (_| |  __/ | | |  ",
  "|_____/_/\\_\\ .__/|_|  \\___||___/___/  \\____\\___/ \\__,_|\\___|\\__, |___|_| |_|  ",
  "            |_|                                              |___/",
];

const express = [
  "  _____",
  " | ____|_  ___ __  _ __ ___  ___ ___",
  " |  _| \\ \\/ / '_ \\| '__/ _ \\/ __/ __|",
  " | |___ >  <| |_) | | |  __/\\__ \\__ \\",
  " |_____/_/\\_\\ .__/|_|  \\___||___/___/",
  "            |_|",
];

const codegen = [
  "                _",
  "   ___ ___   __| | ___  __ _  ___ _ __",
  "  / __/ _ \\ / _` |/ _ \\/ _` |/ _ \\ '_ \\",
  " | (_| (_) | (_| |  __/ (_| |  __/ | | |",
  "  \\___\\___/ \\__,_|\\___|\\__, |\\___|_| |_|",
  "                       |___/",
];

// Display an interactive welcome message
export function displayWelcomeMessage() {
  const terminalWidth = process.stdout.columns || 80;

  if (terminalWidth > 130) {
    console.log(
      welcomeExpressCodeGen.map((line) => chalk.magentaBright(line)).join("\n")
    );
  } else if (terminalWidth < 80) {
    console.log(express.map((line) => chalk.magentaBright(line)).join("\n"));
    console.log(codegen.map((line) => chalk.magentaBright(line)).join("\n"));
  } else {
    console.log(
      expressCodegen.map((line) => chalk.magentaBright(line)).join("\n")
    );
  }
  console.log(
    chalk.cyanBright.bold("Build Express apps effortlessly with CLI tool!")
  );
}

// import chalk from 'chalk';
// import figlet from 'figlet';

// // Function to display an interactive welcome message
// export function displayWelcomeMessage() {
//   const updateBanner = () => {
//     const terminalWidth = process.stdout.columns || 80;
//     console.log('terminalWidth: ', terminalWidth);

//     // Generate banners using the "small" font
//     const welcomeExpressCodeGen = figlet.textSync("Welcome ' ExpressJs Codegen", {
//       horizontalLayout: 'default',
//       verticalLayout: 'default',
//     });

//     const horizontalLayout = figlet.textSync('ExpressJs Codegen', {
//       horizontalLayout: 'default',
//       verticalLayout: 'default',
//     });

//     const welcomeBanner = figlet.textSync('Welcome', {
//       horizontalLayout: 'default',
//       verticalLayout: 'default',
//     });

//     const expressBanner = figlet.textSync('Expressjs', {
//       horizontalLayout: 'default',
//       verticalLayout: 'default',
//     });

//     const codegenBanner = figlet.textSync('codegen', {
//       horizontalLayout: 'default',
//       verticalLayout: 'default',
//     });

//     // Display banners based on terminal width
//     if (terminalWidth > 130) {
//       console.log(chalk.magentaBright(welcomeExpressCodeGen));
//     } else if (terminalWidth < 80) {
//       console.log(chalk.magentaBright(welcomeBanner));
//       console.log(chalk.magentaBright(expressBanner));
//       console.log(chalk.magentaBright(codegenBanner));
//     } else {
//       console.log(chalk.magentaBright(welcomeBanner));
//       console.log(chalk.magentaBright(horizontalLayout));
//     }

//     console.log(
//       chalk.cyanBright.bold('Build Express apps effortlessly with CLI tool!\n')
//     );
//   };

//   // Initial display
//   updateBanner();

//   // Update on terminal resize
//   process.stdout.on('resize', updateBanner);
// }
