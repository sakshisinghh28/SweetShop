import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  template: `
  <h2>Login</h2>
  <form [formGroup]="form" (ngSubmit)="submit()">
    <label>Username: <input formControlName="username"></label><br>
    <label>Password: <input type="password" formControlName="password"></label><br>
    <button type="submit">Login</button>
  </form>
  `
})
export class LoginComponent {
  form = new FormBuilder().group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  constructor(private auth: AuthService, private router: Router) {}
  submit() {
    if (this.form.invalid) return;
    this.auth.login(this.form.value).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err)=> alert('Login failed')
    });
  }
}
