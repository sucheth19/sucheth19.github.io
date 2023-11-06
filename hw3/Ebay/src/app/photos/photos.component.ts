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
  
  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.searchPhotos();
  }
  searchPhotos() {
    const apiUrl = `http://localhost:3000/api/photo?title=${this.title}`; // Update the URL as needed
  
    this.http.get(apiUrl).subscribe(
      (data: any) => {
        // Handle the API response data here
        this.photos = data.items;
        console.log('data', data.items[0].link);
      },
      (error) => {
        console.error('API call failed:', error);
        // Handle the error here
      }
    );
  }


  
}
