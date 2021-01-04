import { Injectable, EventEmitter, Output } from '@angular/core';
import { Component, OnInit, Renderer2,  ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import { DataService } from '../Service/data.service';
import { DynamicService } from '../Service/dynamic.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  faPlus = faPlus;
  submitted = false;
  adressForm: FormGroup;
  @Output() dataSend = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder,
    private dataService: DataService,
    private dynamicService: DynamicService,
    private viewContainerRef: ViewContainerRef) {

      this.adressForm = this.formBuilder.group({
        adresse1: ['', Validators.required],
        adresse2: ['', Validators.required],
    });

     dynamicService.setRootViewContainerRef(viewContainerRef);

  }

  ngOnInit(): void {
  }

  onSubmit(){
    let adresses = [];
    this.submitted = true;
        if (this.adressForm.invalid) {
            return;
        }
        for(const valeur in this.adressForm.value){
          adresses.push(this.adressForm.value[valeur]);
        }
        this.dataService.send(adresses);
    }

  onReset() {
    this.submitted = false;
    this.adressForm.reset();
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
