import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishListData: any[] = [];
  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.fetchWishListData();
  }
  fetchWishListData() {
    this.http.get('http://localhost:3000/all-products').subscribe((data:any)=>{
      this.wishListData = data;
      console.log('this.wishListData',this.wishListData);
    })
  }

}
