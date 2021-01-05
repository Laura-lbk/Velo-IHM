import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class WebService {


  constructor(private http: HttpClient) {
  }

  get(chemin){
    return new Promise((resolve)=>{
      resolve(this.http.get(chemin));
    })
  }

}
