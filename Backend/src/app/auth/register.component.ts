import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  template: `
  <h2>Register</h2>
  <form [formGroup]="form" (ngSubmit)="submit()">
    <label>Username: <input formControlName="username"></label><br>
    <label>Password: <input type="password" formControlName="password"></label><br>
    <button type="submit">Register</button>
  </form>
  `
})
export class RegisterComponent {
  form = new FormBuilder().group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  constructor(private auth: AuthService, private router: Router) {}
  submit() {
    if (this.form.invalid) return;
    this.auth.register(this.form.value).subscribe({
      next: () => { alert('Registered'); this.router.navigate(['/login']); },
      error: () => alert('Registration failed')
    });
  }
}
