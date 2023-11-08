import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SearchItemService {

  constructor(private http:HttpClient) { }
  getSearchResults(searchParams:any)
  {
    searchParams = JSON.stringify(searchParams);
    return this.http.get<any>(`https://web-tech-hw-3.wl.r.appspot.com/search-results?searchParams=${searchParams}`)
  }
}
