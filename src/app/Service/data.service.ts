import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  adresses: string[] = [];
  @Output() dataSend = new EventEmitter<any>();

  constructor() {
  }

  send(adresseTab) {
    this.dataSend.emit(adresseTab);
  }

}
