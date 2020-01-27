import { Component, OnInit, Input, OnChanges, AfterViewChecked, AfterContentChecked, AfterContentInit, SimpleChanges } from '@angular/core';
import { Product, ProductsSortEnum } from 'src/app/interfaces/products.interface';
import * as _ from 'lodash';
import { ApiHandlerService } from 'src/app/api-handler.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  @Input()
  public products: Product[] =  [];
  
  @Input()
  readonly originalProducts: Product[] = [];

  public productsSortEnum = ProductsSortEnum;

  constructor(private apiHandler: ApiHandlerService) { }

  ngOnInit() { 
  }

  public onRedeemProduct(product: Product) {
    console.log('redeemed', product);
    this.apiHandler.productRedeemed.emit(product._id);
  }

  public onSortProducts(sortType: string) {
    let originalProductsCopy: Product[] = _.cloneDeep(this.originalProducts);

    switch(sortType) {
      case ProductsSortEnum.lowest:
        this.products = originalProductsCopy.sort((a, b) => a.cost - b.cost);
        console.log(this.products);
        break;
      
      case ProductsSortEnum.highest:
        this.products = originalProductsCopy.sort((a, b) => b.cost - a.cost);
        console.log(this.products);
        break; 
      
      default:
        this.products = this.originalProducts;
        console.log(this.products)
        break;
    }
  }

  public pagination(pageNumber: number): void {
    let originalProductsCopy = _.cloneDeep(this.originalProducts);
    const pageSize = 16;
    const startIndex = pageNumber * pageSize;

    // this.products = pageNumber === 0 ?
    //   originalProductsCopy.slice(0, 15) :
    //   originalProductsCopy.slice(16, 31);

    this.products = originalProductsCopy.slice(startIndex, (startIndex + pageSize)); 
    console.log(this.products);
  }

  // public pagination(perPage: number) {
  //   let originalProductsCopy = this.originalProducts;
  //   // this.products = this.originalProducts;

  //   if (perPage < 1 || !originalProductsCopy) return () => [];
    
  //   return (page: number) => {
  //     const basePage = page * perPage;
    
  //     return page < 0 || basePage >= originalProductsCopy.length 
  //       ? [] 
  //       : originalProductsCopy.slice(basePage,  basePage + perPage);
  //   };
  // }
}
