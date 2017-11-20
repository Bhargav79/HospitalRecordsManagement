import { Component, OnInit, OnDestroy } from '@angular/core';
import { patientInfo } from '../services/app.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';


export class reply{
  coveragestatus:string;
  copay:string;
}


@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[patientInfo]
})
export class AppComponent{

  replies:reply;
  coveragestatus:string;
  amount:string;
  firstname:string;
  lastname:string;
  insuranceid:string;
  dob:string;
  title = 'app';   
  data:string;
    constructor(private patientInfo:patientInfo){
    }

    insurances = ['aetna', 'united_health_care', 'blue_cross', 'blue_shield', 'cigna'];
    patient = {firstname:'', lastname:'', phone:'', dob:'', insurance:'', insuranceid:''};
  

    verify(event)
    {
      event.preventDefault();
      //storing form details
      var details= 
              {
                  member:
                  {
                      first_name:this.patient.firstname,
                      last_name:this.patient.lastname,
                      id:this.patient.insuranceid,
                      birth_date:this.patient.dob
                  },
                  provider:
                  {
                    first_name:"Marty",
                    last_name:"Seeger",
                    npi:"1234567890",
                    trading_partner_id:this.patient.insurance
                  }
              }


        //request to get info
        this.patientInfo.getInfo(details).subscribe(reply=>{
          this.replies=reply;    
          console.log(this.replies);
        });



      var anotherSetDetails= 
      {          
              firstname:this.patient.firstname,
              lastname:this.patient.lastname,
              insuranceid:this.patient.insuranceid,
              insurance:this.patient.insurance,
              phone:this.patient.phone,
              dob:this.patient.dob
          
      }
      
      //request to store data
      this.patientInfo.storeData(anotherSetDetails).subscribe(data=>console.log(data));
    }

    

    send(event)
    {
      event.preventDefault();
       var anotherDetails= 
      {
          
              firstname:this.patient.firstname,
              lastname:this.patient.lastname,
              phone:this.patient.phone,
              dob:this.patient.dob,
              insuranceid:null,
              insurance:null
          
      }
      //request to store form data
      this.patientInfo.storeData(anotherDetails).subscribe(data=>console.log(data));
    }


    

   
}