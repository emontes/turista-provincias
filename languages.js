const { join } = require('node:path')
const { readdirSync, lstatSync } = require('node:fs')

const defaultLanguage = 'es'

// based on the directories get the language codes
const languages = readdirSync(join(__dirname, 'locales')).filter((fileName) => {
  const joinedPath = join(join(__dirname, 'locales'), fileName)
  const isDirectory = lstatSync(joinedPath).isDirectory()
  return isDirectory
})
// defaultLanguage as first
languages.splice(languages.indexOf(defaultLanguage), 1)
languages.unshift(defaultLanguage)

module.exports = {
  languages,
  defaultLanguage,
}
