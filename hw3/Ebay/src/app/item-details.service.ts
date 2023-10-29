import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ItemDetailsService {
  constructor(private http:HttpClient) { }
  getSingleItem(itemId:string){
    return this.http.get<any>(`http://localhost:3000/api/product-details?itemId=${itemId}`)
  }
}
