import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import packageInfo from '../../../../../package.json';

@Component({
  selector: 'rs-main-layout',
  imports: [RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent {
  version = 'v' + packageInfo.version;
}
