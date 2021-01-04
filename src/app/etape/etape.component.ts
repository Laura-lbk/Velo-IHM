import { Component, OnInit } from '@angular/core';
import {GlobalConstantes} from '../Service/global-constantes'

@Component({
  selector: 'app-etape',
  templateUrl: './etape.component.html',
  styleUrls: ['./etape.component.css']
})
export class EtapeComponent implements OnInit {

  n: number;

  constructor(private constantes: GlobalConstantes) { }

  ngOnInit(): void {
    console.log(this.constantes.nombre);
    this.constantes.nombre = this.constantes.nombre + 1;
    this.n = this.constantes.nombre;
    console.log(this.constantes.nombre)
  }

}
