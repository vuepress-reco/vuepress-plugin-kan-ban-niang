<template>
  <div class="kanbanniang">
    <div class="banniang-container" v-show="isLoaded">
      <div class="messageBox" :style="messageStyle" v-show="isShowMessageBox">
        {{ message || '欢迎来到 ' + $site.title }}
      </div>
      <div class="operation" @mouseenter="isShowMessageBox = true" @mouseleave="isShowMessageBox = false">
        <i class="iconfont icon-ban-home ban-home" @click="goHome" @mouseenter="hoverGoHome" @mouseleave="resetMessage"></i>
        <i class="iconfont icon-aliicon-copy message"></i>
        <i class="iconfont icon-theme skin" @click="changeTheme" @mouseenter="hoverChangeTheme" @mouseleave="resetMessage"></i>
        <i class="iconfont icon-close close" @click="closeBanNiang" @mouseenter="hoverCloseBanNiang" @mouseleave="resetMessage"></i>
        <a target="_blank" href="https://github.com/vuepress-reco/vuepress-plugin-kan-ban-niang">
          <i class="iconfont icon-info info" @mouseenter="hoverMoreInfo" @mouseleave="resetMessage" ></i>
        </a>
      </div>
      <canvas
        id="banniang"
        :style="modelStyle"
        :width="style.width"
        :height="style.height"
        class="live2d"
      ></canvas>
    </div>
    <div class="showBanNiang" v-show="displayBanNiang" @click="showBanNiang">
      看板娘
    </div>
  </div>
</template>

<script>
import live2dJSString from './assets/js/live2d'
export default {
  name: 'KanBanNiang',
  data () {
    return {
      isLoaded: true,
      displayBanNiang: false,
      isShowMessageBox: false,
      message: MESSAGE,
      defaultMessage: MESSAGE,
      currentTheme: THEME,
      themeName: ['blackCat', 'whiteCat', 'haru1', 'haru2', 'haruto', 'koharu', 'izumi', 'shizuku', 'wanko'],
      model: {
        blackCat:
            'https://cdn.jsdelivr.net/gh/QiShaoXuan/live2DModel@1.0.0/live2d-widget-model-hijiki/assets/hijiki.model.json',
        whiteCat:
            'https://cdn.jsdelivr.net/gh/QiShaoXuan/live2DModel@1.0.0/live2d-widget-model-tororo/assets/tororo.model.json',
        haru1:
            'https://cdn.jsdelivr.net/gh/QiShaoXuan/live2DModel@1.0.0/live2d-widget-model-haru/01/assets/haru01.model.json',
        haru2:
            'https://cdn.jsdelivr.net/gh/QiShaoXuan/live2DModel@1.0.0/live2d-widget-model-haru/02/assets/haru02.model.json',
        haruto:
            'https://cdn.jsdelivr.net/gh/QiShaoXuan/live2DModel@1.0.0/live2d-widget-model-haruto/assets/haruto.model.json',
        koharu:
            'https://cdn.jsdelivr.net/gh/QiShaoXuan/live2DModel@1.0.0/live2d-widget-model-koharu/assets/koharu.model.json',
        izumi:
            'https://cdn.jsdelivr.net/gh/QiShaoXuan/live2DModel@1.0.0/live2d-widget-model-izumi/assets/izumi.model.json',
        shizuku:
            'https://cdn.jsdelivr.net/gh/QiShaoXuan/live2DModel@1.0.0/live2d-widget-model-shizuku/assets/shizuku.model.json',
        wanko:
            'https://cdn.jsdelivr.net/gh/QiShaoXuan/live2DModel@1.0.0/live2d-widget-model-wanko/assets/wanko.model.json'
      },
      // model的样式
      style: {
        width: WIDTH,
        height: HEIGHT
      },
      modelStyle: MODEL_STYLE,
      // messageBox的样式
      messageStyle: MESSAGE_STYLE
    }
  },
  mounted () {
    this.initBanNiang()
  },
  methods: {
    goHome () {
      if (this.$route.path !== '/') {
        this.$router.push('/')
      }
    },
    hoverGoHome () {
      this.message = '心里的花，我想要带你回家。'
    },
    hoverChangeTheme () {
      this.message = '好吧，希望你能喜欢我的其他小伙伴。'
    },
    hoverMoreInfo () {
      this.message = '想知道关于我的更多信息吗？'
    },
    hoverCloseBanNiang () {
      this.message = '你知道我喜欢吃什么吗？痴痴地望着你。'
    },
    resetMessage () {
      this.message = this.defaultMessage
    },
    changeTheme () {
      const themes = []
      for (var i = 0; i < this.themeName.length; i++) {
        if (this.themeName[i] != this.currentTheme) {
          themes.push(this.themeName[i])
        }
      }
      const randomNum = Math.floor(Math.random() * 8)
      this.currentTheme = themes[randomNum]
      this.initBanNiang()
    },
    closeBanNiang () {
      this.isLoaded = false
      this.displayBanNiang = true
    },
    showBanNiang () {
      this.isLoaded = true
      this.displayBanNiang = false
    },
    initBanNiang () {
      const isMobile = !!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
      if (isMobile) {
        this.isLoaded = false
        return console.log('mobile do not load model')
      }
      if (!window.loadlive2d) {
        const script = document.createElement('script')
        script.innerHTML = live2dJSString
        document.body.appendChild(script)
      }
      // this.style = {
      // width: (150 / 1424) * document.body.clientWidth,
      // height: ((150 / 1424) * document.body.clientWidth) / 0.8
      // }
      var ajax = new XMLHttpRequest()
      ajax.open('get', this.model[this.currentTheme])
      ajax.send()
      ajax.onreadystatechange = function () {
        if (ajax.status == 404) {
          console.log('看板娘的CDN资源加载失败了，请稍后刷新页面重试！')
          document.querySelector('.kanbanniang').style.display = 'none'
        }
      }
      window.loadlive2d(
        'banniang',
        this.model[this.currentTheme]
      )
    }
  }
}
</script>

<style lang="stylus" scoped>
@require './assets/iconfont/iconfont.css'
  .showBanNiang
    position fixed
    right 70px
    bottom 6rem
    background-color rgba(231, 234, 241, 0.5)
    color $accentColor
    width 48px
    height 20px
    padding 10px
    cursor pointer
    border-radius 4px
  .banniang-container
    position fixed
    right 50px
    bottom 100px
    color #00adb5
    .messageBox
      padding 10px
      height 60px
      width 160px
      border-radius 8px
      background-color lighten($accentColor, 50%)
      color $textColor
      opacity 0.5
    .operation
      width 20px
      height 92px
      position fixed
      right 90px
      bottom 65px
      i
        font-size 20px
        cursor pointer
        color lighten($textColor, 50%)
        &:hover
          color lighten($accentColor, 50%)
      .ban-home
        position fixed
        right 90px
        bottom 140px
      .message
        position fixed
        right 90px
        bottom 115px
      .skin
        position fixed
        right 90px
        bottom 90px
      .close
        position fixed
        right 90px
        bottom 65px
      .info
        position fixed
        right 90px
        bottom 40px

    #banniang
      z-index 99999
      pointer-events none
</style>
