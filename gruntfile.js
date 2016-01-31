module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        haxe: {
            project: {
                hxml: "build.hxml"
            }
        },

        shell: {
            npm: {
                command: "mkdir npm-publish || true && cp -r src dist package.json LICENSE README.md ./npm-publish/ && npm publish ./npm-publish/ && rm -r npm-publish"
            },
            sample: {
                command: "cp -r dist index.html logo.png ../adireddy.github.io/demos/device-capabilities/"
            }
        },

        zip: {
            "dc.zip": ["src/*", "haxelib.json", "README.md", "LICENSE"]
        },

        yuidoc: {
        compile: {
            name: '<%= pkg.name %>',
                description: '<%= pkg.description %>',
                version: '<%= pkg.version %>',
                url: '<%= pkg.repository.url %>',
                options: {
                linkNatives: "true",
                    attributesEmit: "true",
                    selleck: "true",
                    extension: ".hx",
                    paths: "./src",
                    outdir: "../adireddy.github.io/docs/device-capabilities/",
                    themedir: "../adireddy.github.io/docs/yui/themes/device-capabilities-theme",
                    logo: "./sample/assets/logo.png"
            }
        }
    }
    });

    grunt.loadNpmTasks("grunt-haxe");
    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks("grunt-zip");
    grunt.loadNpmTasks("grunt-shell");
    grunt.registerTask("default", ["haxe"]);
};