import path from 'path'
import { MFunction, mout } from '../../../mcfpack/src'

const mf = new MFunction(__filename)
const list: number[] = [8, 5, 6, 1, 4]

mf.addComments('for test', 1)
for (let i = 0; i < list.length; i++) {
    mf.add(`say ${list[i]}`)
}

mf.addComments('sort test', 2)
list.sort((a, b) => a - b).forEach(v => mf.add(`say ${v}`))

mf.addComments('测试多行注释'.split(''))

mf.create()

export default mout(__filename)