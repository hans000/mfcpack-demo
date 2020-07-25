import bar from "./bar";
import { MFunction } from "../../../mcfpack/src";

const mf = new MFunction(__filename)

let flag = false

sayOkNo(flag)
flag = true
sayOkNo(flag)

mf.add(fib(10).map(v => `say ${v}`))
// 调用其他模块
mf.add(bar)

function sayOkNo(flag: boolean) {
    flag ? mf.add('say ok') : mf.add('say no')
}
function fib(num: number) {
    const list: number[] = [1, 1]
    if (num <= 2) {
        return Array.from({ length: num >= 0 ? num : 0 }, () => 1)
    }
    for (let i = 2; i < num; i++) {
        const s = list[list.length - 1] + list[list.length - 2]
        list.push(s)
    }
    return list
}

mf.create()