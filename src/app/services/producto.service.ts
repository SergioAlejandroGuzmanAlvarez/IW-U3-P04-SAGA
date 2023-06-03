import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';
import { Calification } from '../models/calification';
import { Category } from '../models/category';
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  public delOrUpd = 1;
  private productos: Producto[] = [];

  private cat: Category[] = [];

  constructor(private cate: CategoryService) { 
    
    this.cat = cate.getCatego();
    this.productos.push({
      sku: 'B0B1VTC3MP',
      name: 'Moto Edge 30 Gris',
      description: 'Cámara trasera 50MP (OIS) + 50MP (wide & macro) + 2MP (depth) , Cámara Frontal 32MP Zoom 10X (Digital) dual LED flash, Procesador 8 Núcleos + 8 GB RAM',
      price: 8369,
      category: this.cat[1],
      calification: [
        {   
        name: 'Alejandro Guzman',
        coment: 'Me gusta Motorola, tiene una buena camara! Pero no trae audifonos.',
        calification: 2,
        fecha: new Date()
      },
      {   
        name: 'Karla Reyes',
        coment: 'El mejor equipo del mundo!.',
        calification: 5,
        fecha: new Date()
      }
    ],
      stock: 10,
      photo: 'https://picsum.photos/200/300',
      promCal: 4
    }
    );
  }

  public getProductos(): Producto[] {
    return this.productos;    
  }

  public getProductoFiltradoPorCategoria(idCategoriaOk: string): Producto[] {
    return this.productos.filter( prod => {prod.category?.idCategoryOK == idCategoriaOk});
  }

  public deleteProducto(prod: Producto): Producto[] {
    const pos = this.productos.findIndex( 
      (p) =>  p.sku == prod.sku
    );
    this.productos.splice(pos,1);
    return this.productos;
  }

  public uploadProduct(prod: Producto) {
    const pos = this.productos.findIndex( (_prod) => _prod.sku == prod.sku);
    this.productos[pos] = prod;
    this.productos[pos].promCal = this.getPromCal(prod);
  }

  public addProduct(prod:Producto) {
    prod.calification = [];
    this.productos.push(prod);
  }

  public getPromCal( prod: Producto ): number {
    const calif = prod.calification.map(c => c.calification);
    return Math.round(calif.reduce((a,b) => a+b,0)/calif.length);
  }

}
