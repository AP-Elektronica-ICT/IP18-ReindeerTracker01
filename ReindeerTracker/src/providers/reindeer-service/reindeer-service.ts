import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
import 'rxjs/add/operator/map'; 
 
@Injectable() 
export class ReindeerServiceProvider { 
 
  constructor(public http: HttpClient) { 
  } 
 
  getUsers() { 
    return new Promise(resolve => { 
      this.http.get('https://www.disite.be/Reindeertracker/API/reindeer/list/?userId=1').subscribe(data => { 
        resolve(data); 
      }, err => { 
        console.log(err); 
      }); 
    }); 
  } 
 
  addUser(data) { 
    return new Promise((resolve, reject) => { 
      this.http.post('https://www.disite.be/Reindeertracker/API/list/?userId=1', JSON.stringify(data)) 
        .subscribe(res => { 
          resolve(res); 
        }, (err) => { 
          reject(err); 
        }); 
    }); 
  } 
 
}