import { Component, OnInit } from '@angular/core';
import { DataService } from '../Service/data.service';
import * as Mapboxgl from 'mapbox-gl';
import { WebService } from '../Service/webservice.service'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  validation:boolean;
  adresses: string[] = [];
  coordoonees: string[] = [];
  map: Mapboxgl.Map;
  public lat;
  public lng;

  constructor(private dataService: DataService,
    private webservice: WebService) { }

  ngOnInit(): void {
    this.getLocation();
    this.displayMap();
    this.dataService.dataSend.subscribe((data) => {
      this.adresses = data;
      this.dessineTrajet();
      this.getDirections(this.adresses);
    });
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
        if (position) {
          console.log("Latitude: " + position.coords.latitude +
            "Longitude: " + position.coords.longitude);
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          console.log(this.lat);
          console.log(this.lat);
        }
      },
        (error: PositionError) => console.log(error));
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  async getDirections(tabAdresses) {
    const data: any = await this.adressToCoordinates(tabAdresses);
    let coords = [];
    coords = data;
    this.coordoonees = coords;
    console.log(coords);
    var coordsString = coords.join(';');
    const accessToken = 'pk.eyJ1IjoibGF1cmEtbGJrIiwiYSI6ImNramtkNmxxczBiNDYyd2xmZDVwM21tMXAifQ.9LF_9VkK1kQVXvVx9gcDUA';
    this.webservice.getData('https://api.mapbox.com/directions/v5/mapbox/cycling/' + coordsString + '?geometries=geojson&access_token=' + accessToken).toPromise().then((datacord) => {
      console.log(datacord);
      //const response = JSON.parse(data);
      //console.log(response);
      const route = datacord.routes[0].geometry;
      console.log(route);
      this.map.addLayer({
        id: 'journeyReshaped', //identifiant unique de l'objet
        type: 'line',
        source: {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: route //utilisation de l'itinéraire
          }
        },
        paint: {
          'line-color': "#df03fc", //couleur de la ligne
          'line-width': 4, //epaisseur de la ligne
          'line-opacity': 0.7 //opacité de la ligne
        }
      });
      this.map.jumpTo({ 'center': coords[0], 'zoom': 7 });
      this.validation = true;
    })
  }

  Validation(){
    console.log('click')
    this.map.jumpTo({ 'center': this.coordoonees[0], 'zoom': 14 });
    this.validation = false;
  }

  adressToCoordinates(Adresses) {
    return new Promise(async (resolve) => {
      const accessToken = 'pk.eyJ1IjoibGF1cmEtbGJrIiwiYSI6ImNramtkNmxxczBiNDYyd2xmZDVwM21tMXAifQ.9LF_9VkK1kQVXvVx9gcDUA';
      let Coords = [];
      for (let adresse of Adresses) {
        const data = await this.webservice.getData('https://api.mapbox.com/geocoding/v5/mapbox.places/' + adresse + '.json?access_token=' + accessToken).toPromise()
        let latitude = data.features[0].center[0];
        let longitude = data.features[0].center[1];
        let tab = [latitude, longitude];
        Coords.push(tab);
      }
      resolve(Coords);
    });
  }



  displayMap(): void {
    Mapboxgl.accessToken = 'pk.eyJ1IjoibGF1cmEtbGJrIiwiYSI6ImNramtkNmxxczBiNDYyd2xmZDVwM21tMXAifQ.9LF_9VkK1kQVXvVx9gcDUA';

    this.map = new Mapboxgl.Map({
      container: 'map-mapbox', // container id
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [2.351078, 48.856758], // starting position [lng, lat]
      zoom: 6 // starting zoom
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

  dessineTrajet(): void {
    //TODO
    //Placer le Trajet sur la map en envoyant this.adresses vers l'API
    // Recupérer la reponse de l'API
  }


}
