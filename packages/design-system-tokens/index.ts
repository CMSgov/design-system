import * as fs from 'fs'
import * as path from 'path'
import * as Types from './tokens/types'

const OUTPUT_DIR = './dist'

function main(): number {
  // first two args are not needed
  let args = process.argv.slice(2)
  if (args.length  <= 0) {
    console.warn('__ token tool arguments required __')
    console.log('usage: index.ts infile output_type')
    console.log('output_type can be one of: sketch, scss')
    return
  }

  const input = args[0]
  const inputExt = path.parse(input).ext
  const inputName = path.parse(input).name

  if (inputExt === '.ts' ) {
    tsToScss(input).then((fd) => {
      fs.writeFile(`${OUTPUT_DIR}/${inputName}`, fd[0], (err): void => {
        if (err) console.error(`There was an issue writing to ${OUTPUT_DIR}/${inputName}: ${err}`)
      })
    })
  }

  return 1
}

async function tsToScss(file: string): Promise<string[]> {
  let c,s
  if (!file) return

  const tsData: Types.Theme = await import(file) 
  for (const k in tsData.color) {
    c =+ `${k}: ${tsData.color[k]}\n`
  }
  for (const k in tsData.spacing) {
    c =+ `${k}: ${tsData.spacing[k]}\n`
  }

  return [c, s]
}

main()
