import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SearchItemService {

  constructor(private http:HttpClient) { }
  getSearchResults(searchParams:object)
  {
    return this.http.get<any>(`http://localhost:3000/api/search-results?searchParams=${searchParams}`)
  }
}
