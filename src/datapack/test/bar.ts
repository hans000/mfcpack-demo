import McFn from "../../lib/createFn";
import { toNormalFunction, getRestName } from "../../util";

const fn = new McFn(getRestName(__filename))


const list: number[] = [8, 5, 6, 1, 4]

fn.addComment('for test')
for (let i = 0; i < list.length; i++) {
    fn.add(`say ${list[i]}`)
}

fn.addComment('sort test')
list.sort((a, b) => a - b).forEach(v => fn.add(`say ${v}`))



fn.create()

export default toNormalFunction(__filename)