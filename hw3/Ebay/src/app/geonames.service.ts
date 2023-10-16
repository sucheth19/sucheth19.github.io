import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GeonamesService {
  constructor(private http: HttpClient) {}

  getZipCodeSuggestions(prefix: string) {
    const username = 'yourGeoNamesUsername';
    const apiUrl = `http://api.geonames.org/postalCodeSearchJSON?postalcode_startsWith=${prefix}&maxRows=5&username=suchethg`;
    return this.http.get(apiUrl);
  }
}
