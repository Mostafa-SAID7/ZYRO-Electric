
import { FAQ_ITEMS, } from './data';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FAQComponent {constructor() { FAQComponent.prototype.__init.call(this);FAQComponent.prototype.__init2.call(this); }
  __init() {this.expandedId = null}
  __init2() {this.faqs = FAQ_ITEMS}

  toggleFAQ(id) {
    this.expandedId = this.expandedId === id ? null : id;
  }
}
