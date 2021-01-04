import { Component, OnInit } from '@angular/core';
import { DataService } from '../Service/data.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  adresses: string[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.dataSend.subscribe((data) => {
      this.adresses = data;
      this.dessineTrajet();
    });
  }

  displayMap(): void{
    //TODO
    // Récupérer la map de google maps pour l'afficher
    //Inutile si il suffit d'une balise html
  }

  dessineTrajet(){
    //TODO
    //Placer le Trajet sur la map en envoyant this.adresses vers l'API
    // Recupérer la reponse de l'API
  }


}
