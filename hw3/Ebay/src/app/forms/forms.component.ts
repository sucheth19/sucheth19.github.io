  import { Component, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
  import { FormBuilder, FormControl,  Validators } from '@angular/forms';
  import {ZipCodeService} from '../zip-code.service';
  import { HttpClient } from '@angular/common/http';
  import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
  import {SearchItemService} from '../search-item.service';

  @Component({
    selector: 'app-forms',
    templateUrl: './forms.component.html',
    styleUrls: ['./forms.component.css'],
    encapsulation: ViewEncapsulation.None,
  })
  export class FormsComponent {
    selectedLocation: string='current';
    zipCode: FormControl = new FormControl('');
    searchForm: any;
    isSubmitted = false;
    zipCodeSuggestions: any[] = [];
    keywordError: boolean = false;
    zipCodeRadioError: boolean = false;
    zipCodeError: boolean = false;
    isZipCodeValid: boolean = false;
    suggestions:any[] = [];
    constructor(private formBuilder: FormBuilder, private zipCodeService:ZipCodeService, private http: HttpClient, private searchItemService:SearchItemService) {
      this.fetchGeolocation();
      this.selectedLocation = 'current';
      this.searchForm = this.formBuilder.group({
        keyword: ['', Validators.required],
        category: 'All Categories',
        new: false,
        used: false,
        unspecified: false,
        local: false,
        freeshipping: false,
        distance: 10,
        location: 'current',
        zipCode: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
        rzipCode: ['', [Validators.required, Validators.pattern(/^\d+$/)]]  
      });
    }
   
    onZipCodeChange(rzipCode: string) {
      if(this.searchForm.get('rzipCode')?.valid){
        if (rzipCode.length >= 3) {
          this.zipCodeService.getSuggestions(rzipCode).subscribe(
            (data: any) => {
              if (data.postalCodes) {
                this.suggestions = data.postalCodes
                  .filter((item: any) => item.postalCode.match(/^\d+$/)) // Filter by ZIP code format (only numbers)
                  .map((item: any) => item.postalCode);
              
      }else{
        this.suggestions = [];
      }
    },
    (error: any) => {
      console.error(error);
      this.suggestions = [];
    }
  );
} else {
  this.suggestions = [];
}
} else {
// Clear suggestions when ZIP code is invalid
this.suggestions = [];
}
    }
    onZipCodeSelected(event: MatAutocompleteSelectedEvent) {
      const selectedZIPCode = event.option.value;
      this.searchForm.get('rzipCode')?.setValue(selectedZIPCode);
      this.suggestions = []; // Clear suggestions
    }
    
    fetchGeolocation() {
      const apiUrl = 'https://ipinfo.io/json?token=ce1aaa114146dc';
      this.http.get(apiUrl).subscribe((data: any) => {
        const postalCode = data.postal;
        this.searchForm.get('zipCode')?.setValue(postalCode);
      });
    }


    selectCategory(category: string) {
      if (this.searchForm.get('category')) {
        this.searchForm.get('category')?.setValue(category);
      }
    }

    validateZipCode() {
      return this.zipCode.value.length === 5; // Use .value to access the value of the FormControl
    }
@Output() resultTableDataEmitter = new EventEmitter<any[]>();
    onSubmit() {
      this.isSubmitted = true;
      this.isZipCodeValid = this.validateZipCode();
        const requestData = {
          keyword: this.searchForm.value.keyword,
          category: this.searchForm.value.category,
          new: this.searchForm.value.new,
          used: this.searchForm.value.used,
          unspecified: this.searchForm.value.unspecified,
          local: this.searchForm.value.local,
          freeshipping: this.searchForm.value.freeshipping,
          distance: this.searchForm.value.distance,
          location: this.searchForm.value.location,
          zipCode: this.searchForm.value.zipCode,
          rzipCode: this.searchForm.value.rzipCode
        };
        this.searchItemService.getSearchResults(requestData).subscribe(
          (data: any) => {
           this.resultTableDataEmitter.emit(data.searchResult[0].item);
        },
  (error: any) => {
    console.error(error);
  }
);
  }
@Output() clearEmitter = new EventEmitter<any[]>();
    onClear() {
      this.searchForm.reset();
      this.selectedLocation = 'current';
      this.zipCode.setValue('');
      this.zipCodeSuggestions = [];
      this.keywordError = false;
      this.zipCodeError = false;
      this.searchForm.get('category')?.setValue('All Categories');
      this.clearEmitter.emit();
    }
    
  }
