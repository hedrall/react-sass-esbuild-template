import * as sass from 'sass';
import { FileImporter } from 'sass';
import * as path from 'path';
import * as fs from 'fs';
// @ts-ignore
import glob from 'glob';

const ASSETS_PATH = path.resolve(__dirname, 'src/assets');
const OUT_DIR = path.resolve(__dirname, 'public');
const OUT_FILE_NAME = 'main';
const OUT_PATH = path.resolve(OUT_DIR, `${OUT_FILE_NAME}.css`);
const OUT_MAP_PATH = path.resolve(OUT_DIR, `${OUT_FILE_NAME}.css.map`);

const getComponentStyleFilePaths = async () => {
  return await new Promise<string[]>(resolve => {
    glob(path.resolve(__dirname, 'src/components/**/*.@(css|scss)'), (err, files) => {
      if (err) throw new Error('filed to search css files.');
      resolve(files);
    });
  });
};

function emitToFile(result: sass.CompileResult) {
  fs.writeFileSync(OUT_PATH, result.css);
  fs.writeFileSync(OUT_MAP_PATH, JSON.stringify(result.sourceMap));
}

function compile(mainFileWithAtUser: string) {
  const importer: FileImporter = {
    findFileUrl: url => {
      if (url === 'variables') {
        return new URL(`file://${ASSETS_PATH}/_variables.scss`);
      }

      return new URL(`file://${url}`);
    },
  };
  return sass.compileString(mainFileWithAtUser, {
    sourceMap: true,
    importer,
  });
}

function addImportStatement(paths: string[], mainFile: Buffer) {
  return (
    paths
      .map(p => {
        const splits = p.split('/');
        const fileName = splits.slice(-2)[0].split('.')[0];
        const dir = splits.slice(-3)[0];
        // use namespace to not conflict names
        const namespaceName = `${dir}_${fileName}`;
        return `@use '${p}' as ${namespaceName};`;
      })
      .join('\n') +
    '\n' +
    mainFile
  );
}

async function loadCssFiles() {
  // path list of component style
  const paths = await getComponentStyleFilePaths();

  // load main  file
  const mainFile = fs.readFileSync(path.resolve(ASSETS_PATH, 'main.scss'));
  return { paths, mainFile };
}

(async () => {
  // load css files
  const { paths, mainFile } = await loadCssFiles();

  // add import expression(@use) of style of each component to main.scss
  const mainFileWithAtUser = addImportStatement(paths, mainFile);

  const result = compile(mainFileWithAtUser);

  emitToFile(result);
  console.log('style compile completed.');
})().catch(console.error);
