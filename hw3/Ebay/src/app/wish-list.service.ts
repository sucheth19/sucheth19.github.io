import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WishListService {
  private wishlist: any[] = [];
  private wishlistSubject = new BehaviorSubject<any[]>(this.wishlist);
  wishlist$: Observable<any[]> = this.wishlistSubject.asObservable();

  addToWishlist(item: any) {
    this.wishlist.push(item);
    this.wishlistSubject.next([...this.wishlist]);
  }

  removeFromWishlist(item: any) {
    const index = this.wishlist.findIndex((i) => i.itemId === item.itemId);
    if (index !== -1) {
      this.wishlist.splice(index, 1);
      this.wishlistSubject.next([...this.wishlist]);
    }
  }
}
