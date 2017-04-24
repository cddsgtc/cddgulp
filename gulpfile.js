var gulp = require('gulp')
changed = require('gulp-changed'),
    concat = require('gulp-concat'),
    htmlmin = require('gulp-htmlmin'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    clean_css = require('gulp-clean-css'),
    cached = require('gulp-cached'),
    rev = require('gulp-rev'),
    rev_replace = require('gulp-rev-replace'),
    rev_collector = require('gulp-rev-collector'),
    server = require('browser-sync'),
    babel = require('gulp-babel'),
    revdele = require('gulp-rev-delete-original'),
    sourcemaps = require('gulp-sourcemaps'),
    reload = server.reload;

let b_dir = 'dist';

// 设置服务器
gulp.task('server', () => {
    server.init({
        port: 8081,
        server: {
            baseDir: b_dir,
            index: 'index.html'
        }
    })
})

// 复制html
gulp.task('u_html', () => {
    return gulp.src('*.html')
        .pipe(changed(b_dir))
        .pipe(htmlmin({
            collapseWhitespace: false,
            removeComments: true
        }))
        .pipe(gulp.dest(b_dir))
})

gulp.task('u_js', () => {
    gulp.src('js/*.js')
        .pipe(sourcemaps.init())
        .pipe(changed('./'))
        .pipe(babel())
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest(b_dir + '/js'))
    gulp.src('lib/*.js')
        .pipe(changed('./'))
        .pipe(gulp.dest('dist/lib'))
})

gulp.task('u_css', () => {
    return gulp.src('css/*.css')
        .pipe(changed('./'))
        .pipe(gulp.dest(b_dir + '/css'))
})

gulp.task('u_img', () => {
    return gulp.src('img/*.{jpg,png,gif,ico}')
        .pipe(changed('./'))
        .pipe(imagemin())
        .pipe(gulp.dest(b_dir + '/img'))
})
// 复制字体
gulp.task('u_font', () => {
    return gulp.src('css/font/*.{svg,ttf,woff,eot}')
        .pipe(gulp.dest(b_dir + '/css/font'))
})
// 添加指纹
gulp.task('revision', () => {
    gulp.src(['dist/**/*.js', 'dist/**/*.css'])
        .pipe(rev())
        .pipe(gulp.dest('/build'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('/build'))
    gulp.src(['dist/css/font/*'])
        .pipe(gulp.dest('build/css/font/*'))
    gulp.src(['dist/img/*.{jpg,png,ico,gif}'])
        .pipe(gulp.dest('build/img'))
})
//替换
gulp.task('replace', ['revision'], () => {
    var manifest = gulp.src('./' + 'build' + '/rev-manifest.json')

    gulp.src('*.html')
        .pipe(rev_replace({ manifest: manifest }))
        .pipe(gulp.dest('build'))
    let zip = require('gulp-zip')
    let date = new Date()
    let file_name = `build-${date.getHours()}-${date.getDate()}-${date.getMonth()+1}.zip`
    console.log(file_name)
    gulp.src('build/**/*')
        .pipe(zip(file_name))
        .pipe(gulp.dest('./'))
})

// 监视
gulp.task('watch', () => {
    gulp.watch('js/*js', ['u_js'])
    gulp.watch('css/main.css', ['u_css'])
    gulp.watch('img/*', ['u_img'])
    gulp.watch('*.html', ['u_html'])
    gulp.watch('dist/**/*').on('change', reload)
});
gulp.task('dev', ['u_html', 'u_css', 'u_img', 'u_js', 'server', 'watch'])
gulp.task('build', ['replace'])