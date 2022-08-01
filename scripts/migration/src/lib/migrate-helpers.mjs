import glob from 'glob';
import chalk from 'chalk';
import fs from 'fs';
import inquirer from 'inquirer';

export const getGlob = async (pattern, config) => {
  const globResult = await new Promise((resolve, reject) => {
    return glob(pattern, config, (err, matches) => {
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

export const doFileSearchAndReplace = async (fileList, expr) => {
  const p = expr.map(expr => {
    fileList.map(file => {
      return fs.readFile(file, 'utf8', (err, data) => {
        if (err) return console.log(err)
        var result = data.replace(expr.from, expr.to)

        fs.writeFile(file, result, 'utf8', (err) => {
           if (err) return console.log(err)
        });
      })
    })
  });
  Promise.all(p)
    .then(function(results) {
      console.log(results)
    })
}

export const readConfigFile = async (file) => {
  const configObj = await new Promise((resolve, reject) => {
    return fs.readFile(file, 'utf8', (err, data) => {
      if (err) return reject(err)
      const parsed = JSON.parse(data)
      return resolve(parsed)
    })
  })
  return configObj
}

export const getConfigFileList = async (path) => {
  const fileList = await new Promise((resolve, reject) => {
    return fs.readdir(path, (err, files) => {
      if (err) return reject(err)
      return resolve(files)
    })
  })
  return fileList
}

export const confirmStart = async (action) => {
  const startMatch = await new Promise((resolve, reject) => {
    inquirer.prompt([
      {
        type: 'confirm',
        name: 'yesno',
        prefix: `${chalk.red('!!')} Please be sure you are running this in a git repo. ${chalk.red('!!\n!!')} Filesystem changes will occur.                     ${chalk.red('!!\n\n')}${chalk.green('?')}`,
        message: 'Begin search and replace?',
        default: true,
      }])
      .then((choice) => {
          return resolve(choice.yesno)
      })
      .catch((err) => {
        return reject(err)
      })
  })
  return startMatch
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
  confirmStart,
  doFileSearchAndReplace,
  doPatternSearch,
  getConfigFileList,
  getGlob,
  inquireForFile,
  readConfigFile,
}

// find . -path "*/.*" -prune -o -name node_modules -prune -o -type f \( -iname \*.jsx -o -iname \*.tsx -o -iname \*.ts -o -iname \*.js \) -print

