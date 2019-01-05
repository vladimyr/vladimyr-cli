import camelcase from 'camelcase';
import commonjs from 'rollup-plugin-commonjs';
import copy from 'rollup-plugin-cpy';
import json from 'rollup-plugin-json';
import replace from 'rollup-plugin-re';
import resolve from 'rollup-plugin-node-resolve';
import strip from 'rollup-plugin-strip';
import unlazy from './unlazy.plugin.js';
import visualizer from 'rollup-plugin-visualizer';

const sourceMap = true;

export default {
  input: 'cli.js',
  output: {
    file: 'cli.compact.js',
    format: 'cjs',
    banner: '#!/usr/bin/env node',
    sourcemap: sourceMap
  },
  external: require('module').builtinModules,
  plugins: [
    unlazy({
      include: [
        require.resolve('log-utils'),
        require.resolve('ansi-colors')
      ]
    }),
    replace({
      patterns: [{
        match: require.resolve('log-utils'),
        test: /^require\('([\w-]+)'(?:\s*,\s*'([\w-]+)')?\)/gm,
        replace: (_, name, alias = name) => {
          const prop = camelcase(alias);
          const code = `log['${prop}'] = require('${name}');`;
          return code;
        }
      }, {
        test: /require\('debug'\)/gm,
        replace: '(() => () => {})'
      }]
    }),
    strip({ functions: ['debug'], sourceMap }),
    resolve(),
    commonjs({ sourceMap }),
    json(),
    copy({
      files: require.resolve('opn/xdg-open'),
      dest: __dirname,
      options: { verbose: true }
    }),
    visualizer()
  ]
};
