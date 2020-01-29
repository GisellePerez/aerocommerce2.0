import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './interfaces/products.interface';
import { UserData, updatedPointsResponse, RedeemHistory } from './interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiHandlerService {
  public userData: UserData = null;
  public userPointsUpdated: EventEmitter<boolean> = new EventEmitter(false);
  public productRedeemed: EventEmitter<string> = new EventEmitter(null);
  private apiToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTJjNjYzYTQzNzg1MTAwNmVkZDM3ZmQiLCJpYXQiOjE1Nzk5NjgwNTh9.KdwfqiR1qpBIpZPjZMEXhuphujXQdNAsXJ8OjIDCRi4';
  private apiUrl = 'https://coding-challenge-api.aerolab.co';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.apiToken}`
    })
  };

  constructor(private http: HttpClient) { }

  public fetchUserData(): Observable<UserData> {
    return this.http.get<UserData>(`${this.apiUrl}/user/me`, this.httpOptions);
  }

  public fetchUserHistory(): Observable<RedeemHistory[]> {
    return this.http.get<RedeemHistory[]>(`${this.apiUrl}/user/history`, this.httpOptions);
  }

  public fetchProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`, this.httpOptions);
  }

  public addPoints(): Observable<updatedPointsResponse> {
    const body = JSON.stringify({ 'amount': 1000 });
    return this.http.post<updatedPointsResponse>(`${this.apiUrl}/user/points`, body, this.httpOptions);
  }

  public redeemProduct(productId: string): Observable<updatedPointsResponse> {
    const body = JSON.stringify({ 'productId': productId });
    return this.http.post<updatedPointsResponse>(`${this.apiUrl}/redeem`, body, this.httpOptions);
  }

  public updateUserPoints(): void {
    this.addPoints().subscribe((newPoints: updatedPointsResponse) => {
      this.userData.points = newPoints['New Points'];
    });
  }
}
