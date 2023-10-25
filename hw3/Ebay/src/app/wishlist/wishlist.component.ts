import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) { }
  ngOnInit(): void {
    this.fetchWishListData();
  }
  fetchWishListData() {
    this.http.get('http://localhost:3000/all-products').subscribe((data:any)=>{
      this.wishListData = data;
      this.calculateTotalPrice();
      console.log('this.wishListData',this.wishListData);
    })
  }
  calculateTotalPrice() {
    this.totalPrice = this.wishListData.reduce((total, item) => total + (parseFloat(item.price) || 0), 0);
    this.totalPrice = parseFloat(this.totalPrice.toFixed(2));
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
    this.http.delete(`http://localhost:3000/products/${item.itemId}`).subscribe(
      (response) => {
        console.log('Item removed from the wishlist', item.itemId);
        const index = this.wishListData.findIndex((itm) => itm.itemId === item.itemId);
        if (index !== -1) {
          this.wishListData.splice(index, 1); // Remove the item from the local array
          this.calculateTotalPrice();
        }
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error removing item from the wishlist', error);
      }
    );
  }

}
