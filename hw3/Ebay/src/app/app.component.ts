import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ebay';
  resultTableData: any[] = [];

  handleResultTableData(data:any[]){
    this.resultTableData = data;
    console.log('this.resultTableData',this.resultTableData)
  }

}
