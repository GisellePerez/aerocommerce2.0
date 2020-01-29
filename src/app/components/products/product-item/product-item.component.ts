import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/interfaces/products.interface';
import { ApiHandlerService } from 'src/app/api-handler.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  @Input()
  public product: Product = null;

  constructor(private apiHandler: ApiHandlerService) { }

  ngOnInit() {
  }

  public onRedeemProduct(product: Product) {
    this.apiHandler.productRedeemed.emit(product._id);
  }

}
