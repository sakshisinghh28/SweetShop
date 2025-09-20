import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthService {
  private api = 'http://localhost:8080/api/auth';
  constructor(private http: HttpClient) {}
  register(payload:any){ return this.http.post(this.api + '/register', payload); }
  login(payload:any){ return this.http.post<any>(this.api + '/login', payload).pipe(tap(res => { localStorage.setItem('jwt', res.token); })); }
  logout(){ localStorage.removeItem('jwt'); }
  token(){ return localStorage.getItem('jwt'); }
  isLoggedIn(){ return !!this.token(); }
  isAdmin(){
    const t = this.token(); if(!t) return false;
    try {
      const payload = JSON.parse(atob(t.split('.')[1])); 
      const roles = payload.roles || [];
      return roles.includes('ROLE_ADMIN') || (payload.sub && payload.sub==='admin');
    } catch { return false; }
  }
}
