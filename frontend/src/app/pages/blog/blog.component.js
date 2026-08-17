
import { BLOG_POSTS, } from './data';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent {constructor() { BlogComponent.prototype.__init.call(this); }
  __init() {this.blogPosts = BLOG_POSTS}
}
