import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.css']
})
export class ResultTableComponent implements OnInit {
  @Input() result!: any[];
  itemsPerPage: number = 10;
  currentPage: number = 1;
  constructor() {
    console.log('Result Table Component Initialized');
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
  
}
