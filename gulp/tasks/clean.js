module.exports = () =>
    $.gulp.task('clean', () =>
        $.gulp.src(['./app/build/**/*.*'])
        .pipe($.gp.clean())
    )