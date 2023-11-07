import { Component, Input, Output, EventEmitter,ChangeDetectorRef , OnChanges, SimpleChanges, OnInit} from '@angular/core';// Import the dialog component
import { ItemsService } from '../items.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  @Input() itemDetails: any[] = [];
  @Input() shippingDetails: any[] = [];
  @Input() returnsAccepted: [] = [];
  @Input() showWishListTab: boolean = false;
  @Input() showResultsTab: boolean = false;
  @Input() showDetailsTab: boolean = false;
  @Input() result: any[] = [];
  @Input() title: string = '';
  @Input() wishListData: any[] = [];
  @Output() resultlistChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output() backToList = new EventEmitter<boolean>();
  product:boolean = true;
  seller:boolean = false;
  shopping:boolean = false;
  similar:boolean = false;
  photo:boolean = false;
  activeTab= this.showResultsTab ? 'results' : 'wishlist'
  prevTab: boolean = false;
  index: number = 0;
  toggle: boolean = false;
  loading: boolean = false; 

  constructor(private http:HttpClient, private itemsService:ItemsService, private cdr: ChangeDetectorRef) { }
 
   navigateBackToList(){
   
   }
   ngOnInit() {
    this.index = this.result.findIndex((item) => item.itemId[0] === this.itemDetails[2][1])
    this.toggle = this.result[this.index].isActive;
    this.fetchWishListData();
    this.loading = true;
    setTimeout(() => {
      // Simulate the completion of data loading
      this.loading = false;
    }, 2000); 
  }
  ngOnChanges(changes: SimpleChanges) {
    if ('result' in changes && changes['result'].currentValue) {
      this.result = changes['result'].currentValue;
      this.cdr.detectChanges(); // Trigger change detection
      this.fetchWishListData();
    }
  }
  toggleWishlist(itemId: any) {
    this.toggle = !this.toggle;
    let index = this.result.findIndex((item) => item.itemId[0] === itemId);
    
    if (this.toggle) {
      // Add the item to the wishlist
      // You can use your existing code or a similar HTTP request here
    
      this.removeFromWishlist(this.result[index]);
      console.log('item',this.result[index])
    } else {
      // Remove the item from the wishlist
      // You can use your existing code or a similar HTTP request here
      this.Wishlist(this.result[index]);
    }
  }
  fetchWishListData() {
    this.http.get('http://localhost:3000/all-products').subscribe((data:any)=>{
      this.wishListData = data;
      this.result.forEach((item:any)=>{
        item.isActive = this.isItemInWishlist(item.itemId[0]);
      })
      
    })
  }
  isItemInWishlist(itemId: string): boolean {
    return this.wishListData.some((item: any) => item.itemId === itemId);
  }
  Wishlist(item: any) {
    if (item) {
      const params = {
        itemId: item.itemId && item.itemId[0] ? item.itemId[0] : "N/A",
        title: item.title && item.title[0] ? item.title[0] : "N/A",
        galleryUrl: item.galleryURL && item.galleryURL[0] ? item.galleryURL[0] : "N/A",
        price: item.sellingStatus && item.sellingStatus[0].currentPrice[0].__value__ ? item.sellingStatus[0].currentPrice[0].__value__ : "N/A",
        shippingPrice: item.shippingInfo && item.shippingInfo[0].shippingServiceCost[0].__value__ ? item.shippingInfo[0].shippingServiceCost[0].__value__ : "N/A",
        zipCode: item.postalCode && item.postalCode[0] ? item.postalCode[0] : "N/A",
        shippingInfo: JSON.stringify(item.shippingInfo),
        returnsAccepted: item.returnsAccepted && item.returnsAccepted[0] ? item.returnsAccepted[0] : "false",
      };
   
      this.itemsService.addToWishlist(item);
      this.http.get('http://localhost:3000/products',{params}).subscribe((response)=>{
      // console.log('resp',response)
    },
      (error)=>{
        console.error('Error',error);
      }
      )
      // You can proceed with your HTTP request using the params
    } else {
      console.error('Item is empty or undefined.');
    }

  }
  removeFromWishlist(itemId: any) {
  
      // Get the item to be removed from the 'result' array
      // Send an HTTP request to your server to remove the item from the wishlist
      this.result[this.index].isActive = false;
      this.itemsService.removeFromWishlist(itemId);
      this.http.delete(`http://localhost:3000/products/${itemId}`).subscribe(
        (response) => {
          console.log('HTTP Delete Response:', response);
          const index = this.wishListData.findIndex((itm) => itm.itemId=== itemId);
          if (index !== -1) {
            this.wishListData.splice(index, 1);
          }
          this.cdr.detectChanges();
        },
        (error) => {
          console.error('Error removing item from the wishlist', error);
          // Handle the error, e.g., show an error message to the user.
        }
      );
    
  }
  goToListPage() {
    this.prevTab = true;
    this.itemDetails = [];
    this.shippingDetails = [];
    this.returnsAccepted = [];
    this.product = false;
    this.seller = false;
    this.shopping = false;
    this.similar = false;
    this.photo = false;
    this.backToList.emit(true);
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
