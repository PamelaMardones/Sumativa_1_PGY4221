import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cartItems: any[] = [];
  constructor(public cartService: CartService) { }

  ionViewWillEnter() {
    this.cartItems = this.cartService.getCartItems();
  }

  removeFromCart(product: any) {
    this.cartService.removeFromCart(product);
  }

  ngOnInit() {
  }

}
