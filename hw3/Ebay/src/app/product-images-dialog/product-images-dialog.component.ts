import { Component,Inject,OnInit } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog'
import { SlickCarouselModule } from 'ngx-slick-carousel';

@Component({
  selector: 'app-product-images-dialog',
  templateUrl: './product-images-dialog.component.html',
  styleUrls: ['./product-images-dialog.component.css']
})
export class ProductImagesDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { images: string[] },
    private dialogRef: MatDialogRef<ProductImagesDialogComponent>
  ) {}
  currentIndex = 0;
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    infinite: true,
    autoplay: false,
  };
  nextImage() {
    if (this.currentIndex < this.data.images.length - 1) {
      this.currentIndex++;
    }
  }

  previousImage() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }
  closeDialog() {
    this.dialogRef.close();
  }
  ngOnInit() {
    // Set the currentIndex to the initial image index (if needed).
    this.currentIndex = 0;
  }
}
