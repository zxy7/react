var fs = require('fs'),
	path = require('path');
var browserify = require('browserify');
//避免将react、react-dom打包进文件
var shim = require('browserify-shim');
//用于加快打包的速度
var watchify = require('watchify');

var gulp = require('gulp');
var less = require('gulp-less');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var concat = require('gulp-concat');

var cssSrc = [
	'node_modules/semantic-ui/dist/semantic.min.css',
	'node_modules/react-datepicker/dist/react-datepicker.css',
	'node_modules/react-day-picker/lib/style.css',
	'node_modules/jquery-file-upload/css/uploadfile.css',
	'assets/main.css'
];

var b_wx = browserify({
	entries: [ 'app/global.js', 'app/index-wx.js' ],
	cache: {},
	packageCache: {},
	plugin: [ watchify ]
});

b_wx.on('update', bundle);

b_wx.on('log', function (msg) {
	console.log(msg);
});

gulp.task('default', function () {
	console.log('[start] bundle...');
	bundle();
	gulpLess();
});

gulp.task('dist', function () {
	console.log('[dist] bundle...');
	bundleDist();
});

function bundle() {
	b_wx.transform('babelify', {plugins: ['transform-class-properties'],presets: ['es2015', 'react']})
		/*.transform(shim)*/
		.bundle()
		.on('error', gutil.log)
		.pipe(source('bundle.wx.min.js'))
		.pipe(buffer())
		// 可选项，如果你不需要 sourcemaps，就删除
		.pipe(sourcemaps.init({loadMaps: true})) // 从 browserify 文件载入 map
		// 在这里将变换操作加入管道
		.pipe(sourcemaps.write('./')) // 写入 .map 文件
		.pipe(gulp.dest('./assets/'));

	gulp.src(cssSrc)
		.pipe(cssmin())
		.pipe(concat('bundle.css'))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('./assets/'));
}
//将代码进行压缩，主要用于生产环境下
function bundleDist() {
	//入口文件
	var br = browserify({
		entries: [ 'app/global.js', 'app/index-wx.js' ],
		cache: {},
		packageCache: {}
	});
	br.transform('babelify', {plugins: ['transform-class-properties'],presets: ['es2015', 'react']})
/*		.transform(shim)*/
		.bundle()
		.on('error', gutil.log)
		.pipe(source('bundle.min.js'))
		.pipe(buffer())
		.pipe(uglify())
		.pipe(gulp.dest('./assets/'));
	gulp.src(cssSrc)
		.pipe(cssmin())
		.pipe(concat('bundle.css'))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('./assets/'));
}

//将less代码进行编译
function gulpLess() {
	console.log('开始输出less编译文件！');
	gulp.src(['app/component/toast/toast.less'])
		.pipe(less())
		.pipe(gulp.dest('./assets/'));
}

