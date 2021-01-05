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

    this.initRechercheAdresse();
  }

  dessineTrajet(): void{
    //TODO
    //Placer le Trajet sur la map en envoyant this.adresses vers l'API
    // Recupérer la reponse de l'API
  }

  initRechercheAdresse(): void{

    var coordinatesGeocoder = function (query) {
        // match anything which looks like a decimal degrees coordinate pair
        var matches = query.match(
          /^[ ]*(?:Lat: )?(-?\d+\.?\d*)[, ]+(?:Lng: )?(-?\d+\.?\d*)[ ]*$/i
        );
        if (!matches) {
          return null;
      }
       
      function coordinateFeature(lng, lat) {
        return {
          center: [lng, lat],
          geometry: {
            type: 'Point',
            coordinates: [lng, lat]
          },
          place_name: 'Lat: ' + lat + ' Lng: ' + lng,
          place_type: ['coordinate'],
          properties: {},
          type: 'Feature'
        };
      }
        
      var coord1 = Number(matches[1]);
      var coord2 = Number(matches[2]);
      var geocodes = [];
        
      if (coord1 < -90 || coord1 > 90) {
        // must be lng, lat
        geocodes.push(coordinateFeature(coord1, coord2));
      }
        
      if (coord2 < -90 || coord2 > 90) {
        // must be lat, lng
        geocodes.push(coordinateFeature(coord2, coord1));
      }
        
      if (geocodes.length === 0) {
        // else could be either lng, lat or lat, lng
        geocodes.push(coordinateFeature(coord1, coord2));
        geocodes.push(coordinateFeature(coord2, coord1));
      }
        
      return geocodes;
    };

    this.map.addControl(
      new MapboxGeocoder({
      accessToken: Mapboxgl.accessToken,
      localGeocoder: coordinatesGeocoder,
      zoom: 4,
      placeholder: 'Try: -40, 170',
      mapboxgl: Mapboxgl
      })
      );
  }
}
