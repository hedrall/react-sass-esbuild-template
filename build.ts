import * as fs from 'fs';
import * as path from 'path';
// @ts-ignore
import dayjs from 'dayjs';
import { build, BuildOptions } from 'esbuild';

const NODE_ENV = process.env['NODE_ENV'] === 'production' ? 'production' : 'development'
const isDev = NODE_ENV === 'development';
const watch = process.env['WATCH'] === 'true';
const metafile = process.env['METAFILE'] === 'true';

console.log(`${dayjs().format('HH:mm:ss')}: ビルド開始`);

const envs = {
  NODE_ENV,
} as const;

const define: BuildOptions['define'] = {
  'process.env.NODE_ENV': JSON.stringify(envs.NODE_ENV),
  global: 'window',
};

build({
  define,
  entryPoints: [path.resolve(__dirname, 'src/index.tsx')],
  bundle: true,
  outfile: 'public/index.js',
  minify: !isDev,
  legalComments: 'none',
  sourcemap: isDev,
  platform: 'browser',
  target: ['chrome58'],
  treeShaking: true,
  watch: watch && {
    onRebuild(err, result) {
      console.group();
      console.log(`${dayjs().format('HH:mm:ss')}: 再ビルド`);
      console.log('errors: ', JSON.stringify(err?.errors, null, '  ') || 'なし');
      console.log('warnings: ', JSON.stringify(result?.warnings, null, '  '));
      console.groupEnd();
    },
  },
  ...(metafile ? { metafile: true } : {}),
})
  .then(result => {
    console.group();
    if (metafile) {
      console.log(`${dayjs().format('HH:mm:ss')}: ビルドメタデータ（meta.json）出力`);
      fs.writeFileSync('meta.json', JSON.stringify(result.metafile, null, '  '));
      // 生成された meta.json を https://www.bundle-buddy.com/ で確認する
    }
    console.log('===========================================');
    console.log(`${dayjs().format('HH:mm:ss')}: ビルド完了`);
    console.error('errors', result.errors);
    if (watch) console.log('watching...');
    console.groupEnd();
  })
  .catch(e => {
    console.error(e);
    process.exit(1);
  });
