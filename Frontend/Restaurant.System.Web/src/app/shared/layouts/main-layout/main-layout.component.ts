import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'rs-main-layout',
  imports: [RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent {

  //private routeService = inject(RouterService);

  // ngOnInit(): void {
  //   this.routeService.gotoLogin();
  // }
}
