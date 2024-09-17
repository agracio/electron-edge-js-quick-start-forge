## electron-forge example based on `electron-edge-js-quick-start`  https://github.com/agracio/electron-edge-js-quick-start

### Credit: https://github.com/eug3/e

#### NOTE: This was only tested on Windows

## electron-edge-js-quick-start

1. Install dependencies `npm install`
2. Build dotnet project `dotnet build src/QuickStart.sln`
3. **cmd** `xcopy src\QuickStart.Core\bin\Debug\net8.0\ .\net8.0\ /s /e /h`  
 **bash** `cp -r ./src/QuickStart.Core/bin/Debug/net8.0 ./net8.0`
4. Run app using electron-forge `npm start`

## Package
* To package app using electron-forge run `npm run package`
* To create a distributable app using electron-forge run `npm run make`

#### Electron app will be created in `out/electron-edge-js-quick-start-forge-{os}-{arch}`










