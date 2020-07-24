import path from 'path'
import fs from 'fs'

export function getPackName(fileName: string) {
    const result = fileName.slice(fileName.indexOf('datapack' + path.sep) + ('datapack' + path.sep).length)
    const index = result.indexOf(path.sep)
    return result.slice(0, index)
}
export function getRestName(fileName: string) {
    const result = fileName.slice(fileName.indexOf('datapack' + path.sep) + ('datapack' + path.sep).length)
    console.log(result);
    
    return result.slice(0, -3)
}

export function getBareName(fileName: string) {
    return fileName.slice(0, fileName.lastIndexOf('.'))
}

export function getPaths(dir: string, parent = '') {
    const list: string[] = []
    const files = fs.readdirSync(dir)
    files.forEach(file => {
        const p = `${dir}/${file}`
        const stats = fs.statSync(p)
        const full = `${parent}/${file}`
        if (stats.isFile()) {
            if (/\.(t|j)s$/.test(full)) {
                list.push(full)
            }
        } else {
            list.push(...getPaths(p, full))
        }
    })
    return list
}

export function toNormalFunction(filename: string) {
    const packName = getPackName(filename)
    const bareName = path.basename(filename, '.js')
    return `function ${packName}:${bareName}`
}