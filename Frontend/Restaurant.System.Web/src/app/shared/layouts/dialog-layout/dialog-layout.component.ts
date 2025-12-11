import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { InitComponent } from "../../components/init/init.component";

@Component({
  selector: 'rs-dialog-layout',
  templateUrl: './dialog-layout.component.html',
  styleUrls: ['./dialog-layout.component.css'],
  imports: [RouterOutlet, CommonModule, InitComponent]
})
export class DialogLayoutComponent {

}
