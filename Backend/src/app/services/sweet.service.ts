import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SweetService {
  private api = 'http://localhost:8080/api/sweets';
  constructor(private http: HttpClient) {}
  list(){ return this.http.get<any[]>(this.api); }
  search(q:string){ return this.http.get<any[]>(this.api + '/search?name=' + encodeURIComponent(q)); }
  get(id:any){ return this.http.get<any>(this.api + '/' + id); }
  create(payload:any){ return this.http.post(this.api, payload); }
  update(id:any, payload:any){ return this.http.put(this.api + '/' + id, payload); }
  delete(id:any){ return this.http.delete(this.api + '/' + id); }
  purchase(id:any, qty=1){ return this.http.post(this.api + '/' + id + '/purchase?qty=' + qty, {}); }
  restock(id:any, qty=1){ return this.http.post(this.api + '/' + id + '/restock?qty=' + qty, {}); }
}
