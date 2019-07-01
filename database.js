var xlsx = require('node-xlsx');
var fs = require('fs');
var obj = xlsx.parse(__dirname + '/database.xls');
var rows = [];
var writeStr = "";
var database={}

for(var i = 0; i < obj[0].data.length; i++)
{
    var res={}
    var row = obj[0].data[i];
    for(var j=0;j<row.length;j++)
    {
        res={
            titre : row[0],
            isbn : row[1],
            auteur : row[2],
            classif : row[3],
            code : row[4],
            public : row[5],
            cote : row[6],
            support : row[7]
            }
        if(row[0] && row[1] && row[2] && row[3] && row[4] && row[5] && row[6] && row[7])
        {
            database[res.code]=res
        }
    }
}
module.exports=database;