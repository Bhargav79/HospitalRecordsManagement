
//requiring sequelize ORM and body-parser middleware

const Sequelize = require('sequelize');
var body= require('body-parser');



module.exports = (app)=>{
//connecting to the database
const sequelize = new Sequelize('urgentcare', 'baac9cf9a86a81', '59bbedb3', {
  host: 'us-cdbr-azure-east-c.cloudapp.net',
  dialect: 'mysql',
});


//defining schema
const UrgentCare = sequelize.define('urgentcare', {
  firstname:Sequelize.STRING,
  lastname:Sequelize.STRING,
  dob:Sequelize.DATE,
  phone:Sequelize.INTEGER,
  insurer:Sequelize.STRING,
  insuranceid:Sequelize.STRING
  });

  app.use(body.json());  
  app.use(body.urlencoded({extended:true}));
  app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", " POST, GET");
  res.header("Content-Type", "application/json");

  sequelize.sync().then((app)=>{
      next();
      });    
        app.post('/thanks' , function(req,res){
          
                      console.log(req.body.firstname);
 
                      //storing values to the database
                        UrgentCare.create({
                          firstname:req.body.firstname,
                          lastname:req.body.lastname,
                          insuranceid:req.body.insuranceid,
                          insurer:req.body.insurance,
                          phone:req.body.phone,
                          dob:req.body.dob 
                        });
                     
                        
        
                        res.json({
                            reply:"successfully saved"
                        });
              }); 
    });

  sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
    }).catch(err => {
    console.error('Unable to connect to the database:', err);
    });
 }