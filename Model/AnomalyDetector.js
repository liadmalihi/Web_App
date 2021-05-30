const correlatedFeatures = require('./correlatedFeatures')
const algs = require('./algs')
const Line = require('./Line')

class AnomalyDetector {
    constructor() {
        this.threshold = 0.9
    }
    toPoints(arr_x, arr_y) {
        let points = []
        let size = arr_x.length
        for (let j = 0; j < size; j++) {
            points.push({x: parseFloat(arr_x[j]), y: parseFloat(arr_y[j])})
        }
        return points
    }
    findThreshold(/*Points array */ ps, len, /* Line*/ rl) {
        let max=0
        for (let j = 0; j < len; j++) {
            let d = Math.abs(parseFloat(ps[j].y) - rl.f(parseFloat(ps[j].x)))
            if (d > max) {
                max = d
            }
        }
        return max
    }    
    learnNormal(ts) {
        let cf = []
        let atts = ts.gettAttributes()
        let len = ts.getRowSize()
        let coll = ts.getColSize()
        let vals = new Array(atts.length)  
        for(let i = 0; i < coll; i++) {
            vals[i] = []
        }  
        for(let i = 0; i < coll; i++) {
            let x = ts.getAttributeData(atts[i])
            for(let j = 0; j < len; j++) {
                vals[i].push(parseFloat(x[j]))
            }
        }
        for(let i = 0; i < coll; i++){
            let f1 = atts[i]
            let max = 0
            let jmax = 0
            for(let j = i + 1; j < coll; j++) {
                let p = Math.abs(algs.pearson(vals[i], vals[j], len - 1));
                if(p > max) {
                    max = p;
                    jmax = j;
                }
            }
            let f2 = atts[jmax];
            let ps = this.toPoints(ts.getAttributeData(f1), ts.getAttributeData(f2));
    
            if(max > this.threshold) {
                
                let c = new correlatedFeatures()
                c.feature1 = f1
                c.feature2 = f2
                c.corrlation = max
                c.lin_reg = algs.linear_reg(ps,len - 1);
                c.threshold = this.findThreshold(ps,len - 1,c.lin_reg) * 1.1 // 10% increase
                cf.push(c)
            }
    
        } 
        return cf   
    }
    detect(ts, cf) {
        let anomalys = new Map()
        let len = cf.length
        for(let i = 0; i < len; i++) {
            let c = cf[i]
            let x = ts.getAttributeData(c.feature1)
            let y = ts.getAttributeData(c.feature2)
            let val = this.detectReg(x, y, c.threshold , c.lin_reg);
            if(val.length != 0){
                anomalys.set(c.feature1 + ' <-> ' + c.feature2, val);
            }
        }
        return anomalys
    }
    detectReg(arr1, arr2, threshold, t_line) {
        let anom = [];
        let start = -2;
        let end = -2;
        let len = arr1.length - 1;
        for(let i = 0; i < len; i++) {
            if (Math.abs(parseFloat(arr2[i]) - t_line.f(parseFloat(arr1[i]))) > threshold) {
                if (start==-2){
                    start=i;
                    end=i;
                }else{
                    if(i==end+1){
    
                        end=i;
                    }else{
                        anom.push([start + 1, end + 1]);
                        start=i;
                        end=i;
                    }
                }
            }
        }
        if(end != -2){
            anom.push([start + 1, end + 1]);
        }
        
        return anom;
    }
    
    
}

module.exports = AnomalyDetector