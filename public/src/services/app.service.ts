import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class patientInfo {
    constructor(private http:Http){
        
    }
    
    //requesting to verify the patient details to the server
    getInfo(details)
    {
        var headers = new Headers();
        headers.append('Content-Type','application/json');
        console.log(JSON.stringify(details));
        return this.http.post('http://localhost:3000',JSON.stringify(details),{headers:headers}).map(res =>{
            console.log(res.json());
               return  res.json();
            });
    }

    //sending post request to the server to store form data
    storeData(patientDetails){
        var headers = new Headers();
        headers.append('Content-Type','application/json');
        console.log(JSON.stringify(patientDetails));
        return this.http.post('http://localhost:3000/thanks',JSON.stringify(patientDetails),{headers:headers}).map(res =>{
                console.log(res.json());
                return res.json();
            });

    }
 
}