import McFn from "../../lib/createFn";
import bar from "./bar";
import { getRestName } from "../../util";

const fn = new McFn(getRestName(__filename))

let flag = false

sayYesNo(flag)
// 修改状态
flag = true
sayYesNo(flag)

function sayYesNo(flag: boolean) {
    flag ? fn.add('say ok') : fn.add('say no')
}

// 调用其他模块
fn.add(bar)

fn.create()