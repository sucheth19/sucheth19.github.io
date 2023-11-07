import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent {
  @Input() returnsAccepted: any = '';
  constructor() { 
  
  }
  ngOnInit(){
  
  }
  removeSpacesAndUpperCase(text: string): string {
    return text.replace(/\s/g, '').toUpperCase();
  }
}
