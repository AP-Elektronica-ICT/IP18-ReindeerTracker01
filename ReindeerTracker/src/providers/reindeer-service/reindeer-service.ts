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
  getReindeer(id: string): Promise<IReindeer[]>  { 
    return new Promise(resolve => { 
      this.http.get<IReindeer[]>('http://168.235.64.81/Reindeertracker/API/reindeer/list/?userId=1').subscribe(data => { 
        resolve(data); 
      }, err => { 
        console.log(err); 
      }); 
    }); 
  } 
 
  addUser(data) { 
    return new Promise((resolve, reject) => { 
      this.http.post('http://168.235.64.81/Reindeertracker/API/list/?userId=1', JSON.stringify(data)) 
        .subscribe(res => { 
          resolve(res); 
        }, (err) => { 
          reject(err); 
        }); 
    }); 
  } 
 //-------------------------------------------------------------------------------------------------------//
  getDetails( reindeerId:string, ): Promise<IDetails[]>  { 
    return new Promise(resolve => { 
      this.http.get<IDetails[]>('http://168.235.64.81/Reindeertracker/API/reindeer/detail/?reindeerId='+reindeerId+'&limit=5').subscribe(data => { 
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
  getTrackers(userId: string): Promise<ITracker[]>  { 
    return new Promise(resolve => { 
      this.http.get<ITracker[]>('http://168.235.64.81/Reindeertracker/API/trackers/list/?userId=' + userId).subscribe(data => { 
        resolve(data); 
      }, err => { 
        console.log(err); 
      }); 
    }); 
  } 
  checkBeforeAddTracker(serialnumber: number): Promise<ICheckTracker[]>  { 
    return new Promise(resolve => { 
      this.http.get<ICheckTracker[]>('http://168.235.64.81/Reindeertracker/API/trackers/check/?serialnumber=' + serialnumber).subscribe(data => { 
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
 
}