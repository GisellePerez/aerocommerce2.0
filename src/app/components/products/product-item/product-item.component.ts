import { Component, OnInit, Input, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Product } from 'src/app/interfaces/products.interface';
import { ApiHandlerService } from 'src/app/api-handler.service';
import { UserData } from 'src/app/interfaces/user.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  public product: Product = null;

  @Input() 
  public userData: UserData = null;

  public productIsAffordable = false;
  public missingPoints: number = null;
  public redeemingProduct: {redeeming: boolean; productId: string } = null;
  private subs: Subscription[] = [];

  constructor(private apiHandler: ApiHandlerService) { 
    this.subs.push(
      this.apiHandler.redeemingProduct.subscribe((redeeming: {redeeming: boolean; productId: string }) => {
        this.redeemingProduct = redeeming;
      })
    )
  }

  ngOnInit() { 
    if (this.product && this.userData) {
      this.checkIfProductIsAffordable();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.userData) {
      this.checkIfProductIsAffordable();
    }
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  public onRedeemProduct(product: Product): void {
    this.apiHandler.productRedeemed.emit(product._id);
  }

  private checkIfProductIsAffordable(): void {
      this.productIsAffordable = this.userData.points >= this.product.cost;
      this.missingPoints = this.product.cost - this.userData.points;
  }
}
