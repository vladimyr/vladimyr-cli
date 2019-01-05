import camelcase from 'camelcase';
import unlazy from './unlazy.plugin.js';
import replace from 'rollup-plugin-re';
import strip from 'rollup-plugin-strip';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import visualizer from 'rollup-plugin-visualizer';

const sourceMap = false;

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
    visualizer()
  ]
};
