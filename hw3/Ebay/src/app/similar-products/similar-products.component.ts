import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Product {
  title: string;
  timeLeft: number;
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
similarProducts: Product[] = []; // Use the Product type here
selectedSortCategory: string = 'Default';
constructor(private http: HttpClient) { 
  console.log('this.itemId',this.itemId)
}
ngOnInit(): void {
  this.showProductDetails();
}


showProductDetails() {
  try {
    this.http.get<Product[]>(`http://localhost:3000/similar-products/${this.itemId}`).subscribe((response) => {
      this.similarProducts = response;
      this.similarProducts.forEach((product: Product) => { // Convert to string
      });
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
selectSortCategory(category: string) {
  this.selectedSortCategory = category;

  switch (category) {
    case 'Default':
      // Do nothing, use the default order
      break;
    case 'Name':
      this.sortByName();
      break;
    case 'Days':
      this.sortByDaysLeft();
      break;
    case 'Price':
      this.sortByPrice();
      break;
    case 'Shipping':
      this.sortByShippingCost();
      break;
  }
}
sortByName() {
  this.similarProducts.sort((a, b) => a.title.localeCompare(b.title));
}

sortByDaysLeft() {
  this.similarProducts.sort((a, b) => a.timeLeft - b.timeLeft);
}

sortByPrice() {
  this.similarProducts.sort((a, b) => a.buyItNowPrice.__value__ - b.buyItNowPrice.__value__);
}

sortByShippingCost() {
  this.similarProducts.sort((a, b) => a.shippingCost.__value__ - b.shippingCost.__value__);
}
}
