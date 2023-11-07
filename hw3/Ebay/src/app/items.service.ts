import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private wishlistItems: any[] = [];
  private wishlistSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  constructor() { }
  getWishlist(): Observable<any[]> {
    return this.wishlistSubject.asObservable();
  }

  addToWishlist(item: any) {
    this.wishlistItems.push(item);
    this.wishlistSubject.next([...this.wishlistItems]);
  }

  removeFromWishlist(itemId: string) {
    const index = this.wishlistItems.findIndex((item) => item.itemId === itemId);
    if (index !== -1) {
      this.wishlistItems.splice(index, 1);
      this.wishlistSubject.next([...this.wishlistItems]);
    }
  }
}
