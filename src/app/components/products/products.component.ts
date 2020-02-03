import { Component, OnInit, Input } from '@angular/core';
import { Product, ProductsSortEnum } from 'src/app/interfaces/products.interface';
import * as _ from 'lodash';
import { ApiHandlerService } from 'src/app/api-handler.service';
import { UserData } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  
  @Input() 
  public userData: UserData = null;
  
  public products: Product[] =  [];
  public productsSortEnum = ProductsSortEnum;
  public slicedProducts: Product[] = [];
  public numberOfPages: number = 0;
  public displayDropdown = false;
  public currentSortOption: string = '';
  private originalProducts: Product[] = [];
  private itemsPerPage: number = 16;
  private currentPage: number = 1;

  constructor(private apiHandler: ApiHandlerService) {
    this.apiHandler.fetchProducts().subscribe((products: Product[]) => {
      this.products = products;
      this.originalProducts = products;
      this.getNumberOfPages();
      this.onSortProducts(ProductsSortEnum.recent.value);
    })
  }

  ngOnInit() { 
    this.currentSortOption = this.currentSortOption ? this.currentSortOption : this.productsSortEnum.recent.label;
  }
  
  public onSortProducts(sortOption: string) {
    if (this.currentSortOption !== sortOption) {
      let originalProductsCopy: Product[] = _.cloneDeep(this.originalProducts);
      
      switch(sortOption) {
        case ProductsSortEnum.lowest.value:
          this.products = originalProductsCopy.sort((a, b) => a.cost - b.cost);
           this.currentSortOption = ProductsSortEnum.lowest.label;
          break;
        
        case ProductsSortEnum.highest.value:
          this.products = originalProductsCopy.sort((a, b) => b.cost - a.cost);
           this.currentSortOption =  ProductsSortEnum.highest.label;
          break; 
        
        default:
          this.products = this.originalProducts;
           this.currentSortOption = ProductsSortEnum.recent.label;
          break;
      }
      this.currentPage = 1;
      this.splitProductsPerPage();
    }
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

  public toggleDisplayDropdown() :void {
    this.displayDropdown = !this.displayDropdown;
  }

  private splitProductsPerPage(): void {
    let productsCopy = _.cloneDeep(this.products);
    const startIndex = ((this.currentPage - 1) * this.itemsPerPage);
    const endIndex = startIndex + this.itemsPerPage;
    this.slicedProducts = productsCopy.slice(startIndex, endIndex);
  }
}
