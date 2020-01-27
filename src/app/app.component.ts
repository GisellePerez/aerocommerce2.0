import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiHandlerService } from './api-handler.service';
import { Product } from './interfaces/products.interface';
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
    this.getProductsList();
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  private getUserData(): void {
    this.apiHandler.fetchUserData().subscribe((userData: UserData) => {
      console.log(userData);
      this.userData = userData;
    });
  }

  private getUserHistory() {
    this.apiHandler.fetchUserHistory().subscribe((userHistory) => {
      console.log(userHistory);
    });
  }

  private getProductsList() {
    this.apiHandler.fetchProducts().subscribe((products: Product[]) => {
      console.log(products);
      this.products = products;
      this.originalProducts = products;
    });
  }

  private redeemProduct(productId: string) {
    this.apiHandler.redeemProduct(productId).subscribe((productRedemeed) => {
      console.log(productRedemeed);
      this.getUserData();
    });
  }
}
