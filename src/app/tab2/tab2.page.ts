import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl, Validator, FormBuilder } from '@angular/forms';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Producto } from '../models/producto';
import { Category } from '../models/category';
import { Calification } from '../models/calification';
import { ProductoService } from '../services/producto.service';
import { CategoryService } from '../services/category.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { IonRatingStarsModule } from 'ion-rating-stars';
import {AlertController,IonSearchbar,IonSelect,ModalController,ToastController,} from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  @ViewChild('ionBusqueda') busqueda!: IonSearchbar;

  isModalUnoOpen: boolean = false;
  isModalDosOpen: boolean = false;
  productos: Producto[] = [];
  fProductos: Producto[] = [];
  categorias: Category[] = [];
  opiniones: Calification[] = [];
  formCalif: FormGroup=this.fb.group({});
  validationMessages;
  activeProd: string[]=[];

  constructor(
    private prodServ: ProductoService,
    private cateServ: CategoryService,
    private alertController: AlertController,
    private toastController: ToastController,
    private modalController: ModalController,
    private fb: FormBuilder
  ) {
      this.categorias = this.cateServ.getCatego();
      this.productos = this.prodServ.getProductos();
      this.fProductos = this.productos;
      this.limpiarFormulario();

      this.validationMessages = {
        'calification':[
          {type: 'required', message: 'Quality required.'},
          {type: 'min', message: 'Minimun is 0.'},
          {type: 'max', message: 'Maximum is 5.'}
        ]
      };
      
  }
  limpiarFormulario() {
    this.formCalif = this.fb.group({
      name: [""],
      coment: [""],
      calification: ["",Validators.compose([Validators.required,Validators.min(0),Validators.max(5)])], 
      fecha: [new Date()]
    });
  }
  getColor(type: string): string {
    switch (type) {
      case 'Celulares':
        return 'secondary';
      case 'Televisiones':
        return 'sucess';
      case 'Computacion':
        return 'warning';
      case 'Audio':
        return 'danger';
      case 'Fotografia':
        return 'secondary';
      case 'Gaming':
        return 'tertiary';
      case 'Instrumentos':
        return 'danger';
      case 'Smart Home':
        return 'secondary';
      case 'Oficina':
        return 'primary';
      default:
        return 'primary';
    }
  }

  getColorStock(stock: number): string {
    if(stock>0) return 'success';
    else return 'danger';
  }

  public filter (dato: String) {
    if (!dato.trim()) {
      this.fProductos = this.productos;
      return;
    }
    this.fProductos = this.productos.filter((prod) =>
      prod.name.toLowerCase().includes(dato.toLowerCase())
    );
  }

  public filterProduct(event: Event) {
    if (event instanceof CustomEvent) {
      this.filter(event.detail.value);
    }
  }

  setModalUnoOpen(isOpen: boolean) {
    this.isModalUnoOpen = isOpen;
    if (!this.isModalUnoOpen) {
      this.activeProd[0] = "";
      this.activeProd[1] = "";
    } 
  }

  setModalDosOpen(isOpen: boolean) {
    this.isModalDosOpen = isOpen;
    if (!this.isModalUnoOpen) {
      this.activeProd[0] = "";
      this.activeProd[1] = "";
      this.opiniones = [];
    }
  }

  setActiveProd(prod: Producto) {
    this.activeProd[0] = prod.sku;
    this.activeProd[1] = prod.name;
    this.opiniones = prod.calification;
  }

  addCalif() {
    const pos = this.productos.findIndex( p => p.sku == this.activeProd[0]);
    this.productos[pos].calification.push(this.formCalif.getRawValue());
    const _prod = this.productos[pos];
    this.prodServ.uploadProduct(_prod);
    this.setModalUnoOpen(false);
    this.limpiarFormulario();
    
  }
  getPromedio(calificaciones: { calification: number }[]): { promedio: number, cantidad: number } {
    if (calificaciones.length === 0) {
      return { promedio: 0, cantidad: 0 };
    }
    const suma = calificaciones.reduce((a, b) => a + b.calification, 0);
    const promedio = suma / calificaciones.length;
    return { promedio: +promedio.toFixed(1), cantidad: calificaciones.length };
  }
  filterByCategory(category: string) {
    if (category === 'All') {
      this.fProductos = this.productos; 
    } else {
      this.fProductos = this.productos.filter(prod => prod.category.idCategoryBK === category);
    }
  }
  
}
