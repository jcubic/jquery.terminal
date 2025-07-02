module.exports = {
    testEnvironment: 'jsdom',
    verbose: true,
    modulePathIgnorePatterns: [
        "\\/\\.#"
    ],
    testPathIgnorePatterns: [
        "\\/\\.#",
        "/docs/",
        "/docusaurus/"
    ],
    testMatch: [
        "<rootDir>/__tests__/*.spec.js"
    ]
};
