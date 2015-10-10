import gulp from 'gulp';
import babel from 'gulp-babel';
import del from 'del';
import plumber from 'gulp-plumber';

gulp.task(
  'compile',
  () => {
    gulp.src('index.js')
      .pipe(plumber())
      .pipe(babel())
      .pipe(gulp.dest('lib'));
  }
);

gulp.task(
  'watch',
  () => {
    gulp.run('compile');
    gulp.watch('index.js', ['compile'])
  }
);

gulp.task('default', ['watch'])
