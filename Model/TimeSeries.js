class TimeSeries {
    row_l = -1
    col_l = -1
    constructor(mapData) {
        this.data = mapData
    }
    gettAttributes() {
        let x = this.data
        let arr = []
        let i = 0
        for (let [key, value] of x.entries()) {
            arr.push(key)
            i++
        }
        this.col_l = i
        return arr
    }
    getColSize() {
        if (this.col_l != -1) {
            return this.col_l
        }
        let i = 0
        for (let [key, value] of this.data.entries()) {
            i++
        }
        this.col_l = i
        return i
    }
    getRowSize() {
        if (this.row_l != -1) {
            return this.row_l
        }
        for (let [key, value] of this.data.entries()) {
            this.row_l = value.length
            return this.row_l
        }
    }
    getAttributeData(s) { 
        return this.data.get(s)
    }
}
module.exports = TimeSeries