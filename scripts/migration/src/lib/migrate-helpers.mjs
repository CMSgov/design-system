import chalk from 'chalk';
import glob from 'glob';
import fs from 'fs';
import inquirer from 'inquirer';

export const getGlob = async (pattern, config) => {
  const globResult = await new Promise((resolve, reject) => {
    return glob( pattern, config, (err, matches) => {
      if (err) return reject(err)
      return resolve(matches)
    })
  })
  return globResult
}

export const doPatternSearch = async (config) => {
  let res = []
  for (const p of config.patterns) {
    res.push(...await getGlob(p, config.globConfig))
  }
  return res
}

export const readConfigFile = async (file) => {
  const configObj = await new Promise((resolve, reject) => {
    return fs.readFile(file, 'utf8', (err, file) => {
      if (err) return reject(err)
      const parsed = JSON.parse(file)
      return resolve(parsed)
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

export const inquireConfirmOrEdit = async (action) => {

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
  doPatternSearch,
  getConfigFiles,
  getGlob,
  inquireForFile,
  readConfigFile,
}

// find . -path "*/.*" -prune -o -name node_modules -prune -o -type f \( -iname \*.jsx -o -iname \*.tsx -o -iname \*.ts -o -iname \*.js \) -print

