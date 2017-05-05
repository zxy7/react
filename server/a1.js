const fs=require("fs")
// const data=fs.readFileSync('example.js')

// console.log(data.toString())
// console.log('end') 

fs.readFile('exaple.js',function(err,data){
    if(err){
      console.log(err.stack);
      return;
   }
    console.log(data.toString())
    
})