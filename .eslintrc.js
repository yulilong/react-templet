module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb',
  env: {
    browser: true,
    node: true,
    es6: true
  },
  // 全局变量，当访问当前源文件内未定义的变量时，no-undef 规则将发出警告。配置这些全局变量，这样 ESLint 就不会发出警告了。
  globals: {
    // self: true,
  },
  settings: {
    'import/core-modules': [
      'components',
      'actions',
      'api',
      'reducers',
      'utils',
      'constants'
    ]
  },
  parserOptions: {
    'ecmaFeatures': {
      'jsx': true,
      'experimentalObjectRestSpread': true
    }
  },
  rules: {
    // 禁止使用特定的全局变量 关闭
    'no-restricted-globals': 0,
    // 空行允许有空格、或者注释块有空格
    'no-trailing-spaces': 0,
    'linebreak-style': 'off',
    'func-names': 0,
    'max-len': [
      'warn',
      150,
      4,
      {
        'comments': 150
      }
    ],
    'indent': [
      'error',
      2,
      {
        'SwitchCase': 1
      }
    ],
    'react/jsx-indent': [
      2,
      2
    ],
    // 需要添加 语句结尾分号semicolon
    'semi': 1,
    'react/sort-comp': 0,
    'react/prop-types': 0,
    'react/prefer-es6-class': 0,
    'react/prefer-stateless-function': 0,
    'react/jsx-first-prop-new-line': 0,
    'react/jsx-filename-extension': 0,
    'no-return-assign': 0,
    'react/no-multi-comp': 0,
    'array-callback-return': 0,
    'no-underscore-dangle': 0,
    'no-bitwise': [
      'error',
      {
        'allow': [
          '~'
        ]
      }
    ],
    'no-plusplus': 1,
    'no-unused-expressions': [
      'warn',
      {
        'allowShortCircuit': true,
        'allowTernary': true
      }
    ],
    // 
    'import/no-unresolved': [2, { 'ignore': ['^@'] }],
    // 忽略检查引用的包安装在package.json中dependencies还是devDependencies中
    'import/no-extraneous-dependencies': 0,
    // import a from '@model/a' 忽略这种报错
    'import/extensions': 0,
    // 忽略导出文件中: export const a ={} 与 export default {a} 中 a变量报错问题
    'import/no-named-as-default-member': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/img-has-alt': 0,
    // 正常写法：<label htmlFor='box'>记录：<input id='box' /></label>
    // 让 <label htmlFor='box'>记录：</label> <input id='box' /> 这种写法不报错
    'jsx-a11y/label-has-for': ['error', {
      'required': {
        'some': ['nesting', 'id'] // 嵌套或有ID 都可以
      }
    }],
    'no-unused-vars': [
      'warn',
      {
        'vars': 'all',
        'args': 'none'
      }
    ],
    'react/no-unused-state': [
      'warn'
    ],
    'no-param-reassign': [
      'error',
      {
        'props': false
      }
    ],
    'object-shorthand': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'react/no-array-index-key': 1,
    'jsx-a11y/click-events-have-key-events': 0,
    'no-debugger': 'off'
  },
  plugins: [
    'jsx-a11y'
  ]
};
