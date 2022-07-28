import fs from 'fs';
import inquirer from 'inquirer';

export const readConfigFile = async (file) => {
  const configObj = await new Promise((resolve, reject) => {
    return fs.readFile(file, 'utf8', (err, file) => {
      if (err) return reject(err)
      return resolve(JSON.parse(file))
    })
  })
  return configObj
}

export const getConfigFiles = async (path) => {
  const fileList = await new Promise((resolve, reject) => {
    return fs.readdir(path, (err, files) => {
      if (err) return reject(err)
      return resolve(files)
    })
  })
  return fileList
}

export const inquireForFile = async (folder, options) => {
  const fileInquiryData = await new Promise((resolve, reject) => {
    inquirer.prompt([
      {
        type: 'list',
        name: 'file',
        choices: options,
        pageSize: 4,
        prefix: `\nChoose a migration configuration to run from ${folder}\n`,
      }])
      .then((choice) => {
        const configPath = `${folder}/${choice['file']}`
        return resolve(readConfigFile(configPath))
      })
      .catch((err) => {
        return reject(err)
      })
  })
  return fileInquiryData
}

export default {
  getConfigFiles,
  inquireForFile,
  readConfigFile,
}

// let config = argv.file ?? ''


// find all javascript, ts, jsx, tsx files
// return list of files which contain more than 5 newlines
// grep reduced list for 
//
// find . -path "*/.*" -prune -o -name node_modules -prune -o -type f \( -iname \*.jsx -o -iname \*.tsx -o -iname \*.ts -o -iname \*.js \) -print
// // import chalk from 'chalk';
// import glob from 'glob';

