import path from 'path'
import rimraf from 'rimraf'
import { getPaths, promisify } from './util'
import progress from 'child_process'
import { copy, outputFile } from 'fs-extra'
import initConfig from './lib/initConfig'
import ora from 'ora'
import chalk from 'chalk'

let spinner = ora('开始编译').start();
const domain = path.resolve('./')
const config = initConfig()
const datapackDir = path.join(domain, './src/datapack')
const assetsDir = path.join(domain, './src/assets')

const fnPaths = getPaths(datapackDir, /\.(t|j)s$/)
const assetsPaths = getPaths(assetsDir)
const outDir = config.outDir

const chain: any[] = []
let handle = Promise.resolve();

chain.push(promisify((handle: any) => {
    spinner.text = '清理输入目录'
    rimraf(outDir, (err) => {
        handle(err)
    })
})())
chain.push(promisify((handle: any) => {
    spinner.text = '生成meta文件'
    outputFile(path.join(outDir, 'pack.mcmeta'), JSON.stringify(config.mcmeta, null, 4), handle)
})())
assetsPaths.forEach((p, i) => {
    chain.push(promisify((p: string, i: number, callback: any) => {
        spinner.text = `拷贝json资源文件, ${i + 1}/${assetsPaths.length}`
        copy(path.join(assetsDir, p), path.join(outDir, 'data', p), callback)
    })(p, i))
})
fnPaths.forEach((p, i) => {
    chain.push(promisify((p: string, i: number, callback: any) => {
        spinner.text = `编译mcfunction文件, ${i + 1}/${fnPaths.length}`
        progress.exec(`npx ts-node ${'./src/datapack' + p}`, callback)
    })(p, i))
})
chain.push(promisify((callback: any) => {
    spinner.succeed(`${chalk.greenBright('编译完成！')}`)
    spinner.stop()
    callback()
})())

chain.push(Promise.resolve())

setTimeout(() => {
    while (chain.length) {
        handle = handle.then(chain.shift()).catch((err) => {
            spinner.fail(err)
            spinner.stop()
            return         
        })
    }
}, 0)


