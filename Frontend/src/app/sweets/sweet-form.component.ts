import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SweetService } from '../services/sweet.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sweet-form',
  template: `
  <h2>{{editing ? 'Edit' : 'Add'}} Sweet</h2>
  <form [formGroup]="form" (ngSubmit)="submit()">
    <label>Name: <input formControlName="name"></label><br>
    <label>Category: <input formControlName="category"></label><br>
    <label>Price: <input type="number" formControlName="price"></label><br>
    <label>Quantity: <input type="number" formControlName="quantity"></label><br>
    <button type="submit">{{editing ? 'Save' : 'Create'}}</button>
  </form>
  `
})
export class SweetFormComponent implements OnInit {
  form = new FormBuilder().group({
    name: ['', Validators.required],
    category: ['', Validators.required],
    price: [0, Validators.required],
    quantity: [0, Validators.required]
  });
  editing = false;
  id: any = null;
  constructor(private sweet: SweetService, private route: ActivatedRoute, private router: Router) {}
  ngOnInit(){
    this.id = this.route.snapshot.params['id'];
    if (this.id){
      this.editing = true;
      this.sweet.get(this.id).subscribe((s:any) => this.form.patchValue(s));
    }
  }
  submit(){
    if (this.form.invalid) return;
    if (this.editing) this.sweet.update(this.id, this.form.value).subscribe(()=> this.router.navigate(['/']));
    else this.sweet.create(this.form.value).subscribe(()=> this.router.navigate(['/']));
  }
}
