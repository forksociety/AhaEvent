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
    src: './src/img/favicon.png',
    dest: './public/'
  },
  jsonFiles: {
    src: './functions/events/*.json',
    dist: './functions/'
  }
}

var FAVICON_DATA_FILE = 'faviconData.json'

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
    masterPicture: paths.favicon.src,
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
    markupFile: FAVICON_DATA_FILE
  }, function () {
    done()
  })
})

// Inject the favicon markups in your HTML pages. You should run
// this task whenever you modify a page. You can keep this task
// as is or refactor your existing HTML pipeline.
gulp.task('inject-favicon-markups', function () {
  return gulp.src([ './src/index.html' ])
    .pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
    .pipe(gulp.dest('./public/'))
})

// Check for updates on RealFaviconGenerator (think: Apple has just
// released a new Touch icon along with the latest version of iOS).
// Run this task from time to time. Ideally, make it part of your
// continuous integration system.
gulp.task('check-for-favicon-update', function (done) {
  var currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version
  realFavicon.checkForUpdates(currentVersion, function (err) {
    if (err) {
      throw err
    }
  })
})

gulp.task('merge-json', function () {
  gulp.src(paths.jsonFiles.src)
    .pipe(mergeJson({fileName: 'events.json'}))
    .pipe(jsonminify())
    .pipe(gulp.dest(paths.jsonFiles.dist))
})

gulp.task('copy-configs', function () {
  gulp.src('./base-config.js')
    .pipe(gulp.dest('./src/config/'))
    .pipe(gulp.dest('./functions/config/'))
})

gulp.task('copy-public', function () {
  gulp.src('./src/img/')
    .pipe(gulp.dest('./public/'))
  gulp.src('./src/img/*')
    .pipe(gulp.dest('./public/img'))
})

gulp.task('clean', function () {
  del([ paths.styles ])
})

gulp.task('watch', function () {
  gulp.watch(paths.styles.src_scss, gulp.start('style'))
})

gulp.task('build', [
  'clean',
  'merge-json',
  'copy-configs',
  'copy-public',
  'style',
  'generate-favicon',
  'inject-favicon-markups'
])

gulp.task('default', [
  'merge-json',
  'copy-configs',
  'copy-public',
  'style',
  'generate-favicon',
  'inject-favicon-markups'
])
