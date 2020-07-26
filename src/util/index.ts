export function padQuote(value: string) {
    return value.toString().includes(' ') ? `"${value}"` : value
}

export function stringify(data: any) {
    if (data === null || data === undefined) {
        return ''
    }
    if (Array.isArray(data)) {
        const result = data.reduce((s, v) => {
            s += (typeof v === 'object' ? stringify(v) : padQuote(v)) + ','
            return s
        }, '')
        return `[${result.slice(0, -1)}]`
    }
    if (typeof data === 'object') {
        const result = Object.keys(data).reduce((s, k) => {
            const v = data[k]
            s += `${k}:${typeof v === 'object' ? stringify(v) : padQuote(v)},`
            return s
        }, '')
        return `{${result.slice(0, -1)}}`
    }
    return data
}