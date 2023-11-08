import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ItemDetailsService {
  constructor(private http:HttpClient) { }
  getSingleItem(itemId:string){
    return this.http.get<any>(`https://web-tech-hw-3.wl.r.appspot.com/product-details?itemId=${itemId}`)
  }
}
