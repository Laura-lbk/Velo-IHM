import { Component, OnInit } from '@angular/core';
import { DataService } from '../Service/data.service';

@Component({
  selector: 'app-denivele',
  templateUrl: './denivele.component.html',
  styleUrls: ['./denivele.component.css']
})
export class DeniveleComponent implements OnInit {

  adresses: string[] = [];
  showDenivele: boolean = false;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.dataSend.subscribe((data) => {
      this.adresses = data;
      this.calculeDenivelé();
    });
  }

  calculeDenivelé(){
    //TODO
    //Générer un graphe de dénivelé avec les adresses depuis l'API google

    //Affichage des Resultats
    this.showDenivele = true;
  }


}
