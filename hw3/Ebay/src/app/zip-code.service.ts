import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ZipCodeService {
  
  constructor(private http:HttpClient) { }
  getSuggestions(zipCode:string){
    return this.http.get<any>(`http://localhost:3000/api/zip-suggestions?zipCode=${zipCode}`)
  }
}
