import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterService } from '../../../services/router.service';

@Component({
  selector: 'rs-redirect',
  templateUrl: './redirect.component.html',
  imports:[CommonModule],
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent {

  constructor(private routerService: RouterService) {
    setTimeout(() => this.routerService.gotoLogin(), 5000);
  }
}
