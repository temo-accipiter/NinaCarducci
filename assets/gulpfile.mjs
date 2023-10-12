/****************************************************************************/
/*** Minification des fichiers CSS et JS / concatenation des fichiers JS ***/
/**************************************************************************/
import gulp from "gulp";
import cleanCSS from "gulp-clean-css"; // plugin pour minifier les fichiers CSS
import concat from "gulp-concat"; // plugin pour concatener les fichiers JS
import uglify from "gulp-uglify"; // plugin pour minifier les fichiers JS

// Fonction pour minifier les fichiers CSS
function minifyCSS() {
  return gulp.src("*.css").pipe(cleanCSS()).pipe(gulp.dest("dist/css")); // indique où les fichiers minifiés CSS doivent être enregistrés
}

// Fonction pour minifier les fichiers JS
function minifyAndConcatJS() {
  return gulp
    .src("*.js")
    .pipe(uglify())
    .pipe(concat("concat-minify.js")) // Concatène les fichiers minifiés
    .pipe(gulp.dest("dist/js"));
}

// Tâche à exécuter avec la commande: "gulp"
gulp.task("default", gulp.series(minifyCSS, minifyAndConcatJS));
