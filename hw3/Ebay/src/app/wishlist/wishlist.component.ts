import { Component, OnInit, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WishListService} from '../wish-list.service';
import { ItemDetailsService } from '../item-details.service';
import { ItemsService } from '../items.service';
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  itemsPerPage: number = 10;
  currentPage: number = 1;
  wishListData: any[] = [];
  totalPrice: number = 0;
  shippingDetails: any[] = [];
  returnsAccepted: any;
  singleItemDetails: any[] = [];
  enableDetailsButton: boolean = false;
  detail:boolean = true;
  showDetailsTab: boolean = false;
  @Output() wishlistChanged: EventEmitter<any> = new EventEmitter<any>();
  selectedItem: any | null = null;
  title: string = '';
  constructor(private itemService:ItemsService ,private http: HttpClient, private cdr: ChangeDetectorRef, private wishlistService: WishListService,private itemDetailsService: ItemDetailsService) { }
  onBackToList(event: boolean) {
    this.showDetailsTab = false; // Hide the Details tab
    
  }
  ngOnInit(): void {
    this.enableDetailsButton = false;
    this.fetchWishListData();
  }
  fetchWishListData() {
    this.http.get('http://localhost:3000/all-products').subscribe((data:any)=>{
      this.wishListData = data;
      this.calculateTotalPrice();
    })
  }
  onItemClick(item: any): void {
    this.selectedItem = item;
    this.title = item.title[0];
  }
  showProduct(){
    if (this.selectedItem) {
      const itemId = this.selectedItem.itemId;
      this.itemDetailsService.getSingleItem(itemId).subscribe((response) => {
        if (response?.Item) {
          this.singleItemDetails = Object.entries(response.Item);
          this.toggleDetailsTab();
        }
      });
    }
  }
  calculateTotalPrice() {
    this.totalPrice = this.wishListData.reduce((total, item) => total + (parseFloat(item.price) || 0), 0);
    this.totalPrice = parseFloat(this.totalPrice.toFixed(2));
  }
  toggleDetailsTab() {
    this.showDetailsTab = !this.showDetailsTab;
    this.detail = !this.detail;
    }
    enableDetails() {
      this.enableDetailsButton = true;
    }
  getSingleItem(itemId:string, index:number){
    this.enableDetails();
    this.shippingDetails = this.wishListData[index].shippingInfo[0];
    this.returnsAccepted = this.wishListData[index].returnsAccepted;
    this.itemDetailsService.getSingleItem(itemId).subscribe((response)=>{
      if (response?.Item) {
        this.singleItemDetails = Object.entries(response.Item);
        this.toggleDetailsTab();
      }
    },
    (error)=>{
      console.error('Error',error);
    }
    )
  }
  truncateWithEllipsis(text:string, maxLength:number) {
    if (text.length <= maxLength) {
      return text;
    } else {
      const truncatedText = text.substr(0, maxLength);
      const lastSpaceIndex = truncatedText.lastIndexOf(' ');
      if (lastSpaceIndex !== -1) {
        return truncatedText.substr(0, lastSpaceIndex) + '…';
      } else {
        return truncatedText + '…';
      }
    }
  }
  goToPage(page:number){
    if(page>=1 && page<=this.totalPages){
      this.currentPage = page;
    }
  }
  getPages():number[]{
    const totalPages = Math.ceil(this.wishListData.length/this.itemsPerPage);
    return Array(totalPages).fill(0).map((_,i)=>i+1);
  } 
  get totalPages(): number {
    return Math.ceil(this.wishListData.length / this.itemsPerPage);
  }
  removeFromWishlist(item: any) {
    console.log('item',item)
    this.itemService.removeFromWishlist(item.itemId);
    this.http.delete(`http://localhost:3000/products/${item.itemId}`).subscribe(
      (response) => {
        console.log('HTTP Delete Response:', response);
        const index = this.wishListData.findIndex((itm) => itm.itemId=== item.itemId);
        if (index !== -1) {
          this.wishListData.splice(index, 1);
          this.calculateTotalPrice();
        }
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error removing item from the wishlist', error);
        // Handle the error, e.g., show an error message to the user.
      }
    );
  }

}
