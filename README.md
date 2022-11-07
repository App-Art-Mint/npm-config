# config
Config files for the @sunderapps suite of npm libraries

## Overwrite settings in your package.json
### Defaults:
```json
"config": {
  "prefix": "sun",      // The library prefix of the project
  "library": "sun",     // The name of the library
  "port": "42069",      // The port to run the dev server on
  "index": "index",     // The name of the main bundle file
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
    "test": "test",       // Required for npm
    "src": "src",         // Required for npm
    "config": "config",   // Required for npm
    "imports": "imports",
    "scss": "scss",       // Required for npm
    "ts": "ts",           // Required for npm
    "dist": "dist",       // Required for npm
    "css": "css",
    "js": "js"
  }
}
```