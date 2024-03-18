/** @type {import("prettier").Options} */
export default {
	arrowParens: 'avoid',
	bracketSameLine: false,
	bracketSpacing: true,
	embeddedLanguageFormatting: 'auto',
	endOfLine: 'lf',
	htmlWhitespaceSensitivity: 'css',
	insertPragma: false,
	jsxSingleQuote: false,
	printWidth: 120,
	proseWrap: 'always',
	quoteProps: 'as-needed',
	requirePragma: false,
	semi: false,
	singleAttributePerLine: false,
	singleQuote: true,
	tabWidth: 2,
	trailingComma: 'all',
	useTabs: true,
	overrides: [
		{
			files: ['**/*.json'],
			options: {
				useTabs: false,
			},
		},
	],
	plugins: ['prettier-plugin-tailwindcss'],
}
