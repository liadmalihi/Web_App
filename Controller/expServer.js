const express = require('express');
const fileUpload = require('express-fileupload');
//const anomaly = require('../Model/Anomaly');
//const Alg_Mod = require('../Model/model');
//let alg_model = new Alg_Mod();

const AnomalyDetector = require('../Model/AnomalyDetector')
const HybridDetector = require('../Model/HybridDetector')
const TimeSeries = require('../Model/TimeSeries')

const app = express()
app.use(express.urlencoded({
    extended: false
}))
app.use(fileUpload())
app.use(express.static('../View'))
app.get("/", (req, res) => {
    res.sendFile("./index.html")
})

//returns JSON
app.post("/api/server", (req, res) => {
    let jsonObject= getAnomaly(req.body.Algoritem,req.files.learn_file,req.files.test_file);
    res.write(JSON.stringify(jsonObject)) ;
    res.end()
})


//returns html
app.post("/api/detect", (req, res) => {
    let jsonObject= getAnomaly(req.body.Algoritem,req.files.learn_file,req.files.test_file);
    let myTable="<style>\ntable {\n"+
        "border-collapse: ;\n"+
        "width: 100%;}\n"+
      
      "th, td {\n"+
        "text-align: left;\n"+
        "padding: 8px;}\n"+
      
      "tr:nth-child(even){background-color: #ffffff}\ntr:nth-child(odd){background-color: #fafafa96}\nth {\nbackground-color: #dd93f3;\ncolor: white;\n}\n</style>";
    myTable+= "<table style=\"width:100%\">\n";
    myTable+="<tr>\n<th>Feature</th>\n<th>Anomalies</th>\n";
    for (var p in jsonObject) {
        let times="";
        myTable+="<tr>\n";
        if( jsonObject.hasOwnProperty(p) ) {
            for(let [start,end] of jsonObject[p]){
                times+=start.toString()+"-"+end.toString()+",";
            }
            myTable += "<td>"+p+"</td>\n";
            myTable+="<td>"+times+"</td>\n";
        } 
        myTable+="</tr>\n";
      } 
    res.send(myTable) ;
})


function getAnomaly(type, learn,test){
    if(learn && test) {
        if (type == 'hybrid') {

        }
        let mapTrain = toMap(learn);
        let ts = new TimeSeries(mapTrain)
        let cf 
        let mapTest = toMap(test);
        let tdetect = new TimeSeries(mapTest)
        let anomaly 
        if (type == 'hybrid') {
            let ad = new AnomalyDetector();
            cf = ad.learnNormal(ts)
            anomaly = ad.detect(tdetect, cf)
        } else {
            let hd = new HybridDetector();
            cf = hd.learnNormal(ts)
            anomaly = hd.detect(tdetect, cf)
        }
        //let anomaly = alg_model.detect(mapTest, type, corr_f);
        let jsonObject = {};  
        anomaly.forEach((value, key) => {  
            jsonObject[key] = value  
        }); 
        return jsonObject;
    }
}


function toMap(fileTrain) {
    let tmp1 = fileTrain.data.toString();
    let allRows = tmp1.split(/\r?\n|\r/);
    let Csize = allRows.length;

    mapData = new Map();

    let rows = allRows[0].split(',');
    let Rsize = rows.length;
    for (let i = 0; i < Rsize; i++) {
         mapData.set(rows[i], new Array());
    }
    for (let i = 1; i < Csize; i++) {
        let arr = allRows[i].split(',');
        for (let j = 0; j < Rsize; j++) {
            mapData.get(rows[j]).push(parseFloat(arr[j]));
        }
    }
    return mapData;
}
app.listen(8080)