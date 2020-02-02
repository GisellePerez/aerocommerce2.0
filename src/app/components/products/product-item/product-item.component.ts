import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/interfaces/products.interface';
import { ApiHandlerService } from 'src/app/api-handler.service';
import { UserData } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  @Input()
  public product: Product = null;

  @Input() 
  public userData: UserData = null;

  public productIsAffordable = false;
  public missingPoints: number = null;

  constructor(private apiHandler: ApiHandlerService) { }

  ngOnInit() { 
    if (this.product && this.userData) {
      this.checkIfProductIsAffordable();
    }
  }

  public onRedeemProduct(product: Product): void {
    this.apiHandler.productRedeemed.emit(product._id);
  }

  private checkIfProductIsAffordable(): void {
      this.productIsAffordable = this.userData.points >= this.product.cost;
      this.missingPoints = this.product.cost - this.userData.points;
  }
}
