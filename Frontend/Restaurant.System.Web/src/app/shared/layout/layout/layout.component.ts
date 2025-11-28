import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterService } from '../../router.service';
import 'bootstrap/dist/css/bootstrap.min.css';

@Component({
  selector: 'rs-layout',
  imports: [RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent implements OnInit {

  private routeService = inject(RouterService);

  ngOnInit(): void {
    this.routeService.gotoLogin();
  }
}
