const NodeEnvironment = require('jest-environment-node').default;
const { fileURLToPath } = require('url');
const { dirname } = require('path');

class CustomEnvironment extends NodeEnvironment {
  constructor(config, context) {
    super(config, context);

    // Get the test file path
    const testPath = context.testPath;

    // Convert file path to URL and back to get __filename equivalent
    const fileUrl = require('url').pathToFileURL(testPath).href;

    // Set global __dirname and __filename based on test file location
    this.global.__filename = testPath;
    this.global.__dirname = dirname(testPath);
  }

  async setup() {
    await super.setup();
  }

  async teardown() {
    await super.teardown();
  }

  getVmContext() {
    return super.getVmContext();
  }
}

module.exports = CustomEnvironment;
