import { Component, OnInit } from '@angular/core';
import { Product, ProductsSortEnum } from 'src/app/interfaces/products.interface';
import * as _ from 'lodash';
import { ApiHandlerService } from 'src/app/api-handler.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  
  public products: Product[] =  [];
  public productsSortEnum = ProductsSortEnum;
  public slicedProducts: Product[] = [];
  public numberOfPages: number = 0;
  private originalProducts: Product[] = [];
  private itemsPerPage: number = 16;
  private currentPage: number = 1;

  constructor(private apiHandler: ApiHandlerService) {
    this.apiHandler.fetchProducts().subscribe((products: Product[]) => {
      this.products = products;
      this.originalProducts = products;
      this.getNumberOfPages();
      this.onSortProducts(ProductsSortEnum.recent);
    })
  }

  ngOnInit() { }

  public onRedeemProduct(product: Product) {
    this.apiHandler.productRedeemed.emit(product._id);
  }

  public onSortProducts(sortType: string) {
    let originalProductsCopy: Product[] = _.cloneDeep(this.originalProducts);

    switch(sortType) {
      case ProductsSortEnum.lowest:
        this.products = originalProductsCopy.sort((a, b) => a.cost - b.cost);
        break;
      
      case ProductsSortEnum.highest:
        this.products = originalProductsCopy.sort((a, b) => b.cost - a.cost);
        break; 
      
      default:
        this.products = this.originalProducts;
        break;
    }
    this.currentPage = 1;
    this.splitProductsPerPage();
  }

  public pageChange(pageNavigation: string) {
    if (pageNavigation === 'prev') {
      this.currentPage -= 1;
    } else {
      this.currentPage += 1; 
    }
    this.splitProductsPerPage();
  } 

  private getNumberOfPages(): void {
    this.numberOfPages = Math.ceil(this.products.length / this.itemsPerPage);
  }

  private splitProductsPerPage() {
    let productsCopy = _.cloneDeep(this.products);
    const startIndex = ((this.currentPage - 1) * this.itemsPerPage);
    const endIndex = startIndex + this.itemsPerPage;
    this.slicedProducts = productsCopy.slice(startIndex, endIndex);
  }
}
