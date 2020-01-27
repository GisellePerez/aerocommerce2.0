import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './interfaces/products.interface';
import { UserData, updatedPointsResponse } from './interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiHandlerService {

  public userData: UserData = null;
  public userPointsUpdated: EventEmitter<boolean> = new EventEmitter(false);
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

  public fetchUserHistory(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/history`, this.httpOptions);
  }

  public fetchProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`, this.httpOptions);
  }

  public addPoints() {
    const body = JSON.stringify({ 'amount': 1000 });

    return this.http.post(`${this.apiUrl}/user/points`, body, this.httpOptions);
  }

  public redeemProduct(): Observable<updatedPointsResponse> {
    return this.http.post<updatedPointsResponse>(`${this.apiUrl}/redeem`, this.httpOptions);
  }

  public updateUserPoints() {
    this.addPoints().subscribe((newPoints: updatedPointsResponse) => {
      this.userData.points = newPoints['New Points'];
    });
  }
}
