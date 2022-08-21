module.exports = {
  /**
   * テストファイルのパス => スナップショットのファイルパスに変換
   * dist/src/index.test.js
   * => src/__snapshots__/index.test.tsx.snap
   */
  resolveSnapshotPath: (testPath, snapshotExtension) => {
    const items = testPath.split('/');
    const filename = items[items.length - 1].replace('.js', '.tsx').replace('.jsx', '.tsx') + snapshotExtension;
    const path = items.slice(0, -1).join('/').replace('dist/src', 'src');
    return [path, '__snapshots__', filename].join('/');
  },

  /**
   * スナップショットのファイルパス => テストのファイルパスの変換
   * src/__snapshots__/index.test.tsx.snap
   * => dist/src/index.test.js
   */
  resolveTestPath: (snapshotFilePath, snapshotExtension) => {
    return (
      snapshotFilePath
        .replace('src/', 'dist/src/')
        .replace('__snapshots__/', '')
        .replace(`.tsx${snapshotExtension}`, '') + '.js'
    );
  },

  /**
   * 整合性の確認のためのサンプルが必須のようです
   */
  testPathForConsistencyCheck: 'dist/src/example.test.js',
};
