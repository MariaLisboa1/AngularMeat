import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';

@Component({
  selector: 'mt-shopping-cart',
  templateUrl: './shopping-cart.component.html'
})
export class ShoppingCartComponent implements OnInit {

  constructor(    private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {    
  }
 
  items(): any { //metodo para expor os itens
    return this.shoppingCartService.items;
  }

  total(): number { //export o total
    return this.shoppingCartService.total();
  }

  clear(){
    this.shoppingCartService.clear()
  }

  removeItem(item:any){
    this.shoppingCartService.removeItem(item)
  }

  addItem(item: any){
    this.shoppingCartService.addItem(item)
  }

}
 