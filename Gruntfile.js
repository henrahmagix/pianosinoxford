'use strict';

module.exports = function (grunt) {

    if (grunt.option('help')) {
        require('load-grunt-tasks')(grunt);
    } else {
        require('jit-grunt')(grunt);
    }

    grunt.initConfig({
        compass: {
            options: {
                sassDir: 'sass',
                cssDir: 'stylesheets',
                imagesDir: 'images',
                relativeAssets: true
            },
            compile: {},
            force: {
                options: {
                    force: true
                }
            },
            watch: {
                options: {
                    watch: true
                }
            }
        }
    });

    grunt.registerTask('default', 'compass:watch');

};
