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
const tap = require('gulp-tap');

function getFolders(dir) {
  return fs
    .readdirSync(dir)
    .filter(item => fs.statSync(path.join(dir, item)).isDirectory());
}

gulp.task('sortEmojis', done => {
  let rawData = fs.readFileSync('./src/openmoji.json');
  let emojisRaw = JSON.parse(rawData, 'utf8');

  return gulp
    .src('./src/images/icons-raw/*.png')
    .pipe(
      tap(file => {
        const fileName = path.basename(file.path, '.png');
        const emoji = emojisRaw.find(item => item.hexcode === fileName);
        if (
          emoji &&
          emoji.group &&
          emoji.annotation !== '' &&
          emoji.group !== 'component' &&
          emoji.group !== 'extras-openmoji' &&
          emoji.group !== 'extras-unicode'
        ) {
          fs.ensureDirSync(`./src/images/icons-optimized/${emoji.group}`);
          fs.copy(
            file.path,
            `./src/images/icons-optimized/${emoji.group}/${fileName}-1x.png`,
            err => {
              if (err) return console.error(err);
            }
          );
          fs.copy(
            file.path,
            `./src/images/icons-optimized/${emoji.group}/${fileName}-2x.png`,
            err => {
              if (err) return console.error(err);
            }
          );
        }
      })
    )
    .on('end', done);
});

gulp.task('downsizeEmojis', done => {
  const s1 = gulp
    .src('src/images/icons-optimized/**/*-1x.png')
    .pipe(imageResize({ width: 40, height: 40 }))
    .pipe(gulp.dest('src/images/icons-optimized/'));
  const s2 = gulp
    .src('src/images/icons-optimized/**/*-2x.png')
    .pipe(imageResize({ width: 80, height: 80 }))
    .pipe(gulp.dest('src/images/icons-optimized/'));
  return merge(s1, s2);
});

gulp.task('buildSprites', done => {
  const imagesPath = 'src/images/icons-optimized';
  const folders = getFolders(imagesPath);

  return folders.map(folder => {
    const spriteData = gulp.src(path.join(imagesPath, folder, '/*.png')).pipe(
      spriteSmith({
        imgName: `${folder}-icons-sprite.png`,
        cssName: `${folder}-icons-sprite.css`,
        imgPath: `../images/sprites/${folder}-icons-sprite.png`,
        retinaImgName: `${folder}-icons-sprite2x.png`,
        retinaImgPath: `../images/sprites/${folder}-icons-sprite2x.png`,
        retinaSrcFilter: [path.join(imagesPath, folder, '/*-2x.png')]
      })
    );

    return Promise.all([
      new Promise(resolve => {
        spriteData.img
          .pipe(buffer())
          .pipe(imagemin())
          .pipe(gulp.dest('src/images/sprites'))
          .on('end', resolve);
      }),
      new Promise(resolve => {
        spriteData.css
          .pipe(csso())
          .pipe(gulp.dest('src/styles/sprites'))
          .on('end', resolve);
      })
    ]).then(() => done());
  });
});

gulp.task('concatSprites', () => {
  return gulp
    .src('src/styles/sprites/**/*.css')
    .pipe(concatCss('styles/sprite.css', { rebaseUrls: false }))
    .pipe(gulp.dest('src/'));
});

gulp.task('listEmojis', done => {
  let rawData = fs.readFileSync('./src/openmoji.json');
  let emojisRaw = JSON.parse(rawData, 'utf8');
  let modifiedEmojis = emojisRaw.reduce((acc, curVal) => {
    if (
      curVal.annotation !== '' &&
      curVal.group !== 'component' &&
      curVal.group !== 'extras-openmoji' &&
      curVal.group !== 'extras-unicode'
    ) {
      const correctCategoryObject = acc.find(
        el => el.category === curVal.group
      );
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
    }

    return acc;
  }, []);

  fs.writeFileSync('./src/emoji-list.json', JSON.stringify(modifiedEmojis));
  done();
});

gulp.task(
  'sprite',
  gulp.series(
    'sortEmojis',
    'downsizeEmojis',
    'buildSprites',
    'concatSprites',
    'listEmojis'
  )
);
