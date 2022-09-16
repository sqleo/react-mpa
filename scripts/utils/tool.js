const fs = require("fs")
const htmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")
const {MAIN_FILE,MAIN_META }= require("./constant")

const getEntryMeta = () => {
  const dirPackages = path.resolve(__dirname, "../../src/packages")
  const entryMeta = Object.create(null)
  fs.readdirSync(dirPackages).filter(file => {
    const entryPath = path.join(dirPackages,file)
    if (fs.statSync(entryPath)  && fs.existsSync(path.join(entryPath,MAIN_META))) {
      entryMeta[file] = require(path.join(entryPath,MAIN_META))
    }
  })
  return entryMeta
}

const getEntryName = () => {
  const dirPackages = path.resolve(__dirname, "../../src/packages")
  const entry = Object.create(null)
  return fs.readdirSync(dirPackages).map(file => file)
}

const getEntryPath = () => {
  const dirPackages = path.resolve(__dirname, "../../src/packages")
  const entry = Object.create(null)
  fs.readdirSync(dirPackages).filter(file => {
    const entryPath = path.join(dirPackages,file)
    if (fs.statSync(entryPath)) {
      entry[file] = path.join(entryPath,MAIN_FILE)
    }
  })
  return entry
}
const getEntryTemplate = () => {
  const dirPackages = path.resolve(__dirname, "../../src/packages")
  const entryMeta = getEntryMeta()
  const Template = []
  fs.readdirSync(dirPackages).filter(file => {
    const entryPath = path.join(dirPackages,file)
    if (fs.statSync(entryPath)) {
      // entry[file] = path.join(entryPath,MAIN_FILE)
      Template.push(
        new htmlWebpackPlugin({
          template: path.resolve(__dirname, '../../public/index.html'),
          filename: `${file}.html`,
          title: file in entryMeta ? entryMeta[file].title : "" ,
          meta:file in entryMeta ? entryMeta[file].meta : "",
          chunks: ['manifest', 'vendors', file],
        })
      )
    }
  })
  return Template
}
getEntryTemplate()
module.exports = {
  getEntryName,
  getEntryPath,
  getEntryTemplate
}