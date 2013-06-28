module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        express: {
            dev: {
                options: {
                    script: 'server/index.js',
                    port: process.env.PORT ||3000,
                }
            }
        },
        watch: {
            express: {
                files: ['server/*.js'],
                tasks: ['express:dev'],
                options: {
                    nospawn: true //Without this option specified express won't be reloaded
                }
            }
        }
    });

    // Load libs
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express-server');

    grunt.registerTask('server', ['express:dev', 'watch']);

};