import { Injectable } from '@angular/core';
import { Category } from '../models/category';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private cat: Category[] = [];

  constructor() {
    this.cat.push(  
    {idCategoryOK:'1', idCategoryBK:'Celulares'},
    {idCategoryOK:'2', idCategoryBK:'Televisiones'},
    {idCategoryOK:'3', idCategoryBK:'Computacion'},
    {idCategoryOK:'4', idCategoryBK:'Audio'},
    {idCategoryOK:'5', idCategoryBK:'Fotografia'},
    {idCategoryOK:'6', idCategoryBK:'Gaming'},
    {idCategoryOK:'7', idCategoryBK:'Instrumentos'},
    {idCategoryOK:'8', idCategoryBK:'Smart Home'},
    {idCategoryOK:'9', idCategoryBK:'Oficina'});
  }

  public getCatego(): Category[] {
    return this.cat;
  }
}
