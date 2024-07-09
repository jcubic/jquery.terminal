module.exports = {
    testEnvironment: 'jsdom',
    verbose: true,
    modulePathIgnorePatterns: [
        "\\/\\.#"
    ],
    testPathIgnorePatterns: [
        "\\/\\.#",
        "/docs/"
    ],
    testMatch: [
        "<rootDir>/__tests__/*.spec.js"
    ]
};
