//iana spellings that title-casing alone gets wrong, mostly legacy names
const spellings = [
  'ACT', 'CET', 'EET', 'EST', 'GB', 'HST', 'LHI', 'MET', 'MST', 'NSW', 'NZ', 'PRC', 'ROC', 'ROK',
  'UCT', 'US', 'WET', 'CST6CDT', 'EST5EDT', 'MST7MDT', 'PST8PDT', 'GMT0', 'GMT+0', 'GMT-0',
  'GB-Eire', 'NZ-CHAT', 'W-SU', 'BajaNorte', 'BajaSur', 'ComodRivadavia', 'DeNoronha',
  'DumontDUrville', 'EasterIsland', 'Knox_IN', 'McMurdo', 'Port-au-Prince'
]
const special = new Map(spellings.map(w => [w.toLowerCase(), w]))

//iana codes are case-sensitive, technically
const titleCase = str => {
  str = str[0].toUpperCase() + str.substr(1)
  str = str.replace(/[/_-]([a-z])/gi, s => {
    return s.toUpperCase()
  })
  str = str.replace(/_(of|es)_/i, (s) => s.toLowerCase())
  str = str.replace(/\/gmt/i, '/GMT')
  str = str.replace(/\/utc/i, '/UTC')
  if (str === 'Utc') {
    str = 'UTC'
  }
  return str.split('/').map(part => special.get(part.toLowerCase()) || part).join('/')
}
export default titleCase
