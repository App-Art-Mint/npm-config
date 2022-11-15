# @sunderapps/config
Config files for the @sunderapps suite of npm libraries

## Getting Started
### Install / update this project globallly
```bash
npm i -g @sunderapps/config
```
```bash
npm up -g @sunderapps/config && sun-config
```
or
```bash
npm run update
```

### Configuring From Scratch
#### Install dependencies (macOS)
```bash
brew install git gh node
```

#### Create a repo on GitHub

#### Change to your code directory
```bash
cd path/to/code
```

#### Clone the repo into its own folder
```bash
gh repo clone [user]/[repo]
```

#### Initialize npm and follow the prompts
```bash
npm init
```

#### Update your configuration and follow the prompts
##### This command requires global installation (see above)
```bash
sunderapps-config
```

### Configuring an existing project
#### Change to your project directory
```bash
cd path/to/code/[project]
```

#### Update your configuration and follow the prompts
##### This command requires global installation (see above)
```bash
sunderapps-config
```

## Usage
Use the provided npm scripts to manage your project.
Check your updated package.json for more scripts you can run.

### Development
#### Serving
To automatically recompile your dev source files when one is changed and host it on the configured port (default is 42069), run:
```bash
npm run serve
```

#### Watching
To automatically recompile your dev source files when one is changed, run:
```bash
npm run watch
```

#### Testing
To run tests on your source files, run:
```bash
npm run test
```

### Management
#### Cleaning
To remove all build files, run:
```bash
npm run clean
```

#### Packaging
To build all of your source files, run:
```bash
npm run package
```
This will run automatically after dependencies are installed (`npm i`) and before the package is distributed (`npm version [args]`).

#### Versioning
To update the version of the package, commit changes to git, and publish the changes to npm with one command, run:
```bash
npm version [major|minor|patch] --force -m "%s - [commit message]"
```

### Updating
#### To update the configuration, run:
```bash
npm run update
```

## Configuration (edit your package.json to change these)
### Defaults:
```json
"config": {
  "prefix": "sun",      // The library prefix of the project
  "library": "sun",     // The name of the library
  "port": "42069",      // The port to run the dev server on
  "index": "index",     // The name of the main bundle file
  "webpack": "...",     // DO NOT EDIT
  "exts": {             // File extensions
    "html": ".html",
    "scss": ".scss",
    "ts": ".ts",
    "css": ".css",
    "js": ".js",
    "dts": ".d.ts",
    "map": ".map",
    "chunk": ".chunk"
  }
},
```

## Overwrite directory locations in your package.json
### Some of these are required for the npm scripts to function
```json
"config": {
  "dirs": {
    "doc": "docs",        // Required for npm
    "test": "test",
    "src": "src",         // Required for npm
    "config": "config",
    "imports": "imports",
    "scss": "scss",       // Required for npm
    "ts": "ts",
    "dist": "dist",       // Required for npm
    "css": "css",
    "js": "js"
  }
}
```