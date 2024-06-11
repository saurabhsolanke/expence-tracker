import { Component } from '@angular/core';
import { NightModeService } from '../night-mode.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidenavbar',
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.css'],
})
export class SidenavbarComponent {
  constructor(
    public nightModeService: NightModeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  isActive(route: string): boolean {
    return this.router.isActive(route, true);
  }

}
