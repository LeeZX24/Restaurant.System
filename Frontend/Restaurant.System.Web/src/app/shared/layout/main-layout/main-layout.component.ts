import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterService } from '../../services/router.service';
import 'bootstrap/dist/css/bootstrap.min.css';

@Component({
  selector: 'rs-layout',
  imports: [RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class LayoutComponent implements OnInit {

  private routeService = inject(RouterService);

  ngOnInit(): void {
    this.routeService.gotoLogin();
  }
}
