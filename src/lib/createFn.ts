import fs from 'fs'
import path from 'path'
import config from '../mc.config'
import fse from 'fs-extra'

export default class McFn {
    private list: string[] = []
    private filename: string = ''

    constructor(filename: string) {
        this.filename = filename
    }
    public add(cmd: string) {
        this.list.push(cmd)
    }
    public addComment(comment: string): void;
    public addComment(comment: string[]): void;
    public addComment(comment: string | string[]) {
        if (Array.isArray(comment)) {
            this.list.push(...comment.map(v => `# ${v}`))
        } else {
            this.list.push(`# ${comment}`)
        }
    }
    public size() {
        return this.list.length
    }
    public create() {
        const p = path.join(config.output.path, this.filename + '.mcfunction')
        fse.outputFile(p, this.list.join('\n'), (err) => {
            console.log(err);
        })
    }
}