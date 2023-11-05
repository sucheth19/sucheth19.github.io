import { Component, Input} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductImagesDialogComponent } from '../product-images-dialog/product-images-dialog.component'; // Import the dialog component


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  @Input() itemDetails: any[] = [];
  @Input() shippingDetails: any[] = [];
  @Input() returnsAccepted: [] = [];
  product:boolean = true;
  seller:boolean = false;
  shopping:boolean = false;
  similar:boolean = false;
  photo:boolean = false;
  constructor(private dialog: MatDialog) { }
  openProductImagesDialog(images: string[]) {
    const dialogRef = this.dialog.open(ProductImagesDialogComponent, {
      data: { images }, 
      width: '30%', // Set the width to 50% of the screen
      height: '80%', // Pass images data to the dialog
    });

    // You can subscribe to the dialog's events if needed
    dialogRef.afterClosed().subscribe(result => {
      // Handle the dialog close event here
    });
}


   navigateBackToList(){
    console.log('navigateBackToWishList');
   }
   ngOnInit() {
    if (this.itemDetails) {
      console.log('ITEMdETAILS:', this.itemDetails);  
    }
    console.log('returnsAccepted',this.returnsAccepted)
 
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
