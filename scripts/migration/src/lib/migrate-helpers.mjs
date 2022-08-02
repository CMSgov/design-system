import glob from 'glob';
import chalk from 'chalk';
import path from 'path';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import inquirer from 'inquirer';

export const error = (message) => {
  console.log(`${chalk.red('!!')} Error: ${message}`)
  process.exit(1)
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

export const getAllFileContents = (fileList) => {
  const readPromises = fileList.map(async file => {
    return readFile(file, 'utf8')
      .then(data => {
        return { file: file, data: data, matches: 0 }
      })
  })
  return Promise.all(readPromises)
}

export const modifyFileContents = async (content, expr) => {
  // filter out items with less than 3 newlines, likely compressed files
  content.filter(f => {
    return (f.data.match(/[\n\r]/g) || []).length > 3
  })
  .map(f => {
    expr.forEach(e =>  {
      let re = new RegExp(e.from, 'g')
      f.data = f.data.replace(re, () => {
          f.matches++
          return e.to
        })
    })
    return f
  })

  const writePromises = content.map(async content => {
    if (content.matches > 0) {
      return writeFile(content.file, content.data, 'utf8')
        // add a percentage bar complete
        .then(() => {
          return { file: content.file, matches: content.matches }
        })
        .catch(err => error(err))
    } else {
      return { file: content.file, matches: 0 }
    }
  })

  return await Promise.all(writePromises)
    .then((results) => {
      results.forEach(result => {
        if (result.matches > 0) {
          // gives a shorter name
          const shortname = path.relative(process.cwd(), result.file)
          console.log(`${chalk.green('++')} ${shortname}${chalk.gray(',')} ${chalk.whiteBright(result.matches)} changes`)
        }
      })
    })
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

export const confirmStart = () => {
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
  getAllFileContents,
  getGlob,
  inquireForFile,
  readConfigFile,
}

// find . -path "*/.*" -prune -o -name node_modules -prune -o -type f \( -iname \*.jsx -o -iname \*.tsx -o -iname \*.ts -o -iname \*.js \) -print

