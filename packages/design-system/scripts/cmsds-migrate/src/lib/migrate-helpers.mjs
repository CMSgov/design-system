import chalk from 'chalk';
import { globby } from 'globby';
import inquirer from 'inquirer';
import path from 'path';
import { readdir, readFile, writeFile } from 'node:fs/promises';

// confirm prompt for starting operations, display warning and y/n dialog
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
      .then(choice => { resolve(choice.yesno) })
      .catch(err => { reject(err) })
  })
}

// return array of all globby pattern matches in one level
export const doPatternSearch = async (config) => {
  let res = []
  for (const p of config.patterns) {
    res.push(...await getGlob(p, config.globbyConfig).catch(err => error('doPatternSearch: '+err)))
  }
  return res
}

// error and quit
export const error = (message) => {
  console.log(`${chalk.red('!!')} Error: ${message}\n`)
  process.exit(1)
}

// read file contents of all matched files, return filename and data, default matches (0)
export const getAllFileContents = (fileList, cwd) => {
  const readPromises = fileList.map(async file => {
    file = cwd + path.sep + file;
    return readFile(file, 'utf8')
      .then(data => {
        return { file: file, data: data, matches: 0 }
      }).catch(err => error('getAllFileContents: '+err))
  })
  return Promise.all(readPromises)
}

// return list of files from path
export const getConfigFileList = (path) => {
  return new Promise((resolve, reject) => {
    readdir(path)
      .then(files => {
        resolve(files)
      })
      .catch(err => reject(err))
  })
}

// returns globby promise based on search pattern and configuration
// https://github.com/sindresorhus/globby
export const getGlob = (pattern, config) => {
  return new Promise((resolve, reject) => {
    globby(pattern, config)
      .then(matches => resolve(matches))
      .catch(err => reject(err))
  })
}

// display list of configuration files retreived by readConfigFile
export const inquireForFile = (folder, options) => {
  return new Promise((resolve, reject) => {
    inquirer.prompt([
      {
        type: 'list',
        name: 'file',
        choices: options,
        pageSize: 4,
        prefix: `\n${chalk.green('?')} Choose a migration configuration to use:\n`,
      }])
      .then(choice => {
        const configPath = `${folder}/${choice.file}`
        resolve(readConfigFile(configPath))
      })
      .catch(err => { reject(err) })
  })
}

// for each expression (string.replace(from, to)) iterate over each file and make
// changes where a match was found. Records number of matches per file. 
// @TODO: could probably be sped up but it already seems pretty fast.
export const modifyFileContents = async (content, expr) => {
  // filter out files with less than 3 newlines, likely compressed/minified files
  content.filter(f => {
    return (f.data.match(/[\n\r]/g) || []).length > 3
  })
  .map(f => {
    expr.forEach(e =>  {
      let re = new RegExp(e.from, 'gi')
      f.data = f.data.replace(re, (match) => {
          f.matches++
          return match.replace(re, e.to)
        })
    })
    return f
  })

  // promise map for writing file to the FS
  const writePromises = content.map(async content => {
    if (content.matches > 0) {
      return writeFile(content.file, content.data, 'utf8')
        .then(() => {
          return { file: content.file, matches: content.matches }
        })
        .catch(err => error('writePromises: '+err))
    } else {
      return { file: content.file, matches: 0 }
    }
  })

  // write out list of files that changed and how many changes were made
  return await Promise.all(writePromises)
    .then((results) => {
      results.forEach(result => {
        if (result.matches > 0) {
          // gives a shorter name
          const shortname = path.relative(process.cwd(), result.file)
          console.log(`${chalk.yellow('>>')} ${shortname}${chalk.gray(',')} ${chalk.whiteBright(result.matches)} changes`)
        }
      })
    })
}

// read configuration file and return array with data and config filename
export const readConfigFile = (file) => {
  return new Promise((resolve, reject) => {
    readFile(file, 'utf8')
      .then(data => {
        resolve([JSON.parse(data), path.basename(file)])
      })
      .catch(err => reject(err))
  })
}

export default {
  confirmStart,
  doPatternSearch,
  error,
  getAllFileContents,
  getConfigFileList,
  getGlob,
  inquireForFile,
  modifyFileContents,
  readConfigFile,
}
