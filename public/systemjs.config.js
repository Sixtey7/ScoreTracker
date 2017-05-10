(function (global) {
    System.config({
        map: {
        // our app is within the built folder
        'app': 'built',

        // angular bundles
        '@angular/animations': '../node_modules/@angular/animations/bundles/animations.umd.js',
        '@angular/animations/browser': '../node_modules/@angular/animations/bundles/animations-browser.umd.js',
        '@angular/core': '../node_modules/@angular/core/bundles/core.umd.js',
        '@angular/common': '../node_modules/@angular/common/bundles/common.umd.js',
        '@angular/compiler': '../node_modules/@angular/compiler/bundles/compiler.umd.js',
        '@angular/platform-browser': '../node_modules/@angular/platform-browser/bundles/platform-browser.umd.js',
        '@angular/platform-browser/animations': '../node_modules/@angular/platform-browser/bundles/platform-browser-animations.umd.js',
        '@angular/platform-browser-dynamic': '../node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
        '@angular/http': '../node_modules/@angular/http/bundles/http.umd.js',
        '@angular/router': '../node_modules/@angular/router/bundles/router.umd.js',
        '@angular/router/upgrade': '../node_modules/@angular/router/bundles/router-upgrade.umd.js',
        '@angular/forms': '../node_modules/@angular/forms/bundles/forms.umd.js',
        '@angular/upgrade': '../node_modules/@angular/upgrade/bundles/upgrade.umd.js',
        '@angular/upgrade/static': '../node_modules/@angular/upgrade/bundles/upgrade-static.umd.js',

        // other libraries
        'rxjs':                      '../node_modules/rxjs',
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
        app: {
            main: './main.js',
            defaultExtension: 'js',
        },
        rxjs: {
            defaultExtension: 'js'
        }
     }
  });

})(this);