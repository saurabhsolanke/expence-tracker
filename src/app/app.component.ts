import { Component, OnInit } from '@angular/core';
import { NightModeService } from './night-mode.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'expense';
  constructor(public nightModeService : NightModeService) { }
}
