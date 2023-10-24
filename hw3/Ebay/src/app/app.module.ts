import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsComponent } from './forms/forms.component';
import { SubmitButtonComponent } from './submit-button/submit-button.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import { ZipCodeService } from './zip-code.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SearchItemService } from './search-item.service';
import { ResultTableComponent } from './result-table/result-table.component';
import { EllipsisPipePipe } from './ellipsis-pipe.pipe';
import { DetailsComponent } from './details/details.component';
import { WishlistComponent } from './wishlist/wishlist.component';

@NgModule({
  declarations: [
    AppComponent,
    FormsComponent,
    SubmitButtonComponent,
    ResultTableComponent,
    EllipsisPipePipe,
    DetailsComponent,
    WishlistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule,
    MatAutocompleteModule
  ],
  providers: [ZipCodeService, SearchItemService],
  bootstrap: [AppComponent],
})
export class AppModule { }
