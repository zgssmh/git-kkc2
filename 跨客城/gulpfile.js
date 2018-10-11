const gulp = require('gulp');

/*
	拷贝html文件
*/
gulp.task("copy-html", function(){
	return gulp.src("*.html")
	.pipe(gulp.dest("dist"))
	.pipe(connect.reload());
})

/*
	拷贝图片
*/
gulp.task("images", function(){
	return gulp.src("images/*.{jpg,png}")
	.pipe(gulp.dest("dist/images"))
	.pipe(connect.reload());
})

/*
	使用gulp-sass-china 编译scss文件
	gulp-minify-css
	gulp-rename
*/
const scss = require("gulp-sass-china");
const minifyCSS = require("gulp-minify-css");
const rename = require("gulp-rename");
gulp.task("scss", function(){
	return gulp.src("stylesheet/*.scss")
	.pipe(scss())
	.pipe(gulp.dest("dist/css"))
	.pipe(minifyCSS())
	.pipe(rename("index.min.css"))
	.pipe(rename("header.min.css"))
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload());
})

/*
	拷贝js文件
*/
gulp.task("scripts", function(){
	return gulp.src(["*.js", "!gulpfile.js"])
	.pipe(gulp.dest("dist/js"))
	.pipe(connect.reload());
})

/*
	拷贝数据
*/
gulp.task("data", function(){
	return gulp.src(["*.json", "!package.json"])
	.pipe(gulp.dest("dist/data"))
	.pipe(connect.reload());
})

/*
	建立工程的任务
*/
gulp.task("build", ["copy-html", "scss", "images", "scripts", "data"], function(){
	console.log("编译成功");
});

/*
	编写监听
*/
gulp.task("watch", function(){
	gulp.watch(["*.json", "!package.json"], ['data']);
	gulp.watch(["*.js", "!gulpfile.js"], ['scripts']);
	gulp.watch(['stylesheet/*.scss'], ['scss']);
	gulp.watch(["*.{jpg,png}"], ['images']);
	gulp.watch(["*.html"], ['copy-html']);

})

/*
	gulp-connect 启动服务
*/
const connect = require("gulp-connect");
gulp.task("server", function(){
	connect.server({
		root: 'dist',
		port: 8888,
		livereload: true
	})
})

/*
	启动默认任务
*/
gulp.task("default", ['watch', "server"]);