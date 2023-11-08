import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ZipCodeService {
  
  constructor(private http:HttpClient) { }
  getSuggestions(zipCode:string){
    return this.http.get<any>(`https://web-tech-hw-3.wl.r.appspot.com/zip-suggestions?zipCode=${zipCode}`)
  }
}
