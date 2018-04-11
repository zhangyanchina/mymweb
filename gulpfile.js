/*
  配置具体的任务
*/
const path = require('path');
// gulp本地包，用来提供api
const gulp = require('gulp');
// const fileinclude  = require('gulp-file-include');
// 处理less
const less = require('gulp-less');
// 自动添加兼容前缀
const autoprefixer = require('gulp-autoprefixer');
// 压缩css
const cssmin = require('gulp-cssmin');
// 压缩js
const uglify = require('gulp-uglify');
// ES6语法转化
const babel = require('gulp-babel');
// 压缩HTML
const htmlmin = require('gulp-htmlmin');
// 调试
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

// 处理css
gulp.task('css',function(){
  gulp.src(path.join(__dirname,'src','css/*'))
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(gulp.dest(path.join(__dirname,'dist','css')));
})

// 处理js
gulp.task('js',function(){
  gulp.src(path.join(__dirname,'src','js/**/*.js'))
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest(path.join(__dirname,'dist','js')))
})

// 处理html
gulp.task('html',function(){
  gulp.src(path.join(__dirname, 'src/view/*.html'))
    .pipe(htmlmin({             // 把html交给htmlmin插件处理
      collapseWhitespace: true, // 设置参数去除空白
      minifyJS: true,           // 压缩html中的js
      minifyCSS: true,          // 压缩html中的css
      removeComments: true      // 去除html注释
    }))
    .pipe(gulp.dest(path.join('dist')));
})

gulp.task('build',['css','js','html']);

// 调试
gulp.task('dev',['build'],function(){
  browserSync.init({
    server: {
      baseDir: "./dist" // 监控目录的基准路径
    },
    port:8888, // 配置服务端口
    notify: false // 设置页面是否有提示信息
  });
  // 具体监听什么
  gulp.watch(path.join(__dirname,'src',"view/**/*"), ['html']).on('change', reload);
  gulp.watch(path.join(__dirname,'src',"css/**/*"), ['css']).on('change', reload);
  gulp.watch(path.join(__dirname,'src',"js/**/*"), ['js']).on('change', reload);
});

// 默认任务配置
gulp.task('default',['dev'])
