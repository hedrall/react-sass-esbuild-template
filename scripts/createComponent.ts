import inquirer from 'inquirer';
import * as path from 'path';
import * as fs from 'fs';
import * as pluralize from 'pluralize';
import { pascalCase } from 'change-case';

const ROOT = path.resolve(__dirname, '..');
const COMPONENT_PATH = path.resolve(ROOT, 'src/components');

const COMPONENT_TYPES = {
  ATOM: 'Atom',
  MOLECULE: 'Molecule',
  ORGANISM: 'Organism',
  PAGE: 'Page',
} as const;
type ComponentType = typeof COMPONENT_TYPES[keyof typeof COMPONENT_TYPES];

const FILE_TYPES = {
  COMPONENT: 'component',
  SCSS: 'scss',
  SPEC: 'spec',
} as const;
type FileType = typeof FILE_TYPES[keyof typeof FILE_TYPES];

inquirer
  .prompt([
    {
      type: 'list',
      message: 'Which level component？',
      name: 'componentType',
      choices: Object.values(COMPONENT_TYPES),
    },
    {
      type: 'input',
      message: 'Component name ?',
      name: 'componentName',
    },
    {
      type: 'checkbox',
      message: 'Which file do you need ?',
      name: 'fileTypes',
      choices: Object.values(FILE_TYPES).map(type => ({
        name: type,
        checked: true,
      })),
    },
  ])
  .then(async (answers: { componentType: ComponentType; componentName: string; fileTypes: FileType[] }) => {
    const { componentType, componentName: _cn, fileTypes } = answers;
    const ComponentName = pascalCase(_cn);

    console.log('>>> 1. create directory');
    const createDirPath = path.resolve(
      COMPONENT_PATH,
      pluralize.plural(componentType.toLowerCase()),
      pascalCase(ComponentName),
    );
    console.log(`path: ${createDirPath}`);
    fs.mkdirSync(createDirPath);

    console.log('>>> 2. generating files');
    fileTypes
      .map(type => {
        switch (type) {
          case 'component':
            return {
              fileName: 'index.tsx',
              content: getComponentTemplate(fileTypes, ComponentName),
            };
          case 'scss':
            return {
              fileName: 'index.scss',
              content: `.${ComponentName} {
}`,
            };
          case 'spec':
            return {
              fileName: 'index.spec.tsx',
              content: getSpecTemplate(ComponentName, componentType),
            };
          default:
            throw new Error('unknown error');
        }
      })
      .map(file => {
        console.log(`emit file: ${file.fileName}`);
        fs.writeFileSync(path.resolve(createDirPath, file.fileName), file.content);
      });

    console.log('done');
  })
  .catch(error => {
    console.error('error', error);
  });

const getComponentTemplate = (types: FileType[], componentName: string) => {
  return `import React from 'react';

export type ${componentName}Props = {
  
};

export const ${componentName}: React.FC<${componentName}Props> = (props) => {
  return (
    <div className="${componentName}">
      
    </div>
  );
}
`;
};

const getSpecTemplate = (componentName: string, componentType: ComponentType) => {
  const type = pluralize.plural(componentType.toLowerCase());
  return `import React from 'react';
import { render, screen } from '@testing-library/react/pure';
import { ${componentName}, ${componentName}Props } from "@frontend/components/${type}/${componentName}/index";

describe('${componentName}', () => {
  
  let container: HTMLElement;
  
  const props: ${componentName}Props = {
    
  }
  
  beforeAll(() => {
    const tree = render(<${componentName} {...(props)} />);
    container = tree.container;
  });

  test('snapshot', () => {
    expect(container).toMatchSnapshot();
  });
});
`;
};
