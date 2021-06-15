const http = require("http");
const fs =require('fs');
var requests = require("requests");

const homeFile = fs.readFileSync("home.html" , "utf-8");

const replaceValue = (tempVal, orgval)=>{
     let temperature =tempVal.replace("{%tempval%}",orgval.temp);
     temperature =tempVal.replace("{%tempmin%}",orgval.main.temp_min);
     temperature =tempVal.replace("{%tempmax%}",orgval.main.temp_max);
     temperature =tempVal.replace("{%location%}",orgval.name);
     temperature =tempVal.replace("{%country%}",orgval.sys.country);
    return  temperature;
};

const server = http.createServer((req, res) => {
    if (req.url ="/") {
        requests (
            "https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=e0f616ed260035efae46886d7a0b8060"
            )
        .on("data",(chunk) =>{
            const objData = JSON.parse(chunk);
            const arrData = [objData];
            // console.log(objData.main.temp)
            const realTimeData = arrData.map((val) =>  replaceValue(homeFile, val))
            .join("");
                // console.log(val.main.temp);
                console.log(realTimeData);
                
            })
        
        .on("end",(err) => {
            if(err) return console.log("connection closed due to error",err);
            res.end();

        });
    }
});

server.listen(3000, "127.0.0.1");



        
    
    
