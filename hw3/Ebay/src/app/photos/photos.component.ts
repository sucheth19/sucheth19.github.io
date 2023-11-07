import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent {
  @Input() title!: string;
  photos: any[] = [];
  photoTab: any[] = [];
  
  constructor(private http: HttpClient) { 
    this.searchPhotos();
    console.log('title',this.title)
  }
  ngOnInit(): void {
    this.searchPhotos();
  }
  searchPhotos() {
    if(this.title != undefined){
    const apiUrl = `http://localhost:3000/api/photo?title=${this.title}`; // Update the URL as needed
    
    this.http.get(apiUrl).subscribe(
      (data: any) => {
        // Handle the API response data here
       
        this.photos = data.items;
        const validPhotos = this.photos
        .filter((photo: any) => photo.link !== null)
        .map((photo: any) => photo.link);

      while (validPhotos.length < 6) {
        validPhotos.push(null);
      }

      this.photoTab = validPhotos;

        console.log('this.photos', this.photoTab);
      },
      (error) => {
        console.error('API call failed:', error);
        // Handle the error here
      }
    );
    console.log('photos', this.photoTab);
    }
   
  }


  
}
