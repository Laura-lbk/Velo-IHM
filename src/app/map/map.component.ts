import { Component, OnInit } from '@angular/core';
import { DataService } from '../Service/data.service';
import * as Mapboxgl from 'mapbox-gl';
import {WebService} from '../Service/webservice.service'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  adresses: string[] = [];
  map: Mapboxgl.Map;
  constructor(private dataService: DataService,
    private webservice: WebService) { }

  ngOnInit(): void {
    this.displayMap();
    this.dataService.dataSend.subscribe((data) => {
      this.adresses = data;
      this.dessineTrajet();
      this.getDirections();
    });
  }

  getDirections(){
    this.webservice.get('/directions/v5/mapbox/cycling/49.884402,2.279117;49.871638,2.327950').then( data =>{
      console.log(data);
    })
  }

  displayMap(): void{
    Mapboxgl.accessToken = 'pk.eyJ1IjoicGlsb3h4IiwiYSI6ImNramsyczFyeDVvZmcyc2xncW91YjM1OGYifQ.86MCYfmedADyCr1lcIUC4Q';

    this.map = new Mapboxgl.Map({
        container: 'map-mapbox', // container id
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: [-74.5, 40], // starting position [lng, lat]
        zoom: 5 // starting zoom
    });

    var nav = new Mapboxgl.NavigationControl();
    this.map.addControl(nav, 'bottom-right');

    this.map.addControl(new Mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true,
        showAccuracyCircle: true
    }));

    this.map.addControl(new Mapboxgl.FullscreenControl({
      container: document.querySelector('html')
    }));
  }

  dessineTrajet(): void{
    //TODO
    //Placer le Trajet sur la map en envoyant this.adresses vers l'API
    // Recupérer la reponse de l'API
  }


}
