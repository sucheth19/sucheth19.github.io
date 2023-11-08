import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Product {
  title: string;
  timeLeft: string;
  buyItNowPrice: { __value__: number };
  shippingCost: { __value__: number };
  imageURL: string; // Add this property
  viewItemURL: string;
}

@Component({
  selector: 'app-similar-products',
  templateUrl: './similar-products.component.html',
  styleUrls: ['./similar-products.component.css']
})
export class SimilarProductsComponent implements OnInit {
  @Input() itemId!: string;
  similarProducts: Product[] = [];
  originalProducts: Product[] = [];
  selectedSortCategory: string = 'Default';
  ascendingSort: boolean = true;
  disableSort: boolean = true;
  showAll: boolean = true;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.showProductDetails();
  }

  showProductDetails() {
    try {
      this.http.get<Product[]>(`http://localhost:3000/similar-products/${this.itemId}`).subscribe((response) => {
        response.forEach((product: Product) => {
          product.timeLeft = this.extractDaysLeft(product.timeLeft).toString(); // Convert to string
        });  
      this.originalProducts = response.slice();
      this.similarProducts = this.originalProducts.slice(0,5);
      });
    } catch (e) {
      console.log(e);
    }
  }

  extractDaysLeft(timeLeft: string): number {
    // Check if the string contains "P" and "D"
    if (timeLeft.includes("P") && timeLeft.includes("D")) {
      // Find the index of "P" and "D" and extract the substring in between
      const startIndex = timeLeft.indexOf("P") + 1;
      const endIndex = timeLeft.indexOf("D");
      const daysSubstring = timeLeft.substring(startIndex, endIndex);
  
      // Convert the substring to a number
      const days = parseInt(daysSubstring, 10);
  
      // Check if days is a valid number
      if (!isNaN(days)) {
        return days;
      }
    }
  
    // Return 0 if the format is not as expected
    return 0;
  }
  toggleDropdown(event: Event) {
    event.preventDefault();
    // You can add custom logic here if needed.
  }
  selectSortOrder(order: string,event:any) {
    // Handle the sort order selection here.
    if(order === 'Ascending'){
      this.ascendingSort = true;

    }else{
      this.ascendingSort = false;
    }
    this.sortProducts();
  }
  toggleShowAll() {
    this.showAll = !this.showAll;
    if (this.showAll) {
      // If "Show More" is clicked, display all products.
      this.similarProducts = this.originalProducts.slice(0,5);
    } else {
      // If "Show Less" is clicked, display only the first 5 products.
      this.similarProducts = this.originalProducts.slice();
      this.sortProducts();
    }
  }
  
  
  selectSortCategory(category: string, event:any) {
    this.selectedSortCategory = category;

    // this.ascendingSort = !this.ascendingSort; 
    if (category === 'Default') {
      // Reset the list to the original order
      this.disableSort = true;
      this.ascendingSort = true;
      this.similarProducts = this.originalProducts.slice();
    } else {
      this.disableSort = false;
      this.sortProducts();
      this.toggleDropdown(event);
    }
    event.preventDefault();
  }

  sortProducts() {
    switch (this.selectedSortCategory) {
      case 'Product Name':
        this.similarProducts.sort((a, b) =>
          this.ascendingSort
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title)
        );
        break;
      case 'Days Left':
        this.similarProducts.sort((a, b) =>
          this.ascendingSort
            ? +a.timeLeft - +b.timeLeft
            : +b.timeLeft - +a.timeLeft
        );
        break;
      case 'Price':
        this.similarProducts.sort((a, b) =>
          this.ascendingSort
            ? a.buyItNowPrice.__value__ - b.buyItNowPrice.__value__
            : b.buyItNowPrice.__value__ - a.buyItNowPrice.__value__
        );
        break;
      case 'Shipping Cost':
        this.similarProducts.sort((a, b) =>
          this.ascendingSort
            ? a.shippingCost.__value__ - b.shippingCost.__value__
            : b.shippingCost.__value__ - a.shippingCost.__value__
        );
        break;
    }
  }
}
