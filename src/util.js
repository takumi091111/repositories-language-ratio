import '@babel/polyfill'

const inUserPage = () => {
  return document.getElementsByClassName('p-nickname vcard-username d-block').length !== 0
}

const getUserName = () => {
  return inUserPage() ? document.getElementsByClassName('p-nickname vcard-username d-block')[0].innerText : ''
}

const fetchRepoList = async (mode, userName) => {
  const API_BASE_URL = 'https://api.github.com'
  const repoList = await fetch(`${API_BASE_URL}/${mode}/${userName}/repos`)
  return repoList.json()
}

const fetchLanguage = async (url) => {
  const result = await fetch(url)
  const json = await result.json()
  return Object.keys(json)[0]
}

const countLanguage = (langList) => {
  const langSet = new Set(langList)
  return [...langSet].map(item => {
    return {
      language: item !== void 0 ? item : 'Other',
      count: langList.filter(lang => lang === item).length
    }
  })
}

const sortLanguage = (langList) => {
  return langList.sort((a, b) => {
    if( a.count > b.count ) return -1
    if( a.count < b.count ) return 1
    return 0
  })
}

module.exports = {
  getUserName,
  fetchRepoList,
  fetchLanguage,
  countLanguage,
  sortLanguage
}
