import { Component, Input, Output, EventEmitter} from '@angular/core';// Import the dialog component

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  @Input() itemDetails: any[] = [];
  @Input() shippingDetails: any[] = [];
  @Input() returnsAccepted: [] = [];
  @Input() showWishListTab: boolean = false;
  @Input() showResultsTab: boolean = false;
  @Input() showDetailsTab: boolean = false;
  @Input() result: any[] = [];
  @Input() title: string = '';
  product:boolean = true;
  seller:boolean = false;
  shopping:boolean = false;
  similar:boolean = false;
  photo:boolean = false;
  activeTab= this.showResultsTab ? 'results' : 'wishlist'
  prevTab: boolean = false;

  constructor() { }
 
   navigateBackToList(){
    console.log('navigateBackToWishList');
   }
   ngOnInit() {
  
  }
  goToListPage() {
    console.log('goToListPage');
    this.prevTab = true;
    this.itemDetails = [];
    this.shippingDetails = [];
    this.returnsAccepted = [];
    this.product = false;
    this.seller = false;
    this.shopping = false;
    this.similar = false;
    this.photo = false;
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
