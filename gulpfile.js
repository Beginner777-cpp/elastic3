global.$ = {
    gulp: require('gulp'),
    gp: require('gulp-load-plugins')(),
    bs: require('browser-sync').create(),
    path: {
        tasks: require('./gulp/config/tasks'),
        serverDir: './app/build/',
        src: {
            html: './app/src/*.{html,pug}',
            style: './app/src/styles/*.*',
            js: './app/src/script/*.js',
            img: './app/src/images/**/*.{png,jpg,gif}',
            fonts: './app/src/fonts/**/**/*.*',
            pages: './app/src/pages/*.{html,pug}'
        },
        build: {
            html: './app/build/',
            style: './app/build/styles/',
            js: './app/build/script/',
            img: './app/build/images/',
            fonts: './app/build/fonts/',
            pages: './app/build/pages/'

        },
        watch: {
            html: ['./app/src/*.{html,pug}', './app/src/view/*.{html,pug}'],
            pages: ['./app/src/pages/*.{html,pug}'],
            style: './app/src/styles/**/*.*',
            js: './app/src/script/**/*.*',
            img: './app/src/images/**/*.{png,jpg,gif}',
            fonts: './app/src/fonts/**/*.*',

        }
    }


}

$.path.tasks.forEach(taskPath => require(taskPath)());
$.gulp.task('default', $.gulp.series('clean', $.gulp.parallel('html', 'style', 'js', 'img', 'fonts', 'pages', 'watch', 'serve')));
$.gulp.task('build', $.gulp.series('clean', $.gulp.parallel('html', 'style', 'js', 'img', 'fonts', 'pages')));

