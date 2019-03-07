import Vue from 'vue'
import Ratio from './components/Ratio'
import '@babel/polyfill'
import { getUserName, fetchRepoList, fetchLanguage, countLanguage, sortLanguage } from './util'

const main = () => {
  // .h-card に #ratio を追加する
  const hcard = document.getElementsByClassName('h-card')[0]
  const ratio = document.createElement('div')
  const ratioClasses = ['border-top', 'border-gray-light', 'py-3']
  ratio.setAttribute('id', 'ratio')
  hcard.appendChild(ratio)

  new Vue({
    el: '#ratio',
    components: { Ratio },
    data () {
      return { repoCount: 0, langList: [] }
    },
    created: async function () {
      const userName = getUserName()
      // リポジトリ一覧の取得
      const repoList = await fetchRepoList('users', userName)
      this.repoCount = repoList.length
      // 各リポジトリから言語を抽出
      const langUrlList = repoList.map(repo => repo.languages_url)
      const langList = await Promise.all(langUrlList.map(async url => await fetchLanguage(url)))
      // カウント
      this.langList = countLanguage(langList)
      // 降順にソート
      this.langList = sortLanguage(this.langList)
    },
    computed: {
      // 割合計算(適当)
      calcRatio: function () {
        return this.langList.map(item => {
          return {
            language: item.language,
            value: Math.round((item.count / this.repoCount) * 100)
          }
        })
      }
    },
    template: `<ratio id="ratio" class="${ratioClasses.join(' ')}" :items="calcRatio" />`
  })
}

main()
