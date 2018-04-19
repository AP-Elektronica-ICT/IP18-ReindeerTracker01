import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
import 'rxjs/add/operator/map'; 
import { IReindeer } from '../../pages/home/home';
import { IDetails } from '../../pages/detail/detail';
import { ITracker, ICheckTracker } from '../../pages/trackers/trackers';


 
@Injectable() 
export class ReindeerServiceProvider { 
 
  constructor(public http: HttpClient) { 
    
  } 
 //-------------------------------------------------------------------------------------------------------//
  getReindeer(hash: string): Promise<IReindeer[]>  { 
    return new Promise(resolve => { 
      this.http.get<IReindeer[]>('http://168.235.64.81/Reindeertracker/API/reindeer/list/?hash='+hash).subscribe(data => { 
        resolve(data); 
      }, err => { 
        console.log(err); 
      }); 
    }); 
  } 
 

 //-------------------------------------------------------------------------------------------------------//
  getDetails( reindeerId:string, lastLocRange:number, hash: string ): Promise<IDetails[]>  { 
    return new Promise(resolve => { 
      this.http.get<IDetails[]>('http://168.235.64.81/Reindeertracker/API/reindeer/detail/?reindeerId='+reindeerId+'&limit=' + lastLocRange + '&hash=' + hash).subscribe(data => { 
        resolve(data); 
      }, err => { 
        console.log(err); 
      }); 
    }); 
  } 
 
  setDetails(data) { 
    return new Promise((resolve, reject) => { 
      this.http.post('http://168.235.64.81/Reindeertracker/API/reindeer/detail/?reindeerId=1&limit=5', JSON.stringify(data)) 
        .subscribe(res => { 
          resolve(res); 
        }, (err) => { 
          reject(err); 
        }); 
    }); 
  } 
  
 //-------------------------------------------------------------------------------------------------------//
  getTrackers(hash: string): Promise<ITracker[]>  { 
    return new Promise(resolve => { 
      this.http.get<ITracker[]>('http://168.235.64.81/Reindeertracker/API/trackers/list/?hash=' + hash).subscribe(data => { 
        resolve(data); 
      }, err => { 
        console.log(err); 
      }); 
    }); 
  } 
  checkBeforeAddTracker(serialnumber: number, hash: string): Promise<ICheckTracker[]>  { 
    return new Promise(resolve => { 
      this.http.get<ICheckTracker[]>('http://168.235.64.81/Reindeertracker/API/trackers/check/?serialnumber=' + serialnumber + '&hash=' + hash).subscribe(data => { 
        resolve(data); 
      }, err => { 
        console.log(err); 
      }); 
    }); 
  } 
 
  addTracker(data) { 
    return new Promise((resolve, reject) => { 
      this.http.post('http://168.235.64.81/Reindeertracker/API/trackers/add/', JSON.stringify(data)) 
        .subscribe(res => { 
          resolve(res); 
        }, err => { 
          console.log(err) 
        }); 
    }); 
  } 

  assignTracker(data) { 
    return new Promise((resolve, reject) => { 
      this.http.post('http://168.235.64.81/Reindeertracker/API/trackers/assign/', JSON.stringify(data)) 
        .subscribe(res => { 
          resolve(res); 
        }, err => { 
          console.log(err) 
        }); 
    }); 
  } 

  deleteTracker(data) { 
    return new Promise((resolve, reject) => { 
      this.http.post('http://168.235.64.81/Reindeertracker/API/trackers/delete/', JSON.stringify(data)) 
        .subscribe(res => { 
          resolve(res); 
        }, err => { 
          console.log(err) 
        }); 
    }); 
  }

  unassignTracker(data) { 
    return new Promise((resolve, reject) => { 
      this.http.post('http://168.235.64.81/Reindeertracker/API/trackers/unassign/', JSON.stringify(data)) 
        .subscribe(res => { 
          resolve(res); 
        }, err => { 
          console.log(err) 
        }); 
    }); 
  }
  //-------------------------------------------------------------------------------------------------------//

  addReindeer(data) { 
    return new Promise((resolve, reject) => { 
      this.http.post('http://168.235.64.81/Reindeertracker/API/reindeer/add/', JSON.stringify(data)) 
        .subscribe(res => { 
          resolve(res); 
        }, err => { 
          console.log(err) 
        }); 
    }); 
  } 

  deleteReindeer(data) { 
    return new Promise((resolve, reject) => { 
      this.http.post('http://168.235.64.81/Reindeertracker/API/reindeer/delete/', JSON.stringify(data)) 
        .subscribe(res => { 
          resolve(res); 
        }, err => { 
          console.log(err) 
        }); 
    }); 
  }

  login(data) { 
    return new Promise((resolve, reject) => { 
      this.http.post('http://168.235.64.81/Reindeertracker/API/signin/', JSON.stringify(data),) 
        .subscribe(res => { 
          resolve(res); 
        }, err => { 
          console.log(err) 
        }); 
    }); 
  }

  register(data) {  
    return new Promise((resolve, reject) => {  
      this.http.post('http://168.235.64.81/Reindeertracker/API/signup/', JSON.stringify(data),)  
        .subscribe(res => {  
          resolve(res);  
        }, err => {  
          console.log(err)  
        });  
    });  
  } 

  changePassword(data) { 
    return new Promise((resolve, reject) => { 
      this.http.post('http://168.235.64.81/Reindeertracker/API/changePassword/', JSON.stringify(data),) 
        .subscribe(res => { 
          resolve(res); 
        }, err => { 
          console.log(err) 
        }); 
    }); 
  }

  changeEmail(data) { 
    return new Promise((resolve, reject) => { 
      this.http.post('http://168.235.64.81/Reindeertracker/API/changeEmail/', JSON.stringify(data),) 
        .subscribe(res => { 
          resolve(res); 
        }, err => { 
          console.log(err) 
        }); 
    }); 
  }
 
}