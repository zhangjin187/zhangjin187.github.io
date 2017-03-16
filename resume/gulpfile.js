var gulp =require("gulp");
var cleancss=require("gulp-clean-css")
gulp.task("cleancss",function(){
	gulp.src("../css/index.css").pipe(cleancss()).pipe(gulp.dest("cleancss"))
})