const gulp = require('gulp')
const concat = require('gulp-concat')
const pump = require('pump')
const minify = require('gulp-minify-css')
const sass = require('gulp-sass')
const del = require('del')
const autoprefixer = require('gulp-autoprefixer')
const merge = require('merge-stream')
const realFavicon = require('gulp-real-favicon')
const mergeJson = require('gulp-merge-json')
const jsonminify = require('gulp-jsonminify')
const fs = require('fs')

const paths = {
  styles: {
    src_css: './src/stylesheets/src/*.css',
    src_scss: './src/stylesheets/src/*.scss',
    dest: './src/stylesheets/dist/'
  },
  favicon: {
    image: './src/img/favicon.png',
    index: './src/index.html',
    file: './src/faviconData.json',
    dest: './public/'
  }
}

gulp.task('style', function (cb) {
  let scssStream = gulp.src([paths.styles.src_scss])
    .pipe(sass())
    .pipe(autoprefixer({browsers: ['last 2 versions'], cascade: false}))
    .pipe(concat('scss-files.scss'))

  let cssStream = gulp.src([paths.styles.src_css])
    .pipe(concat('css-files.css'))

  pump([
    merge(scssStream, cssStream),
    concat('style.min.css'),
    minify(),
    autoprefixer({browsers: ['last 2 versions'], cascade: false}),
    gulp.dest(paths.styles.dest)
  ], cb)
})

gulp.task('generate-favicon', function (done) {
  realFavicon.generateFavicon({
    masterPicture: paths.favicon.image,
    dest: paths.favicon.dest,
    iconsPath: '%PUBLIC_URL%',
    design: {
      ios: {
        pictureAspect: 'backgroundAndMargin',
        backgroundColor: '#ffffff',
        margin: '14%',
        assets: {
          ios6AndPriorIcons: false,
          ios7AndLaterIcons: false,
          precomposedIcons: true,
          declareOnlyDefaultIcon: true
        }
      },
      desktopBrowser: {},
      windows: {
        pictureAspect: 'noChange',
        backgroundColor: '#00aba9',
        onConflict: 'override',
        assets: {
          windows80Ie10Tile: false,
          windows10Ie11EdgeTiles: {
            small: false,
            medium: true,
            big: false,
            rectangle: false
          }
        }
      },
      androidChrome: {
        pictureAspect: 'noChange',
        themeColor: '#000000',
        manifest: {
          startUrl: './index.html',
          display: 'standalone',
          orientation: 'notSet',
          onConflict: 'override',
          declared: true
        },
        assets: {
          legacyIcon: false,
          lowResolutionIcons: false
        }
      },
      safariPinnedTab: {
        pictureAspect: 'silhouette',
        themeColor: '#000000'
      }
    },
    settings: {
      scalingAlgorithm: 'Mitchell',
      errorOnImageTooSmall: false,
      readmeFile: false,
      htmlCodeFile: false,
      usePathAsIs: false
    },
    markupFile: paths.favicon.file
  }, function () {
    done()
  })
})

gulp.task('inject-favicon-markups', function () {
  return gulp.src([ paths.favicon.index ])
    .pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(paths.favicon.file)).favicon.html_code))
    .pipe(gulp.dest(paths.favicon.dest))
})

gulp.task('check-for-favicon-update', function (done) {
  var currentVersion = JSON.parse(fs.readFileSync(paths.favicon.file)).version
  realFavicon.checkForUpdates(currentVersion, function (err) {
    if (err) {
      throw err
    }
  })
})

gulp.task('copy-commons', function () {
  gulp.src('./app-configs/base-config.js')
    .pipe(gulp.dest('./src/config/'))
    .pipe(gulp.dest('./functions/config/'))

  gulp.src('./app-configs/env.json')
    .pipe(gulp.dest('./src/config/'))
    .pipe(gulp.dest('./functions/config/'))

  gulp.src('./src/img/**/*')
    .pipe(gulp.dest('./public/'))

  gulp.src('./models/**/*')
    .pipe(gulp.dest('./src/models'))
    .pipe(gulp.dest('./functions/models'))
})

gulp.task('clean', function () {
  del([ paths.styles ])
})

gulp.task('watch', function () {
  gulp.watch(paths.styles.src_scss, gulp.start('style'))
})

gulp.task('build', [
  'clean',
  'copy-commons',
  'style',
  'generate-favicon',
  'inject-favicon-markups'
])

gulp.task('default', [
  'copy-commons',
  'style',
  'inject-favicon-markups'
])
