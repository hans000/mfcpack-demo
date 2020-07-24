import path from 'path'
import rimraf from 'rimraf'
import { getPaths } from './util'
import progress from 'child_process'

const paths = getPaths(path.resolve(__dirname, 'datapack'))
rimraf.sync(path.resolve('./') + '/dist')

paths.forEach(p => {
    try {
        progress.execSync(`node ./bin/datapack${p}`)
    } catch (error) {
        console.log(error);
    }
})




