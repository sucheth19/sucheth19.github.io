  import { Component, Input, OnInit,  ChangeDetectorRef ,OnChanges, SimpleChanges } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { ItemDetailsService } from '../item-details.service';
  import { NgxPaginationModule } from 'ngx-pagination';
  import { WishListService} from '../wish-list.service';
  import { ItemsService } from '../items.service';
  
  @Component({
    selector: 'app-result-table',
    templateUrl: './result-table.component.html',
    styleUrls: ['./result-table.component.css'],
  })
  export class ResultTableComponent implements OnInit {
    @Input() result!: any[];
    @Input() showWishListTab: boolean = false;
    @Input() showResultTab: boolean = false;
    itemsPerPage: number = 10;
    currentPage: number = 1;
    loading: boolean = false; 
    showDetailsTab: boolean = false;
    singleItemDetails: any[] = [];
    shippingDetails: any[] = [];
    detail:boolean = true;
    wishListData: any[] = [];
    returnsAccepted: any;
    paginatedResult!: any[];
    enableDetailsButton: boolean = false;
    selectedItem: any | null = null;
    title: string = '';

    @Input() resultActive: boolean=false;
    constructor(private itemsService:ItemsService,private http: HttpClient,private wishlistService: WishListService, private itemDetailsService: ItemDetailsService, private cdr: ChangeDetectorRef) {

    }
    ngOnChanges(changes: SimpleChanges) {
      if ('result' in changes && changes['result'].currentValue) {
        this.result = changes['result'].currentValue;
        console.log('change result', this.result);
        this.cdr.detectChanges(); // Trigger change detection
      }
    }
    onItemClick(item: any): void {
      this.selectedItem = item;
      this.title = item.title[0];
    }
    
    enableDetails() {
      this.enableDetailsButton = true;
    }

    ngOnInit() {
      if (this.resultActive) {
        console.log('Result is active:', this.resultActive);
      }
  
      this.fetchWishListData();
      if (this.result) {
        console.log('Result:', this.result);  
      }
      this.loading = true;

    setTimeout(() => {
      // Simulate the completion of data loading
      this.loading = false;
      this.paginateResults();
    }, 2000); 
    }
    paginateResults() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      this.paginatedResult = this.result.slice(
        startIndex,
        startIndex + this.itemsPerPage
      );
      console.log('startIndex:', startIndex);
  console.log('this.paginatedResult:', this.paginatedResult);
    }
    pageChanged(event: any): void {
      this.currentPage = event;
      this.paginateResults();
    }
  fetchWishListData() {
    this.http.get('http://localhost:3000/all-products').subscribe((data:any)=>{
      this.wishListData = data;
      console.log('this.wishListData',this.wishListData);
    })
  }
    goToPage(page:number){
      if(page>=1 && page<=this.totalPages){
        this.currentPage = page;
        this.paginateResults();
      }
    }

    toggleDetailsTab() {
      this.showDetailsTab = !this.showDetailsTab;
      this.detail = !this.detail;
      }
    showProduct(){
      if (this.selectedItem) {
        const itemId = this.selectedItem.itemId;
        this.itemDetailsService.getSingleItem(itemId).subscribe((response) => {
          if (response?.Item) {
            this.singleItemDetails = Object.entries(response.Item);
            this.toggleDetailsTab();
          }
        });
      }
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
      console.log('item',item)
        if (item) {
          const params = {
            itemId: item.itemId && item.itemId[0] ? item.itemId[0] : "N/A",
            title: item.title && item.title[0] ? item.title[0] : "N/A",
            galleryUrl: item.galleryURL && item.galleryURL[0] ? item.galleryURL[0] : "N/A",
            price: item.sellingStatus && item.sellingStatus[0].currentPrice[0].__value__ ? item.sellingStatus[0].currentPrice[0].__value__ : "N/A",
            shippingPrice: item.shippingInfo && item.shippingInfo[0].shippingServiceCost[0].__value__ ? item.shippingInfo[0].shippingServiceCost[0].__value__ : "N/A",
            zipCode: item.postalCode && item.postalCode[0] ? item.postalCode[0] : "N/A",
            shippingInfo: item.shippingInfo,
            returnsAccepted: item.returnsAccepted && item.returnsAccepted[0] ? item.returnsAccepted[0] : "false",
          };
          this.itemsService.addToWishlist(item);
          this.http.get('http://localhost:3000/products',{params}).subscribe((response)=>{
            console.log('res',response);
          },
          (error)=>{
            console.error('Error',error);
          }
          )
          // You can proceed with your HTTP request using the params
        } else {
          console.error('Item is empty or undefined.');
        }
      }
      
   
    
    getSingleItem(itemId:string, index:number){
      this.enableDetails();
      this.shippingDetails = this.result[index].shippingInfo[0];
      this.returnsAccepted = this.result[index];
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

  truncateWithEllipsis(text:string, maxLength:number) {
  if (text[0].length <= maxLength) {
    return text[0];
  } else {
    const truncatedText = text[0].substr(0, maxLength);
    const lastSpaceIndex = truncatedText.lastIndexOf(' ');
    if (lastSpaceIndex !== -1) {
      return truncatedText.substr(0, lastSpaceIndex) + '…';
    } else {
      return truncatedText + '…';
    }
  }
}
toggleWishlist(item:any) {
  item.inWishlist = !item.inWishlist;
}
removeFromWishlist(item: any) {
  this.itemsService.removeFromWishlist(item.itemId[0]);
  this.http.delete(`http://localhost:3000/products/${item.itemId[0]}`).subscribe(
    (response) => {
      console.log('Item removed from the wishlist', item.itemId[0]);
      const index = this.wishListData.findIndex((itm) => itm.itemId[0] === item.itemId[0]);
      if (index !== -1) {
        this.wishListData.splice(index, 1); // Remove the item from the local array
      }
      this.cdr.detectChanges();
    },
    (error) => {
      console.error('Error removing item from the wishlist', error);
    }
  );
}   
  }
