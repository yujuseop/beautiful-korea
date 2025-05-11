const { plugin } = require("postcss");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html}"], //jsx를 포함
  theme: {
    extend: {},
  },
  plugins: [],
};
