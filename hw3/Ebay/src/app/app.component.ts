import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ebay';
  resultTableData: any[] = [];
  showResultsTab:boolean = true;
  showWishListTab:boolean = false;

  

  handleResultTableData(data:any[]){
    this.resultTableData = data ? data : [];

  }
  activateResultsTab(){
    this.showResultsTab = true;
    this.showWishListTab = false;
  }
  activateWishListTab(){
    this.showResultsTab = false;
    this.showWishListTab = true;
  }
  activateDetailsTab(){
    this.showResultsTab = false;
    this.showWishListTab = false;
  }
  clearResultTable(){
    this.resultTableData = [];
  }
  
}
