var gulp = require('gulp');
var browserSync = require('browser-sync'); // Подключаем Browser Sync
var concat = require('gulp-concat'); // Подключаем gulp-concat (для конкатенации файлов)
var uglify = require('gulp-uglifyjs'); // Подключаем gulp-uglify
var cssnano = require('gulp-cssnano'); // Подключаем пакет для минификации CSS
var del = require('del'); // Подключаем библиотеку для удаления файлов и папок
var imagemin = require('gulp-imagemin'); // Подключаем библиотеку для работы с изображениями
var pngquant = require('imagemin-pngquant'); // Подключаем библ


gulp.task('clean', function() {
    return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('scripts', function() {
    function zipjs(folder, name){
        gulp.src('app/'+folder+'/'+name)
            .pipe(uglify()) // Сжимаем JS файл
            .pipe(gulp.dest('dist/'+folder)); // Выгружаем в папку app/js
    };
    // resources/fontawesome.js
    zipjs('resources', 'fontawesome.js');
    zipjs('resources', 'jquery.js');
    zipjs('js', 'slider.js');

});

gulp.task('slider', function() {
    return gulp.src(['app/js/slider.js'])
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest('dist/js')); // Выгружаем в папку app/js
});

gulp.task('img', function() {
    function zipimage(folder) {
        gulp.src('app/img/'+folder+'/*.*') // Берем все изображения из app
            .pipe(imagemin({ // Сжимаем их с наилучшими настройками
                interlaced: true,
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],
                use: [pngquant()]
            }))
            .pipe(gulp.dest('dist/img/'+folder)); // Выгружаем на продакшен
    }
    for (var i=1; i<6; i++){zipimage(i)};
    zipimage('phantom');
    zipimage('slider');
    zipimage('');
    return;

});


gulp.task('build', ['clean', 'scripts', 'slider', 'img'], function() {

    var buildFonts = gulp.src('app/font/**/*')
        .pipe(gulp.dest('dist/font'));

    var buildCss = gulp.src(['app/css/style.css'])             // Переносим библиотеки в продакшен
        .pipe(cssnano())
        .pipe(gulp.dest('dist/css'));

    var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
        .pipe(gulp.dest('dist'));

});




gulp.task('mytask', function () {
    return gulp.src('source-files') // Выборка исходных файлов для обработки плагином
        .pipe(plugin()) // Вызов Gulp плагина для обработки файла
        .pipe(gulp.dest('folder')) // Вывод результирующего файла в папку назначения (dest - пункт назначения)
})

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browser Sync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});


gulp.task('watch', ['browser-sync'], function() {
    gulp.watch('app/css/**/*.css', browserSync.reload); // Наблюдение за sass файлами в папке sass
    gulp.watch('app/img/**/*.jpg', browserSync.reload); // Наблюдение за sass файлами в папке sass
    gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
    gulp.watch('app/js/**/*.js', browserSync.reload({stream: true})); // Наблюдение за JS файлами в папке js
});


















