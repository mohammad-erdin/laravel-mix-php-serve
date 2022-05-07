module.exports = {
	env: {
		browser: true,
		es2021: true,
		jquery: true,
	},
	extends: ['airbnb-base'],
	parserOptions: {
		ecmaVersion: 2021,
		sourceType: 'module',
	},
	rules: {
		indent: ['error', 'tab'],
		'no-tabs': ['error', { allowIndentationTabs: true }],
		'no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
		'linebreak-style': 0,
		'no-console': 0,
		'class-methods-use-this': 0,
		'no-debugger': 0,
		'global-require': 0,
		'no-extend-native': 0,
		'import/no-extraneous-dependencies': 0,
	},
	globals: {
		empty: 'writable',
		arguments: 'writable',
		Goy: 'writable',
	},
};
