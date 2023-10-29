import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  @Input() itemDetails: any[] = [];
  product:boolean = true;
  seller:boolean = false;
  shopping:boolean = false;
  similar:boolean = false;
  photo:boolean = false;
  constructor() {
   
   }
   ngOnInit() {
    if (this.itemDetails) {
      console.log('Result:', this.itemDetails);  
    }
 
  }
  showProduct(){
  this.product = true;
  this.seller = false;
  this.shopping = false;
  this.similar = false;
  this.photo = false;
  }
  showPhoto(){
    this.product = false;
    this.seller = false;
    this.shopping = false;
    this.similar = false;
    this.photo = true;
  }
  showShopping(){
    this.product = false;
    this.seller = false;
    this.shopping = true;
    this.similar = false;
    this.photo = false;
  }
  showSeller(){
    this.product = false;
    this.seller = true;
    this.shopping = false;
    this.similar = false;
    this.photo = false;
  }
  showSimilar(){
    this.product = false;
    this.seller = false;
    this.shopping = false;
    this.similar = true;
    this.photo = false;
  }
}
