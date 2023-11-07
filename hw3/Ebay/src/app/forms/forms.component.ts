    import { Component, ViewEncapsulation, EventEmitter, Output, Input } from '@angular/core';
    import { FormBuilder, FormControl,  Validators, AbstractControl, ValidationErrors} from '@angular/forms';
    import {ZipCodeService} from '../zip-code.service';
    import { HttpClient } from '@angular/common/http';
    import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
    import {SearchItemService} from '../search-item.service';

    function keywordWhitespaceValidator(control: AbstractControl): ValidationErrors | null {
      const keywordValue = control.value as string;
      const isWhitespace = keywordValue.trim() === '';
    
      return isWhitespace ? { whitespace: true } : null;
    }
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
      title: string = '';
      isSubmitted = false;
      zipCodeSuggestions: any[] = [];
      keywordError: boolean = false;
      zipCodeRadioError: boolean = false;
      zipCodeError: boolean = false;
      isZipCodeValid: boolean = false;
      suggestions:any[] = [];
      resultTableData: any[] = [];
      showResultsTab:boolean = true;
      showWishListTab:boolean = false;
      showResultValue:boolean = false;
      postalCode: any;
      otherLocationSelected: boolean = false;
      vrzipcode:boolean = true;
      clearClicked: boolean = false;
      wishlistVisited:boolean  = false;
      fromwishList:boolean = false;
      onLocationChange(location: string) {
        this.selectedLocation = location;
        const rzipCodeControl = this.searchForm.get('rzipCode');
        
        if (location === 'other') {
          this.otherLocationSelected = true;
          rzipCodeControl.enable(); // Enable the rzipCode input
        } else {
          this.otherLocationSelected = false;
          rzipCodeControl.disable(); // Disable the rzipCode input
        }
      }
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
          rzipCode: {value:'',disabled:true}  
        });
        this.searchForm.get('keyword')?.setValidators([Validators.required, keywordWhitespaceValidator]);
      } 
 
     
      
      activateResultsTab(){
        this.showResultsTab = true;
        this.showWishListTab = false;
      }
      activateWishListTab(){
        this.showResultsTab = false;
        this.showWishListTab = true;
      }
      activateDetailsTab(){
        this.showResultsTab = false;
        this.showWishListTab = false;
      }
 
      onZipCodeChange(rzipCode: string) {
        if(this.searchForm.get('rzipCode')?.valid){
          if (rzipCode.length >= 0) {
            if (rzipCode.length === 5) {
              this.vrzipcode = false;
            }
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
          this.postalCode = data.postal;
          this.searchForm.get('zipCode')?.setValue(this.postalCode);
        });
      }


      selectCategory(category: string) {
        if (this.searchForm.get('category')) {
          this.searchForm.get('category')?.setValue(category);
        }
      }
    
      
      validateZipCode() {
        return this.zipCode.value.length === 5 ; // Use .value to access the value of the FormControl
      }
  // @Output() resultTableDataEmitter = new EventEmitter<any[]>();
  
  onSubmit() {
    this.isSubmitted = true;
    this.resultTableData = [] ;
    this.fetchGeolocation();    
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
      zipCode: this.postalCode,
      rzipCode: this.searchForm.value.rzipCode
    };
    this.searchItemService.getSearchResults(requestData).subscribe(
      (data: any) => {        
        this.resultTableData = data.searchResult?.[0]?.item || [];
        this.isSubmitted = false;
          this.showResultValue = true;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  onClear() {
  this.searchForm.get('keyword')?.setValue('');
  this.searchForm.get('new')?.setValue(false);
  this.searchForm.get('used')?.setValue(false);
  this.searchForm.get('unspecified')?.setValue(false);
  this.searchForm.get('local')?.setValue(false);
  this.searchForm.get('freeshipping')?.setValue(false);
  this.searchForm.get('distance')?.setValue(10);
  this.searchForm.get('category')?.setValue('All Categories');
  this.searchForm.get('location')?.setValue('current');
  this.selectedLocation = 'current';
  this.zipCode.setValue('');
  this.zipCodeSuggestions = [];
  this.keywordError = false;
  this.zipCodeError = false;
  this.resultTableData = [];
  this.showResultValue = false;
  this.isSubmitted = false;
  this.showResultsTab = true;
  this.showWishListTab = false;
  this.searchForm.get('rzipCode')?.setValue('');
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
    rzipCode: {value:'',disabled:true}  
  });
  this.searchForm.get('keyword')?.setValidators([Validators.required, keywordWhitespaceValidator]);
}
      
    }
