import { Injectable, inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private auth = inject(AuthService);

  intercept<T>(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
    const currentUser = this.auth.getCurrentUserValue(); // typed as User | null

    if (currentUser?.token) {
      const cloned = req.clone({
        setHeaders: { Authorization: `Bearer ${currentUser.token}` }
      });
      return next.handle(cloned);
    }

    return next.handle(req);
  }
}
