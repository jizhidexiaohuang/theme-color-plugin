const client = require("webpack-theme-color-replacer/client");
const generate = require("@ant-design/colors/lib/generate").default;
const message = require("ant-design-vue").message;

let prefixCssUrl = "";
const setProxyCssUrl = (prefixUrl) => {
  prefixCssUrl = `/${prefixUrl}`;
};
let defaultThemeColor = "index.js";
const setDefaultThemeColor = (color) => {
  defaultThemeColor = color;
};

const getAntdSerials = (color) => {
  // 淡化（即less的tint）
  const lightens = new Array(9).fill().map((t, i) => {
    return client.varyColor.lighten(color, i / 10);
  });
  // colorPalette变换得到颜色值
  const colorPalettes = generate(color);
  const rgb = client.varyColor.toNum3(color.replace("#", "")).join(",");
  return lightens.concat(colorPalettes).concat(rgb);
};
const changeColor = (newColor) => {
  var options = {
    newColors: getAntdSerials(newColor), // new colors array, one-to-one corresponde with `matchColors`
    changeUrl(cssUrl) {
      return `${prefixCssUrl}/${cssUrl}`; // while router is not `hash` mode, it needs absolute path
    },
  };
  return client.changer.changeColor(options, Promise);
};

const updateTheme = (newPrimaryColor, hasTip = false) => {
  const localThemeColor = window.localStorage.getItem("themeColor");
  if (!newPrimaryColor) {
    if (!localThemeColor) {
      newPrimaryColor = defaultThemeColor;
      return false;
    } else {
      newPrimaryColor = localThemeColor;
    }
  }
  let hideMessage = null;
  if (hasTip) {
    hideMessage = message.loading("正在切换主题！", 0);
  }
  window.localStorage.setItem("themeColor", newPrimaryColor);
  changeColor(newPrimaryColor).finally((t) => {
    setTimeout(() => {
      hasTip ? hideMessage() : "";
    });
  });
};

module.exports = { setProxyCssUrl, setDefaultThemeColor, updateTheme };
