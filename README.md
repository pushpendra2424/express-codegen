# express-codegen

`express-codegen` is a CLI tool that helps generate default Express.js applications, controllers, routes, and models with predefined templates. This tool simplifies the development process by automatically creating the necessary files with boilerplate code.

## Installation

Install the package globally using npm:

```bash
npm install -g express-codegen
```

## Usage

Run the following command to generate different components:

```bash
express-codegen <command>
```

### Commands

- **`app`**: Generates a new Express.js application setup.
- **`controller`**: Generates a new controller file.
- **`route`**: Generates a new route file.
- **`model`**: Generates a new model file.
- **`--help`**: Displays the help menu with all available commands.
- **`-v`**: Shows the installed version of `express-codegen`.

## Examples

### Generate an Express Application

```bash
express-codegen app
```

This command creates a basic Express.js application setup with default files and folders.

### Generate a Controller

```bash
express-codegen controller UserController
```

This command creates a `UserController.js` file inside the `controllers` directory.

### Generate a Route

```bash
express-codegen route user
```

This command creates a `userRoutes.js` file inside the `routes` directory.

### Generate a Model

```bash
express-codegen model User
```

This command creates a `User.js` model file inside the `models` directory.

### Check the Installed Version

```bash
express-codegen -v
```

This command displays the installed version of `express-codegen`.

### Show Help

```bash
express-codegen --help
```

This command lists all available commands and their descriptions.

## File Structure

After using `express-codegen` to generate components, your project structure may look like this:

```
project-folder/
├── controllers/
│   ├── UserController.js
├── routes/
│   ├── userRoutes.js
├── models/
│   ├── User.js
├── app.js
```

## License

This project is licensed under the MIT License.