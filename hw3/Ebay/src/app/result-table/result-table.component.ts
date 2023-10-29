  import { Component, Input, OnInit } from '@angular/core';
  import { EllipsisPipePipe } from '../ellipsis-pipe.pipe';
  import { HttpClient } from '@angular/common/http';
  import { ItemDetailsService } from '../item-details.service';
  @Component({
    selector: 'app-result-table',
    templateUrl: './result-table.component.html',
    styleUrls: ['./result-table.component.css']
  })
  export class ResultTableComponent implements OnInit {
    @Input() result!: any[];
    itemsPerPage: number = 10;
    currentPage: number = 1;
    loading: boolean = false; 
    showDetailsTab: boolean = false;
    singleItemDetails: any[] = [];
    detail:boolean = true;

    constructor(private http: HttpClient, private itemDetailsService: ItemDetailsService) {
      console.log('this',this.result)
    }
    
    ngOnInit() {
      if (this.result) {
        console.log('Result:', this.result);  
      }
      this.loading = true;

    setTimeout(() => {
      // Simulate the completion of data loading
      this.loading = false;
    }, 2000); 
    }
    goToPage(page:number){
      if(page>=1 && page<=this.totalPages){
        this.currentPage = page;
      }
    }
    toggleDetailsTab() {
      this.showDetailsTab = !this.showDetailsTab;
      this.detail = !this.detail;
      }
    getProgressPercentage(): string {
      if (this.result) {
        const percentage = (this.currentPage / this.totalPages) * 100;
        return percentage.toFixed(0);
      }
      return '0';
    }
    
    getPages():number[]{
      const totalPages = Math.ceil(this.result.length/this.itemsPerPage);
      return Array(totalPages).fill(0).map((_,i)=>i+1);
    } 
    get totalPages(): number {
      return Math.ceil(this.result.length / this.itemsPerPage);
    }
    wishList(item:any){
      this.http.post('http://localhost:3000/products',item).subscribe((response)=>{
        console.log('res',response);
      },
      (error)=>{
        console.error('Error',error);
      }
      )
    }
    getSingleItem(itemId:string){
      this.itemDetailsService.getSingleItem(itemId).subscribe((response)=>{
        if (response?.Item) {
          this.singleItemDetails = Object.entries(response.Item);
          this.toggleDetailsTab();
        }
      },
      (error)=>{
        console.error('Error',error);
      }
      )
    }

    
  }
