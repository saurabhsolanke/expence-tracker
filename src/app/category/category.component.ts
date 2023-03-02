import { HttpClient } from '@angular/common/http';
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
  category:any;
  
  constructor(public transaction: TransactionService, private http: HttpClient,
    private router: Router) { }
    
    categories: any = [];
  ngOnInit(): void {
    this.form1 = new FormGroup({
      category: new FormControl('', Validators.required)
    });
    this.getcategory();
  }
  get f() {
    return this.form1.controls;
  }

  getcategory() {
    this.http.get<any[]>(this.transaction.apiURL + '/category/')
      .subscribe(data => {
        this.categories = [];
        this.categories = data;
        console.log(data)
      });
  }

  submit1() {
    console.log(this.form1.value);
    this.transaction.create1(this.form1.value).subscribe((res: any) => {
      console.log(' created successfully!', 'Added Category!');
      this.router.navigateByUrl('home');
    })
  }

  Search() {
    if (this.category == "") {
      this.ngOnInit();
    }
    else {
      this.categories = this.categories.filter((res: { category: string; }) => {
        return res.category.toLocaleLowerCase().match(this.category.toLocaleLowerCase());
      })
    }
  }

  key: string = 'id';
  reverse: boolean = false;
  sort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  delete1(id: number) {
    this.transaction.delete1(id).subscribe(res => {
      this.categories = this.categories.filter(item => item.id !== id);
      console.log('Transaction deleted successfully!');
      this.getcategory();
    })
  }
}
