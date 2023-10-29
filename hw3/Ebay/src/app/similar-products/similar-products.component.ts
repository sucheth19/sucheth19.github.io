import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-similar-products',
  templateUrl: './similar-products.component.html',
  styleUrls: ['./similar-products.component.css']
})
export class SimilarProductsComponent implements OnInit {
@Input() itemId!: string;
similarProducts!: any;
selectedSortCategory: string = 'Default';
constructor(private http: HttpClient) { 
  console.log('this.itemId',this.itemId)
}
ngOnInit(): void {
  console.log('this.itemId',this.itemId)
  this.showProductDetails();
}
showProductDetails() {
  try{
    console.log('this.itemId',this.itemId)
    this.http.get(`http://localhost:3000/similar-products/${this.itemId}`).subscribe((response)=>{
      console.log('similar',response);
    this.similarProducts = response;
    this.similarProducts.forEach((product: any)=>{
      product.timeLeft = this.extractDaysLeft(product.timeLeft);
    });
    })
  }catch(e){
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
}
}
