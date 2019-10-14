const { resolve } = require('path')

module.exports = (options, context) => ({
  define () {
    const { message, theme, modelStyle, width, height, messageStyle } = options
    return {
      THEME: theme || 'blackCat',
      MESSAGE: message,
      MESSAGE_STYLE: messageStyle || {
        position: 'fixed',
        right: '80px',
        bottom: '195px'
      },
      MODEL_STYLE: modelStyle || {
        position: 'fixed',
        right: '90px',
        bottom: '-20px',
        opacity: '0.9'
      },
      WIDTH: width || 150,
      HEIGHT: height || 220
    }
  },
  name: '@vuepress-reco/vuepress-plugin-kan-ban-niang',
  enhanceAppFiles: resolve(__dirname, './bin/enhanceAppFile.js'),
  globalUIComponents: 'KanBanNiang'
})
