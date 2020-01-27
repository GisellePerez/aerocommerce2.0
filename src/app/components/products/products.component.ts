import { Component, OnInit, Input } from '@angular/core';
import { Product, ProductsSortEnum } from 'src/app/interfaces/products.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  @Input()
  public products: Product[] =  [];

  public productsSortEnum = ProductsSortEnum;

  constructor() { }

  ngOnInit() {
  }

  public onRedeemProduct(product: Product) {
    console.log('redeemed', product);
  }

  public onSortProducts(sortType: string) {
    console.log('sortType', sortType);
  }

}
