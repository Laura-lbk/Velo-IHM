import { Component, OnInit } from '@angular/core';
import { DataService } from '../Service/data.service';
import { WebService } from '../Service/webservice.service';

@Component({
  selector: 'app-denivele',
  templateUrl: './denivele.component.html',
  styleUrls: ['./denivele.component.css']
})
export class DeniveleComponent implements OnInit {

  adresses: string[] = [];
  showDenivele: boolean = false;

  constructor(private dataService: DataService,
    private webservice: WebService) { }

  ngOnInit(): void {
    this.dataService.dataSend.subscribe((data) => {
      console.log('wesh');
      this.adresses = data;
      this.getDenivelé();
    });
  }

  getDenivelé() {

    console.log('coucou');
    const accessToken = 'pk.eyJ1IjoibGF1cmEtbGJrIiwiYSI6ImNramtkNmxxczBiNDYyd2xmZDVwM21tMXAifQ.9LF_9VkK1kQVXvVx9gcDUA';
    this.webservice.getData('https://api.mapbox.com/v4/mapbox.mapbox-terrain-v2/tilequery/' + 2.810221 + ',' + 49.423484 + '.json?layers=contour&limit=50&access_token=' + accessToken).toPromise().then((data) => {
      var allFeatures = data.features;
      console.log(allFeatures);
      // Create an empty array to add elevation data to
      var elevations = [];
      // For each returned feature, add elevation data to the elevations array
      for (let i = 0; i < allFeatures.length; i++) {
        elevations.push(allFeatures[i].properties.ele);
      }
      console.log(elevations);
      // In the elevations array, find the largest value
      var highestElevation = Math.max(...elevations);
      console.log(highestElevation);
    });

    //Affichage des Resultats
    this.showDenivele = true;
  }


}
