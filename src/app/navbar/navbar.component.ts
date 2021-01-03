import { Component, OnInit, Renderer2,  ViewContainerRef } from '@angular/core';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import { DynamicService } from '../Service/dynamic.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  faPlus = faPlus;

  constructor(private renderer: Renderer2,
    private dynamicService: DynamicService,
    private viewContainerRef: ViewContainerRef) {
     dynamicService.setRootViewContainerRef(viewContainerRef);

  }

  ngOnInit(): void {
  }

  createInput() {
    this.dynamicService.addDynamicComponent();
    // // Use Angular's Renderer2 to create the div element
    // const div = this.renderer.createElement('div');
    // // Set the id of the div
    // this.renderer.setProperty(div, 'id', 'etape');
    // // Append the created div to the body element
    // this.renderer.appendChild(document.body, div);

    // var currentDiv = document.getElementById("adresse1");
    // document.body.insertBefore(div, currentDiv);
    // return div;
  }

}
