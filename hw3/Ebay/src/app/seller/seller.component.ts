import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent {
  @Input() returnsAccepted: any = '';
  constructor() { 
    console.log('seller component constructor called', this.returnsAccepted)
  }
  ngOnInit(){
    console.log('seller component ngOnInit called', this.returnsAccepted)
  }
  removeSpacesAndUpperCase(text: string): string {
    return text.replace(/\s/g, '').toUpperCase();
  }
}
