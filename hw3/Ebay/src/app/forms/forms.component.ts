import { Component, ViewEncapsulation } from '@angular/core';
import { GeonamesService } from '../geonames.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FormsComponent {
  selectedLocation: string = 'current';
  searchForm: any = {};
  zipCode: string = '';
  zipCodeSuggestions: any[] = [];
  keywordError: boolean = false;
  zipCodeRadioError: boolean = false;
  zipCodeError: boolean = false;
  constructor(private geoNamesService: GeonamesService,private http: HttpClient) {
    this.searchForm = {
      keyword: '',
      category: 'All Categories',
      new: false,
      used: false,
      unspecified: false,
      local: false,
      freeshipping: false,
      distance: 10,
      zipcode: '',
    };
    this.fetchGeolocation(); 
  }
  
  fetchGeolocation() {
    const apiUrl = 'https://ipinfo.io/json?token=ce1aaa114146dc';
    this.http.get(apiUrl).subscribe((data: any) => {
      // Extract the postal code from the response
      const postalCode = data.postal;
  
      // Update the zipCode in your searchForm
      this.searchForm.zipcode = postalCode;
    
      console.log('postalCode: ',postalCode)
    });
    
  }
  
  
  selectZipCode(zipCode: string) {
    this.zipCode = zipCode;
    this.zipCodeSuggestions = []; // Clear suggestions when a suggestion is selected
  }
  

  selectCategory(category: string) {
    this.searchForm.category = category;
  }
  onSubmit() {
    console.log('Search form: ',this.searchForm);
    // Check keyword validation
    if (this.searchForm.keyword.trim() === '') {
      this.keywordError = true;
    } else {
      this.keywordError = false;
      // Handle form submission here
    }
  
    // Check zipCode validation if the "other" option is selected
    if (this.selectedLocation === 'other') {
      if (this.zipCode.trim() === '') {
        this.zipCodeError = true;
      } else {
        this.zipCodeError = false;
        // Handle zipCode-related validation or submission here
      }
    }
  
    // Check zipCode radio selection
    if (this.selectedLocation === 'other') {
      if (this.zipCode.trim() === '') {
        this.zipCodeRadioError = true;
      } else {
        this.zipCodeRadioError = false;
      }
    }

  }
  


  onClear() {
    // Clear form values and reset error flags
    this.searchForm = {};
    this.selectedLocation = 'current';
    this.zipCode = '';
    this.zipCodeSuggestions = [];
    this.keywordError = false;
    this.zipCodeError = false; // Reset zipCode error flag
  }

  onZipCodeInput() {
    if (this.zipCode.length >= 3) {
      this.geoNamesService.getZipCodeSuggestions(this.zipCode).subscribe((data: any) => {
        this.zipCodeSuggestions = data.postalCodes;
      });
    } else {
      this.zipCodeSuggestions = [];
    }
  }
}
