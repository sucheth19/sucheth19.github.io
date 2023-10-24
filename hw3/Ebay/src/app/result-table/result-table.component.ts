import { Component, Input, OnInit } from '@angular/core';
import { EllipsisPipePipe } from '../ellipsis-pipe.pipe';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.css']
})
export class ResultTableComponent implements OnInit {
  @Input() result!: any[];
  itemsPerPage: number = 10;
  currentPage: number = 1;
  constructor(private http: HttpClient) {
    console.log('this',this.result)
  }
  
  ngOnInit() {
    if (this.result) {
      console.log('Result:', this.result);  
    }
  }
  goToPage(page:number){
    if(page>=1 && page<=this.totalPages){
      this.currentPage = page;
    }
  }
  getPages():number[]{
    const totalPages = Math.ceil(this.result.length/this.itemsPerPage);
    return Array(totalPages).fill(0).map((_,i)=>i+1);
  } 
  get totalPages(): number {
    return Math.ceil(this.result.length / this.itemsPerPage);
  }
  wishList(item:any){
    console.log('items',item);
    this.http.post('http://localhost:3000/products',item).subscribe((response)=>{
      console.log('res',response);
    },
    (error)=>{
      console.error('Error',error);
    }
    )
  }

  
}
