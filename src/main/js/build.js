({
    appDir: '${working.directory}',
    baseUrl: './',
    mainConfigFile: '${working.directory}/quanban.launcher.js',
    dir: '${release.directory}',
    fileExclusionRegExp: /^(r|build)\.js$/,
    removeCombined: true,
    modules: [{
        name: 'quanban.launcher'
    }]
})