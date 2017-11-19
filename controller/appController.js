var body= require('body-parser');
var https = require('https');
var fs = require('fs');
module.exports = function(app){
   
    const options = {
        hostname: 'apistage.gohealthuc.com',
        port:'1981',
        path: '/v1/eligibility_demo',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authtoken':'ghbhargav5761'
          },  
        "rejectUnauthorized": false,
      };

    app.use(body.json());  
    app.use(body.urlencoded({extended:true}));
    app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", " POST, GET");
    res.header("Content-Type", "application/json");
    
    next();
    });
 

    //POST request to eligilibility api to get patients details
    app.post('/' , function(req,res){

            var apidata = '';
            const request = https.request(options, (response) => {

                console.log("status code: ", response.statusCode);
                console.log("response header: ", response.headers);
                response.on('data', (meta) => {
                    apidata+=meta;
                });

                response.on('end',(err)=>{
                    if(err)
                    console.log(err);
                    fs.writeFile('apidata/sample.json', apidata, function(){
                            console.log("in write block");
                            console.log("before reading");
                            var dummy = require('../apidata/sample.json');
                            console.log("after reading");
                            
                            if(!dummy || dummy.data==null || dummy.data.coverage==null)
                            {
                                var invalid = { reply:"Seems like you are uninsured"}
                                res.json(invalid);
                            }

                            else
                            {
                                console.log(dummy.data.coverage.active);
                                console.log(dummy.data.coverage.copay[1].copayment.amount);
                        
                                var validation = {
                                coverageStatus:dummy.data.coverage.active,
                                copayAmount:dummy.data.coverage.copay[1].copayment.amount 
                                }
                                
                                console.log(validation);
                                res.json(validation);

                            }
                            
                    });
                });
            });

            request.end(JSON.stringify(req.body));
    }); 

}
   
        
     


  











  



