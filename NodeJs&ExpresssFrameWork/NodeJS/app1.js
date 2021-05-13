var fs=require('fs');
var fileread='test.txt';
console.log('Rading file'+fileread+'..');
fs.readFile(fileread,'utf8',function (err,contentFile){
    if(err){
        console.log(err);
    }
    console.log('Returning the value of the as a array:::');
    var acontentFile=contentFile.split(' ');
    console.log(acontentFile);
    
})