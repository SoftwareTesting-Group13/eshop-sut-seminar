// Run this teaching demo explicitly; npm test keeps its existing discovery rules.
module.exports = {
  rootDir: '..',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/demos/flaky-delay.demo.js'],
  verbose: true,
};
