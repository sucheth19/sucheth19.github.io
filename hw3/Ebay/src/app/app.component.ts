import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ebay';
  resultTableData: any[] = [];
  inDetailsView = false;
  showResultsTab:boolean = true;
  showWishListTab:boolean = false;

  handleResultTableData(data:any[]){
    this.resultTableData = data;
  }
  activateResultsTab(){
    this.showResultsTab = true;
    this.showWishListTab = false;
  }
  activateWishListTab(){
    this.showResultsTab = false;
    this.showWishListTab = true;
  }

}
