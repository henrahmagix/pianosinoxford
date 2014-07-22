'use strict';

module.exports = function (grunt) {

    if (grunt.option('help')) {
        require('load-grunt-tasks')(grunt);
    } else {
        require('jit-grunt')(grunt);
    }

    grunt.initConfig({
        paths: {
            sass: '_sass',
            build: '_site'
        },
        watch: {
            sass: {
                files: ['<%= paths.sass %>/**/*'],
                tasks: ['build']
            },
            content: {
                files: ['**/*.md'],
                tasks: ['build']
            },
            livereload: {
                files: ['<%= paths.build %>/**/*'],
                tasks: [],
                options: {
                    livereload: '<%= livereloadPort %>'
                }
            }
        },
        compass: {
            options: {
                basePath: '<%= paths.sass %>',
                config: '<%= paths.sass %>/config.rb'
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
            build: {
                options: {
                    base: '<%= paths.build %>',
                    keepalive: true,
                    open: true
                }
            }
        },
        shell: {
            init: {
                command: 'bundle install'
            },
            build: {
                command: 'bundle exec jekyll build'
            }
        },
        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            dev: [
                'connect:build',
                'watch'
            ]
        }
    });

    grunt.config.set('livereloadPort', grunt.option('livereload'));

    grunt.registerTask('default', [
        'shell:init',
        'build'
    ]);

    grunt.registerTask('build', [
        'compass:compile',
        'shell:build'
    ]);

    grunt.registerTask('dev', [
        'build',
        'concurrent:dev'
    ]);

};
