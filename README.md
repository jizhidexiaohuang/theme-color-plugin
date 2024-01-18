# Install

npm i -D theme-color-plugin

# Config

```js
const initThemeColorPlugin = require("theme-color-plugin");

const createThemeColorReplacerPlugin = initThemeColorPlugin('默认主题色');

vue.config.js

module.exports = defineConfig({
  ...,
  plugin:[createThemeColorReplacerPlugin()]
})
```

# Use

```js
const ThemePlugin = require("theme-color-plugin/update-theme");

ThemePlugin.setProxyCssUrl("是否需要代理css地址");

ThemePlugin.updateTheme("新的颜色");
```
