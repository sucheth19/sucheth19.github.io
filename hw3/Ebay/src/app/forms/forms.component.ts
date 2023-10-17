import { Component, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class FormsComponent {
  selectedLocation: string = 'current';
  searchForm = this.formBuilder.group({
     keyword:['',Validators.required],
     category:'All Categories',
      new:false,
      used:false,
      unspecified:false,
      local:false,
      freeshipping:false,
      distance:10,
      location:'current',
      zipCode:''
  });
  isSubmitted = false;
  zipCode: string = '';
  zipCodeSuggestions: any[] = [];
  keywordError: boolean = false;
  zipCodeRadioError: boolean = false;
  zipCodeError: boolean = false;
  isZipCodeValid: boolean = false;
  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.fetchGeolocation();
  }

  fetchGeolocation() {
    const apiUrl = 'https://ipinfo.io/json?token=ce1aaa114146dc';
    this.http.get(apiUrl).subscribe((data: any) => {
      // Extract the postal code from the response
      const postalCode = data.postal;

      // Update the zipCode in your searchForm if it exists
      if (this.searchForm.get('zipCode')) {
        this.searchForm.get('zipCode')?.setValue(postalCode);
      }

      console.log('postalCode: ', postalCode);
    });
  }

  selectZipCode(zipCode: string) {
    this.zipCode = zipCode;
    this.zipCodeSuggestions = [];
  }

  selectCategory(category: string) {
    if (this.searchForm.get('category')) {
      this.searchForm.get('category')?.setValue(category);
    }
  }
  validateZipCode() {
    return this.zipCode.length === 5;
  }
  onSubmit() {
    console.log('Search form: ', this.searchForm.value);
    this.isSubmitted = true;
    this.isZipCodeValid = this.validateZipCode();
  }

  onClear() {
    this.searchForm.reset();
    this.selectedLocation = 'current';
    this.zipCode = '';
    this.zipCodeSuggestions = [];
    this.keywordError = false;
    this.zipCodeError = false;
  }
}
