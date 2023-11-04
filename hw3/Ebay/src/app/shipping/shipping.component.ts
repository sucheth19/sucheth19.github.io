import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent {
  @Input() shippingDetails: any = {};
  @Input() returnsAccepted: any = '';
  constructor() {
  }

  ngOnInit() {
    console.log('returns', this.returnsAccepted['returnsAccepted'][0]);
  }
  
}
