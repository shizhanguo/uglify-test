// 获取 gulp
var gulp = require('gulp');
// 获取 uglify 模块（用于压缩 JS）
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
//var babel = require('gulp-babel');
// 压缩 js 文件
// 在命令行使用 gulp script 启动此任务
gulp.task('jscompress', function() {
    // 1. 找到文件
   return gulp.src(['dist/afterJs/*.js'])
    // 2. 压缩文件
        .pipe(uglify({
    		output:{
        		max_line_len: 50000,
//      		comments:'license'
        	},
        }))
        .pipe(rename({suffix:'.min'}))//设置压缩文件名
        // 3. 另存压缩后的文件
        .pipe(gulp.dest('dist/minJs/js'));
});

// 在命令行使用 gulp auto 启动此任务
gulp.task('auto', function () {
    // 监听文件修改，当文件被修改则执行 script 任务
    gulp.watch('dist/afterJs/*.js', gulp.series('jscompress'));
});
// 使用 gulp.task('default') 定义默认任务
// 在命令行使用 gulp 启动 script 任务和 auto 任务
//gulp.task('default', ['auto']);

gulp.task('default', gulp.series('auto','jscompress'));
