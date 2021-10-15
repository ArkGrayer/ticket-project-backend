module.exports = {
	moduleFileExtensions: ["js", "json", "ts"],
	rootDir: "src",
	testRegex: ".*\\.spec\\.ts$",
	transform: {
		"^.+\\.(t|j)s$": "ts-jest",
	},
	collectCoverageFrom: [
		"**/*.ts",
		"!tests/**/*.ts",
		"!v*/api/**/*.entity.ts",
		"!v*/api/**/*.controller.ts",
		"!v*/config/*.ts",
		"!v*/enum/*.ts",
		"!index.ts",
		"!v*/utils/encrypt/compare.ts",
	],
	setupFiles: ["./tests/setup.ts"],
	coverageDirectory: "../coverage",
	testEnvironment: "node",
	moduleDirectories: ["node_modules", "src"],
	resetMocks: true,
	coverageThreshold: {
		global: {
			statements: 100,
			branches: 100,
			functions: 100,
			lines: 100,
		},
	},
};
