'use strict';

var src = './src';
var build = './build';

module.exports = {
    sass: {
        src: src + '/static/sass/**/**/*.sass',
        build: build + '/static/css/',
        settings: {
            outputStyle: 'compact'
        }
    },
    css: {
        src: build + '/static/css/**/**/*.css',
        build: build + '/static/css/',
        settings: {
            advanced: false,
            compatibility: "ie7",
            keepBreaks: true,
            keepSpecialComments: '*'
        }
    },
    js: {
        src: src + "/static/js/**/**/*.js",
        build: build + "/static/js/",
        settings: {
        }
    },
    autoprefix: {
        src: build + '/static/css/**/**/*.css',
        build: build + '/static/css/',
        settings: {
            browsers: ['last 100 versions'],
            cascade: false,
            remove:false
        }
    },
    jade: {
        src: [
            src + '/view/**/**/*.jade',
            '!' + src + '/view/template/**/**/*.jade',
            '!' + src + '/view/component/**/**/*.jade',
        ],
        watch: src + '/view/**/**/*.jade',
        build: build + '/',
        settings: {
            pretty: true
        }
    },
    clean: {
        src: build
    },
    csssprite: {
        src: build + '/static/css/common.css',
        build: build + '/static/css/',
        settings: {
            'spriteSheet': build + '/static/images/sprite/spritesheet.png',
            'pathToSpriteSheetFromCSS': '../../static/images/sprite/spritesheet.png'
        }
    },
    image: {
        src: src + '/static/images/**/**/*',
        build: build + '/static/images/'
    },
    iconfont: {
        src: src + '/static/iconfont/**/**/*',
        build: build + '/static/iconfont/'
    },
    libcss: {
        src: src + '/static/css/**/**/*.css',
        build: build + '/static/css/'
    },
    json: {
      src: src + '/static/data/**/**/*.json',
      build: build + '/static/data/'
    }
}