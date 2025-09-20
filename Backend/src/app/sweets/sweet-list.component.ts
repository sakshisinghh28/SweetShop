import { Component, OnInit } from '@angular/core';
import { SweetService } from '../services/sweet.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sweet-list',
  template: `
  <h1>Sweet Shop</h1>
  <div style="display:flex; gap:8px; align-items:center;">
    <input placeholder="Search" [(ngModel)]="q" (input)="search()" />
    <button *ngIf="auth.isAdmin()" (click)="goAdd()">Add Sweet</button>
    <a routerLink="/login" *ngIf="!auth.isLoggedIn()">Login</a>
    <a routerLink="/register" *ngIf="!auth.isLoggedIn()">Register</a>
    <button (click)="logout()" *ngIf="auth.isLoggedIn()">Logout</button>
  </div>
  <div *ngFor="let s of sweets" class="mat-card">
    <h3>{{s.name}} <small>({{s.category}})</small></h3>
    <p>Price: ₹{{s.price}} — Quantity: {{s.quantity}}</p>
    <button (click)="purchase(s)" [disabled]="s.quantity===0">Purchase</button>
    <button *ngIf="auth.isAdmin()" (click)="edit(s)">Edit</button>
    <button *ngIf="auth.isAdmin()" (click)="delete(s)">Delete</button>
  </div>
  `
})
export class SweetListComponent implements OnInit {
  sweets: any[] = [];
  q = '';
  constructor(private sweet: SweetService, public auth: AuthService, private router: Router) {}
  ngOnInit(){ this.load(); }
  load(){ this.sweet.list().subscribe(res => this.sweets = res); }
  search(){ this.sweet.search(this.q).subscribe(res => this.sweets = res); }
  purchase(s:any){ this.sweet.purchase(s.id,1).subscribe(()=> this.load(), ()=> alert('Purchase failed')); }
  edit(s:any){ this.router.navigate(['/admin/edit', s.id]); }
  delete(s:any){ if(confirm('Delete?')) this.sweet.delete(s.id).subscribe(()=> this.load()); }
  goAdd(){ this.router.navigate(['/admin/add']); }
  logout(){ this.auth.logout(); this.router.navigate(['/']); }
}
