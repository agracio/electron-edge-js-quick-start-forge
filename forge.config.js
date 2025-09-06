const { FusesPlugin } = require("@electron-forge/plugin-fuses");
const { FuseV1Options, FuseVersion } = require("@electron/fuses");
const path = require("path");
const fs = require("fs-extra");

module.exports = {
  packagerConfig: {
    asar: true ,
    // exclude edge-js modules from asar archive
    ignore: ["node_modules/electron-edge-js", "node_modules/edge-cs", ".vscode", "src/.idea", "src/ExternalLibrary", "src/QuickStart.Core", "src/shared", "src/QuickStart.sln", ".gitignore", "README.md", ".github"],
    // ignore: ["node_modules/electron-edge-js", "node_modules/edge-cs"],
    // move binaries to resources folder
    extraResource: [
      "src/QuickStart.Core/bin/Debug/net8.0/",
    ]
  },
  hooks: {
    // copy "node_modules/electron-edge-js" and "node_modules/edge-cs" to resources folder
    postPackage: async (forgeConfig, options) => {
      console.log("build_path", options.outputPaths);
      const outdir = options.outputPaths[0];
      console.log("outdir", outdir);
      // Get node_modules path
      const nodeModulesPath = path.join(outdir, "resources", "node_modules"); 
      const modulesToCopy = ["edge-cs", "electron-edge-js"];
      // loop-for  
      for (const moduleName of modulesToCopy) {
        const sourcePath = path.join(__dirname, "node_modules", moduleName);
        const targetPath = path.join(nodeModulesPath, moduleName);
        console.log(
          `Copying ${moduleName} from:`,
          sourcePath,
          "to:",
          targetPath
        );
        fs.copySync(sourcePath, targetPath);
      }
      console.log("All modules copied successfully!");
    },
  },
  rebuildConfig: {
    // exclude any Node.js pre-build modules such as electron-edge-js from rebuild
    onlyModules: [],
  },
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {},
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin"],
    },
    {
      name: "@electron-forge/maker-deb",
      config: {},
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {},
    },
  ],
  plugins: [
    {
      name: "@electron-forge/plugin-auto-unpack-natives",
      config: {},
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};
