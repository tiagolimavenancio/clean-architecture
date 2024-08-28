module.exports = {
  extends: [""],
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
    },
  ],
};
