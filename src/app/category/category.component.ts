import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  form1!: FormGroup;
  categories = [];

  constructor(public transaction: TransactionService,private router: Router) { }

  ngOnInit(): void {
    this.form1 = new FormGroup({
      category: new FormControl('', Validators.required)
    });
  }
  get f(){
    return this.form1.controls;
  }
  submit1(){
    console.log(this.form1.value);
    this.transaction.create1(this.form1.value).subscribe((res:any) => {
         console.log(' created successfully!', 'Added Category!');
         this.router.navigateByUrl('home');
    })
  }
}
