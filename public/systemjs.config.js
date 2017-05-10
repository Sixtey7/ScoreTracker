(function (global) {
    var pathMappings = {
        '@angular': '../node_modules/@angular',
        'rxjs': '../node_modules/rxjs'
    };

    var packages = [
      // our app is within the built folder
      'built',

      // angular bundles
      '@angular/animations',
      '@angular/animations/browser',
      '@angular/core',
      '@angular/common',
      '@angular/compiler',
      '@angular/platform-browser',
      '@angular/platform-browser/animations',
      '@angular/platform-browser-dynamic',
      '@angular/http',
      '@angular/router',
      '@angular/router/upgrade',
      '@angular/forms',
      '@angular/upgrade',
      '@angular/upgrade/static',

      // other libraries
      'rxjs'
    ];

    var packagesConfig = {};

    packages.forEach(function(packageName) {
        packagesConfig[packageName] = {
            main: 'index.js',
            defaultExtension: 'js'
        };
    });

    System.config({
        map: pathMappings,
        packages: packagesConfig
    });


})(this);