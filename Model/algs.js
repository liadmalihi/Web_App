const Line = require('./Line')

class algs {
    constructor() {
        
    }

    static pearson(arr1, arr2, size) {
        return algs.cov(arr1, arr2, size) / ( Math.sqrt(algs.variance(arr1, size)) *  Math.sqrt(algs.variance(arr2, size)));
    }

    static avg(arr, size) {
        let sum = 0;
        //let len = arr.length - 1;
        for (var i = 0; i < size; i++) {
            sum += parseFloat(arr[i]);
        }
        return sum / size;
    }
    
    
    static variance(arr, size) {
        let av = algs.avg(arr, size);
        //let size = arr.length - 1;
        let sum = 0;
        for (var i = 0; i < size; i++) {
            let x = parseFloat(arr[i]);
            sum += (x * x);
        };
        return (sum / size) - (av * av);
    }
    
    static cov(arr1, arr2, size) {
        let av = algs.avg(arr1, size) * algs.avg(arr2, size);
        //let size = arr1.length - 1;
        let sum = 0;
        for (var i = 0; i < size; i++) {
            let y = parseFloat(arr2[i]);
            let x = parseFloat(arr1[i]);
            sum += x * y;
        };
        sum /= size;
        return sum - av; 
    }
    
    
    static linear_reg1(x, y, size) {
        let a = algs.cov(x, y, size) / algs.variance(x, size);
        let b = algs.avg(y, size) - a * algs.avg(x, size);
        return new Line(a, b);
    }
    
    static linear_reg(points, size) {
        let x = [];
        let y = [];
        for (let i = 0; i < size; i++) {
            x.push(parseFloat(points[i].x));
            y.push(parseFloat(points[i].y));
        }
        let a = algs.cov(x, y, size) / algs.variance(x, size);
        let b = algs.avg(y, size) - a * algs.avg(x, size);
        return new Line(a, b);
    }
    
    static dev(p, points, size) {
        let l = algs.linear_reg(points, size);
        return algs.dev(p, l);
    }
    
    static dev(p, l) {
        return Math.abs(p.getY - l.f(p.getX));
    }
    
    static dist(x1, y1, x2, y2) {
        x = (x2 - x1) * (x2 - x1);
        y = (y2 - y1) * (y2 - y1);
        return Math.sqrt(x + y);
    }
}

module.exports = algs