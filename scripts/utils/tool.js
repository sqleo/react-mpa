const fs = require("fs")
const htmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")
const {MAIN_FILE} = require("./constant")


const getEntryPath = () => {
  const dirPackages = path.resolve(__dirname, "../../src/packages")
  const entry = Object.create(null)
  fs.readdirSync(dirPackages).filter(file => {
    const entryPath = path.join(dirPackages,file)
    if (fs.statSync(entryPath)) {
      entry[file] = path.join(entryPath,MAIN_FILE)
    }
  })
  console.log(entry)
  return entry
}
const getEntryTemplate = () => {
  const dirPackages = path.resolve(__dirname, "../../src/packages")
  const Template = []
  fs.readdirSync(dirPackages).filter(file => {
    const entryPath = path.join(dirPackages,file)
    if (fs.statSync(entryPath)) {
      // entry[file] = path.join(entryPath,MAIN_FILE)
      Template.push(
        new htmlWebpackPlugin({
          template: path.resolve(__dirname, '../../public/index.html'),
          filename: `${file}.html`,
          chunks: ['manifest', 'vendors', file],
        })
      )
    }
  })
  return Template
}
getEntryTemplate()
module.exports = {
  getEntryPath,
  getEntryTemplate
}