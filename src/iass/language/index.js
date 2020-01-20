import Vue from 'vue'
import VueI18n from 'vue-i18n'
import store from '_src/iass/store'
import ElementLocale from 'element-ui/lib/locale'
import userConfig from '_src/utils/userConfig'
const {
  iass: {
    language: { defalut, list }
  }
} = userConfig
Vue.use(VueI18n)

const messages = {}
const importAllVue = require.context(process.env.srcDir, true, /lang.json$/)
importAllVue.keys().map(key => {
  let moduleName = key.slice(2, -10)
  let langs = importAllVue(key)
  for (let key in langs) {
    for (let key2 in langs[key]) {
      if (!messages[key2]) {
        messages[key2] = {}
      }
      if (!messages[key2][moduleName]) {
        messages[key2][moduleName] = {}
      }
      messages[key2][moduleName][key] = langs[key][key2]
    }
  }
})
const importAllLang = require.context(
  'element-ui/lib/locale/lang',
  false,
  /.js$/
)
list.forEach(it => {
  let lang = it.value
  messages[lang] = {
    ...messages[lang],
    ...importAllLang(`./${it.value}.js`).default
  }
})

const i18n = new VueI18n({
  locale: defalut,
  messages
})
setStore()
Vue.mixin({
  methods: {
    $l (key) {
      return this.$t(`${this.$route.path.slice(1)}.${key}`)
    }
  }
})
ElementLocale.i18n((key, value) => i18n.t(key, value))

i18n.getlang = function (v) {
  if (typeof v === 'object') {
    return v[i18n.locale]
  }
  return v
}

export default i18n

function setStore () {
  store.registerModule('lang', {
    state: {
      lang: defalut
    },
    mutations: {
      setLang (state, lang) {
        state.locale = lang
        i18n.locale = lang
      }
    }
  })
}
