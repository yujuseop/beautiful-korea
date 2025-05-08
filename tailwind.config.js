const { plugin } = require("postcss");

module.exports = {
  content: ["./src/**/*.{js,jsx, ts, tsx, html}"], //jsx를 포함
  theme: {
    extend: {},
  },
  plugin: [],
};
