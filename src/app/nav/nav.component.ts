import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  email: any;
  constructor() { }

  ngOnInit(): void {
    console.log(this.email);
    localStorage.getItem('email');
  }

}
