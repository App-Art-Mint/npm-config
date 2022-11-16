# @sunderapps/config
Config files for the @sunderapps suite of npm libraries

## Getting Started
### Install this project as a dev dependency and configure
```bash
npm i -D @sunderapps/config && ./node_modules/.bin/sunderapps-config
```

### Updating (minor/patch updates)
```bash
npm run update
```

### Upgrading (major updates)
```bash
npm run upgrade
```

## Full Setup
### Install dependencies (macOS)
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
```bash
brew install git gh node
```

### Log in to GitHub CLI
```bash
gh auth login
```

### Change to your code directory
```bash
cd [path/to/code]
```

### Create and enter a project directory
```bash
mkdir [project] && cd [project]
```

### Create a GitHub repo (still need to make template and test this)
```bash
gh repo create [project] -c -d '[description]' -p Sunder-Apps/template --public
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

#### Preparing
To build all of your source files, run:
```bash
npm run prepare
```
This will run automatically after dependencies are installed (`npm i`) and before the package is distributed (`npm version [args]`).

#### Versioning
To update the version of the package, commit changes to git, and publish the changes to npm with one command, run:
```bash
npm version [major|minor|patch] --force -m "%s - [commit message]"
```

## Configuration (edit your package.json to change these)
### Defaults:
```json
"config": {
  "prefix": "sun",        // The library prefix of the project
  "library": "sun",       // The name of the library
  "port": "42069",        // The port to run the dev server on
  "index": "index",       // The name of the main bundle file
  "webpack": "...",       // DO NOT EDIT
  "dirs": {
    "doc": "docs",        // Required for npm scripts
    "test": "test",
    "src": "src",         // Required for npm scripts
    "config": "config",
    "imports": "imports",
    "scss": "scss",       // Required for npm scripts
    "ts": "ts",
    "dist": "dist",       // Required for npm scripts
    "css": "css",
    "js": "js"
  },
  "exts": {               // File extensions
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