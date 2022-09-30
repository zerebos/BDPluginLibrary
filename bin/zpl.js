#!/usr/bin/env node
/* eslint-disable no-console */
// const path = require("path");
// console.log(path.dirname(process.env.npm_package_json));


const path = require("path");
const fs = require("fs");
const buildMeta = require("../lib/meta");
const bundle = require("../lib/bundle");
const projectRoot = path.dirname(process.env.npm_package_json);

// Parse arguments
const subcommands = ["init", "build"];
const args = process.argv.slice(2);
if (args.length != 2) {
    console.error(`Please provide exactly one subcommand and one plugin name. Something like: zpl build MyPlugin`);
    process.exit(1);
}
const subcommand = args[0].toLowerCase();
const pluginName = args[1];
if (!subcommands.includes(subcommand)) {
    console.error(`Command ${subcommand} not recognized. Available commands: ${subcommands.join(", ")}`);
    process.exit(2);
}


// Check for zpl specific config file
const zplrcExists = fs.existsSync(path.join(projectRoot, ".zplrc"));
const zplrcjsExists = fs.existsSync(path.join(projectRoot, ".zplrc.js"));
const zplpkgConfig = require(process.env.npm_package_json).zplConfig;

// Default ZPL config
const zplConfig = {
    base: ".",
    out: "dist",
    copyToBD: true,
    installScript: true
};

// Verify and load the config
if (zplpkgConfig) {
    Object.assign(zplConfig, zplpkgConfig);
    zplConfig._source = "package.json";
}
else if (zplrcExists) {
    try {
        const content = fs.readFileSync(path.join(projectRoot, ".zplrc")).toString();
        const newConfig = JSON.parse(content);
        Object.assign(zplConfig, newConfig);
        zplConfig._source = ".zplrc";
    }
    catch (error) {
        console.log(`Could not read or parse ${path.join(projectRoot, ".zplrc")}`);
    }
}
else if (zplrcjsExists) {
    try {
        const exported = require(path.join(projectRoot, ".zplrc.js"));
        if (typeof(exported) === "function") {
            const returned = exported();
            Object.assign(zplConfig, returned);
        }
        else {
            Object.assign(zplConfig, exported);
        }
        
        zplConfig._source = ".zplrc.js";
    }
    catch (error) {
        console.log(`Could not read or parse ${path.join(projectRoot, ".zplrc.js")}`);
    }
}
else { // None existed
    zplConfig._source = "default";
}

// Could not load the config
if (!zplConfig._source) {
    console.error("Something went wrong parsing configuration. See errors above.");
    process.exit(3);
}


// Initialize bdFolder
const windows = process.env.APPDATA;
const mac = process.env.HOME + "/Library/Application Support";
const linux = process.env.XDG_CONFIG_HOME ? process.env.XDG_CONFIG_HOME : process.env.HOME + "/.config";
let bdFolder = (process.platform == "win32" ? windows : process.platform == "darwin" ? mac : linux) + "/BetterDiscord/";
if (zplConfig.bdFolder) bdFolder = zplConfig.bdFolder;


// Setup input and output bases
const pluginsPath = path.isAbsolute(zplConfig.base) ? zplConfig.base : path.join(projectRoot, zplConfig.base);
const releasePath = path.isAbsolute(zplConfig.out) ? zplConfig.out : path.join(projectRoot, zplConfig.out);
if (!fs.existsSync(pluginsPath)) fs.mkdirSync(pluginsPath, {recursive: true});
if (!fs.existsSync(releasePath)) fs.mkdirSync(releasePath, {recursive: true});


// Setup plugin specific paths
const pluginFolder = path.join(pluginsPath, pluginName);
const configPath = path.join(pluginsPath, pluginName, "config.json");
const pluginFolderExists = fs.existsSync(pluginFolder);
const configExists = fs.existsSync(configPath);
const libPath = path.join(__dirname, "..", "lib");


function initPlugin() {
    if (!pluginFolderExists) fs.mkdirSync(pluginFolder, {recursive: true});
    const mainFilePath = path.join(pluginsPath, pluginName, "index.js");
    if (configExists || fs.existsSync(mainFilePath)) {
        console.error(`Could not init plugin ${pluginName}. Files already exist.`);
        process.exit(5);
    }
    else {
        const templateConfig = require("../lib/templates/config");
        templateConfig.name = pluginName;
        fs.writeFileSync(configPath, JSON.stringify(templateConfig, null, 4));

        const templateIndex = fs.readFileSync(path.join(libPath, "templates", "index.js"));
        fs.writeFileSync(mainFilePath, templateIndex);
    }
}


function buildPlugin() {

    console.log("");
    console.time("Build took");
    console.log(`Building ${pluginName} from ${configPath}`);

    if (!configExists) {
        console.error(`Could not build plugin ${pluginName}. Config not found.`);
        process.exit(6);
    }

    const config = require(configPath);
    const mainFilePath = path.join(pluginFolder, config.main);

    if (!fs.existsSync(mainFilePath)) {
        console.error(`Could not build plugin ${pluginName}. Main file not found.`);
        process.exit(7);
    }

    const PLUGIN_TEMPLATE = fs.readFileSync(path.join(libPath, "templates", "built.js")).toString();
    const bundleableFiles = fs.readdirSync(path.join(pluginsPath, pluginName)).filter(f => f != "config.json" && f != config.main);

    const mainFileContent = require(mainFilePath).toString();
    const content = bundle(mainFileContent, pluginFolder, bundleableFiles);
    let result = buildMeta(config);
    if (zplConfig.installScript) result += require("../lib/installscript");
    result += PLUGIN_TEMPLATE.replace(`const config = "";`, () => `const config = ${JSON.stringify(config, null, 4).replace(/"((?:[A-Za-z]|[0-9]|_)+)"\s?:/g, "$1:")};`)
                             .replace(`const plugin = "";`, () => `const plugin = ${content};`);
    if (zplConfig.installScript) result += "\n/*@end@*/";
    const buildFile = path.join(releasePath, pluginName + ".plugin.js");
    fs.writeFileSync(buildFile, result);
    if (zplConfig.copyToBD) {
        console.log(`Copying ${pluginName} to BD folder`);
        fs.writeFileSync(path.join(bdFolder, "plugins", pluginName + ".plugin.js"), result);
    }
    console.log(`${pluginName} built successfully`);
    console.log(`${pluginName} saved as ${buildFile}`);
    console.timeEnd("Build took");
}


// Run command
if (subcommand === "init") initPlugin();
else buildPlugin();