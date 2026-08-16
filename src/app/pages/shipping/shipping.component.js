
import { SHIPPING_OPTIONS, } from './data';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent {constructor() { ShippingComponent.prototype.__init.call(this); }
  __init() {this.shippingOptions = SHIPPING_OPTIONS}
}
