import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiHandlerService } from './api-handler.service';
import { Product, ProductRedeemResponse } from './interfaces/products.interface';
import { UserData } from './interfaces/user.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'aerolab-ecommerce';

  public userData: UserData = null;
  public products: Product[] = [];
  public originalProducts: Product[] = [];
  private subs: Subscription[] = [];

  constructor(private apiHandler: ApiHandlerService) { 
    this.subs.push(
      this.apiHandler.userPointsUpdated.subscribe((_pointsUpdated: boolean) => {
        this.getUserData();
      }),

      this.apiHandler.productRedeemed.subscribe((productId: string) => {
        this.redeemProduct(productId);
      })
    );
  }
  
  ngOnInit() {
    this.getUserData();
    this.getUserHistory();
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  private getUserData(): void {
    this.apiHandler.fetchUserData().subscribe((userData: UserData) => {
      this.userData = userData;
    });
  }

  private getUserHistory() {
    this.apiHandler.fetchUserHistory().subscribe((userHistory) => {
      console.log(userHistory);
    });
  }

  private redeemProduct(productId: string) {
    this.apiHandler.redeemProduct(productId).subscribe((_productRedemeed: ProductRedeemResponse) => {
      this.getUserData();
    });
  }
}
