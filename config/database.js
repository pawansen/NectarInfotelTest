/* Mysql package include */
var mysql=require('mysql');

var connectionPool=mysql.createConnection({
   host:'localhost',
   user:'root',
   password:'root',
   database:'NectarInfotelTest'
 });

connectionPool.connect(function(error){
   if(!!error){
     console.log(error);
   }else{
     console.log('Successfully Database Connected!:)');
   }
 }); 

module.exports = connectionPool; 