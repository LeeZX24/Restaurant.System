import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private subject = new BehaviorSubject<boolean>(false);

  loading$ = this.subject.asObservable();

  startLoading() {
    this.subject.next(true);
  }

  stopLoading() {
    this.subject.next(false);
  }
}
