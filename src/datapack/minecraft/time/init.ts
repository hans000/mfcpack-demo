import path from 'path'
import { MFunction, mout } from 'mfcpack';

const mf = new MFunction(__filename)

mf.add('say hello')

mf.create()

export default mout(__filename)