const gulp = require('gulp');
const path = require('path');
const spriteSmith = require('gulp.spritesmith');
const buffer = require('vinyl-buffer');
const csso = require('gulp-csso');
const imagemin = require('gulp-imagemin');
const merge = require('merge-stream');
const imageResize = require('gulp-image-resize');
const fs = require('fs-extra');
const concatCss = require('gulp-concat-css');

function getFolders(dir) {
  return fs
    .readdirSync(dir)
    .filter(item => fs.statSync(path.join(dir, item)).isDirectory());
}

function listEmojis(done) {
  let rawData = fs.readFileSync('./src/openmoji.json');
  let emojisRaw = JSON.parse(rawData, 'utf8');
  let modifiedEmojis = emojisRaw.reduce((acc, curVal) => {
    const correctCategoryObject = acc.find(el => el.category === curVal.group);
    if (correctCategoryObject) {
      correctCategoryObject.emojis.push({
        code: curVal.hexcode,
        name: curVal.annotation,
        emoji: curVal.emoji,
        tags: `${curVal.tags} ${curVal.openmoji_tags}`
      });
    } else {
      acc = [
        ...acc,
        {
          category: curVal.group,
          emojis: [
            {
              code: curVal.hexcode,
              name: curVal.annotation,
              emoji: curVal.emoji,
              tags: `${curVal.tags} ${curVal.openmoji_tags}`
            }
          ]
        }
      ];
    }
    return acc;
  }, []);

  fs.writeFileSync('./src/new-hope.json', JSON.stringify(modifiedEmojis));
  done();
}
function sortEmojis(done) {
  let rawData = fs.readFileSync('./src/openmoji.json');
  let emojisRaw = JSON.parse(rawData, 'utf8');
  fs.readdir('./src/images/icons-raw', (err, files) => {
    files.forEach(file => {
      const emoji = emojisRaw.find(
        item =>
          item.hexcode ===
          file
            .split('.')
            .slice(0, -1)
            .join('.')
      );
      if (emoji && emoji.group) {
        fs.ensureDirSync(`./src/images/icons-optimized/${emoji.group}`);
        fs.copy(
          `./src/images/icons-raw/${file}`,
          `./src/images/icons-optimized/${emoji.group}/${file}`,
          err => {
            if (err) return console.error(err);

            console.log('Success!');
          }
        );
      } else {
        console.log('Something went wrong');
      }
    });
  });
}

function downsizeEmojis() {
  return gulp
    .src('src/images/icons-optimized/**/*.png')
    .pipe(imageResize({ width: 40, height: 40 }))
    .pipe(gulp.dest('src/images/icons-optimized/'));
}

function buildSprites(done) {
  const imagesPath = 'src/images/icons-optimized';
  const folders = getFolders(imagesPath);

  folders.map(folder => {
    const spriteData = gulp.src(path.join(imagesPath, folder, '/*.png')).pipe(
      spriteSmith({
        imgName: `${folder}-icons-sprite.png`,
        cssName: `${folder}-icons-sprite.css`,
        imgPath: `../images/sprites${folder}-icons-sprite.css`
      })
    );

    const imgStream = spriteData.img
      .pipe(buffer())
      .pipe(imagemin())
      .pipe(gulp.dest('src/images/sprites'));

    const cssStream = spriteData.css
      .pipe(csso())
      .pipe(gulp.dest('src/styles/sprites'));

    merge(imgStream, cssStream);
  });
  done();
}

function concatSprites() {
  return gulp
    .src('src/styles/sprites/**/*.css')
    .pipe(concatCss('styles/sprite.css'))
    .pipe(gulp.dest('src/'));
}

gulp.task('sprite', gulp.series(listEmojis));

// exports.sprite = gulp.series(buildSprites, concatSprites);
