import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: any[] = [];
  totalValue: number = 0;

  constructor() { }

  addToCart(product: any) {
    this.cartItems.push(product);
    this.totalValue += product.price;
  }

  getCartItems() {
    return this.cartItems;
  }

  removeFromCart(product: any) {
    const index = this.cartItems.indexOf(product);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.totalValue -= product.price;
    }
  }
}