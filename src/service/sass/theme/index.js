import store from 'service/iass/store'
import userConfig from 'service/userConfig'
const {
  sass: {
    theme: { defalut, list }
  }
} = userConfig

let selectTheme = localStorage.theme || defalut

const importAllVue = require.context(process.env.themeDir, true, /index.css$/)
const themeMap = {}

themeMap[selectTheme] = importAllVue(`./${selectTheme}/index.css`)
themeMap[selectTheme].use()
setStore()

function setStore () {
  store.registerModule('theme', {
    state: {
      theme: selectTheme,
      list
    },
    mutations: {
      setTheme (state, theme) {
        themeMap[state.theme].unuse()
        state.theme = theme
        if (!themeMap[theme]) {
          themeMap[theme] = importAllVue(`./${theme}/index.css`)
        }
        themeMap[theme].use()
        localStorage.theme = theme
      }
    }
  })
}
