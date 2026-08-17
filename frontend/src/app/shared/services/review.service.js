
import { BehaviorSubject, Observable } from 'rxjs';


// Single Responsibility: Handle review operations only
@Injectable({ providedIn: 'root' })
export class ReviewService {constructor() { ReviewService.prototype.__init.call(this);ReviewService.prototype.__init2.call(this);ReviewService.prototype.__init3.call(this); }
   __init() {this.mockReviews = [
    {
      id: '1',
      productId: '1',
      userId: 'user1',
      userName: 'John D.',
      rating: 5,
      title: 'Excellent product',
      comment: 'Very satisfied with this purchase',
      helpful: 0,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15')
    }
  ]}

   __init2() {this.reviewsSubject = new BehaviorSubject(this.mockReviews)}
  __init3() {this.reviews$ = this.reviewsSubject.asObservable()}

  getReviewsByProductId(productId) {
    const filtered = this.mockReviews.filter(r => r.productId === productId);
    return new Observable(observer => {
      observer.next(filtered);
      observer.complete();
    });
  }

  getAverageRating(productId) {
    const productReviews = this.mockReviews.filter(r => r.productId === productId);
    if (productReviews.length === 0) return 0;
    const sum = productReviews.reduce((acc, r) => acc + r.rating, 0);
    return Math.round((sum / productReviews.length) * 10) / 10;
  }

  addReview(review) {
    const newReview = {
      ...review,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.mockReviews.push(newReview);
    this.reviewsSubject.next(this.mockReviews);
  }

  deleteReview(reviewId) {
    this.mockReviews = this.mockReviews.filter(r => r.id !== reviewId);
    this.reviewsSubject.next(this.mockReviews);
  }
}
