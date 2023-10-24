import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  productId!: string;
  constructor(private route: ActivatedRoute, private router:Router) {
   }
   goBack(){
    this.router.navigate(['/']);
   }
  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.productId = params['productId']
    })
  }
}
