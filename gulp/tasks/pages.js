module.exports = () =>
    $.gulp.task('pages', () =>
        $.gulp.src($.path.src.pages)
            .pipe($.gp.include())
            .pipe($.gp.pug({pretty: true}))
            .pipe($.gulp.dest($.path.build.pages)).on('end', $.bs.reload))