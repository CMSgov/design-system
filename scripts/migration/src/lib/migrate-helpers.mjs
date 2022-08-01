import glob from 'glob';
import chalk from 'chalk';
import fs from 'fs';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import inquirer from 'inquirer';

export const error = (message) => {
  console.log(`${chalk.red('!!')} Error: ${message}`)
}

export const getGlob = (pattern, config) => {
  return new Promise((resolve, reject) => {
    glob(pattern, config, (err, matches) => {
      if (err) reject(err)
      resolve(matches)
    })
  })
}

export const doPatternSearch = async (config) => {
  let res = []
  for (const p of config.patterns) {
    res.push(...await getGlob(p, config.globConfig))
  }
  return res
}

export const getFileContents = (fileList) => {
  const readPromises = fileList.map(async file => {
    return readFile(file, 'utf8')
      .then(data => {
        return { file: file, data: data }
      })
  })
  return Promise.all(readPromises)
}

export const modifyFileContents = (content, expr) => {
  content.map(f => {
    expr.forEach(e =>  {
      let re = new RegExp(e.from, 'g')
      f.data = f.data.replace(re, e.to)
    })
    return f
  })

  const writePromises = content.map(async content => {
    return writeFile(content.file, content.data, 'utf8')
      .catch(err => error(err))
  })

  return Promise.all(writePromises)
}

export const readConfigFile = (file) => {
  return new Promise((resolve, reject) => {
    readFile(file, 'utf8')
      .then(data => {
        resolve(JSON.parse(data))
      })
      .catch(err => reject(err))
  })
}

export const getConfigFileList = (path) => {
  return new Promise((resolve, reject) => {
    readdir(path)
      .then(files => {
        resolve(files)
      })
      .catch(err => reject(err))
  })
}

export const confirmStart = (action) => {
  return new Promise((resolve, reject) => {
    inquirer.prompt([
      {
        type: 'confirm',
        name: 'yesno',
        prefix: `${chalk.red('!!')} Please be sure you are running this in a git repo. ${chalk.red('!!\n!!')} Filesystem changes will occur.                     ${chalk.red('!!\n\n')}${chalk.green('?')}`,
        message: 'Begin search and replace?',
        default: true,
      }])
      .then((choice) => { resolve(choice.yesno) })
      .catch((err) => { reject(err) })
  })
}

export const inquireForFile = (folder, options) => {
  return new Promise((resolve, reject) => {
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
        resolve(readConfigFile(configPath))
      })
      .catch((err) => { reject(err) })
  })
}

export default {
  confirmStart,
  doPatternSearch,
  getConfigFileList,
  getFileContents,
  getGlob,
  inquireForFile,
  readConfigFile,
}

// find . -path "*/.*" -prune -o -name node_modules -prune -o -type f \( -iname \*.jsx -o -iname \*.tsx -o -iname \*.ts -o -iname \*.js \) -print

