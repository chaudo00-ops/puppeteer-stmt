const esModules = [
	// Axios 1.x is an ES Module (ESM), whereas Axios 0.x was a CommonJS (CJS) module
	"axios",
].join("|");

module.exports = {
	transform: {
		"^.+\\.(t|j)s?$": "ts-jest",
	},
	// setupFiles: ["./test/setEnvVars_andDefaultMocks.ts"],
	setupFilesAfterEnv: ["jest-expect-message"],
	moduleFileExtensions: ["tsx", "ts", "js", "json", "node"],
	// testMatch: ["**/*.test.ts", "**/*.test.tsx"],
	testMatch: ["**/src/**/*.test.ts", "**/deploy/scripts/*.test.ts", "**/db-snapshots/*.test.ts"],
	collectCoverage: false,
	// clearMocks: true,
	coverageDirectory: "coverage",

	testTimeout: 300000, //allow debug
	// setupFiles: ["<rootDir>/sys/_unit-test/setEnvVars.js"],
	maxWorkers: "30%",
	reporters: [
		"default",
		[
			"jest-html-reporter",
			{
				// This will sort by test status (failed tests first)
				sort: "status",
				// Show error messages
				includeFailureMsg: true,
				// Show suite-level failures
				includeSuiteFailure: true,
				// Highlight slow tests (seconds)
				executionTimeWarningThreshold: 5,
				outputPath: "test/result/jest-html-report.html",
				// Enable to help with troubleshooting
				// includeConsoleLog: true,
			},
		],
	],

	transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
	//the following configuration speeds up the startup
	testEnvironment: "node",
};
