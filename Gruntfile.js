'use strict';

module.exports = function (grunt) {

    if (grunt.option('help')) {
        require('load-grunt-tasks')(grunt);
    } else {
        require('jit-grunt')(grunt);
    }

    grunt.initConfig({
        watch: {
            livereload: {
                files: ['_site/**/*'],
                tasks: [],
                options: {
                    livereload: '<%= livereloadPort %>'
                }
            }
        },
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
        },
        connect: {
            options: {
                port: grunt.option('connect-port') || 9000,
                hostname: grunt.option('connect-hostname') || '0.0.0.0',
                livereload: '<%= livereloadPort %>'
            },
            site: {
                options: {
                    base: '_site',
                    keepalive: true
                }
            }
        },
        shell: {
            init: {
                command: 'bundle install'
            },
            jekyll: {
                command: 'bundle exec jekyll build --watch'
            }
        },
        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            dev: [
                'shell:jekyll',
                'compass:watch',
                'watch',
                'connect:site'
            ]
        }
    });

    grunt.config.set('livereloadPort', grunt.option('livereload'));

    grunt.registerTask('default', [
        'shell:init',
        'compass:compile'
    ]);

    grunt.registerTask('dev', 'concurrent:dev');

};
