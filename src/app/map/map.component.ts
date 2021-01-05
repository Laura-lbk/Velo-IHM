import { Component, OnInit } from '@angular/core';
import { DataService } from '../Service/data.service';
import * as Mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  adresses: string[] = [];
  map: Mapboxgl.Map;
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.displayMap();
    this.dataService.dataSend.subscribe((data) => {
      this.adresses = data;
      this.dessineTrajet();
    });
  }

  displayMap(): void{

    Mapboxgl.accessToken = 'pk.eyJ1IjoicGlsb3h4IiwiYSI6ImNramsyczFyeDVvZmcyc2xncW91YjM1OGYifQ.86MCYfmedADyCr1lcIUC4Q';

    this.map = new Mapboxgl.Map({
        container: 'map-mapbox', // container id
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: [-74.5, 40], // starting position [lng, lat]
        zoom: 5 // starting zoom
    });
  }

  dessineTrajet(){
    //TODO
    //Placer le Trajet sur la map en envoyant this.adresses vers l'API
    // Recupérer la reponse de l'API
  }


}
