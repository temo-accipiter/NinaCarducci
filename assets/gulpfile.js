const gulp = require("gulp");
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");

// Fonction pour minifier les fichiers CSS
function minifyCSS() {
  return gulp
    .src("*.css")
    .pipe(cleanCSS()) // Utilisez cleanCSS() à la place de cssmin()
    .pipe(gulp.dest("dist/css"));
}

// Fonction pour minifier les fichiers JS
function minifyJS() {
  return gulp.src("*.js").pipe(uglify()).pipe(gulp.dest("dist/js"));
}

// Tâche par défaut (exécutée en tapant simplement "gulp" dans le terminal)
gulp.task("default", gulp.series(minifyCSS, minifyJS));