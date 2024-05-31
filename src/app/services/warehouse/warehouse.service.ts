import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rack } from '../rack/rack.service';

export interface Warehouse {
  id: number;
  uuid: string;
  client: string;
  family: string;
  size: number;
  rackList: Rack[];
}

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  root = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  getWarehouses(): Observable<Warehouse[]> {
    const url = `${this.root}/warehouse/list`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<Warehouse[]>(url, { headers })
      .pipe();
  }

  postWarehouses(data: Warehouse): Observable<Warehouse> {
    const url = `${this.root}/warehouse/`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Warehouse>(url, data, { headers })
      .pipe();
  }

  deleteWarehouses(data: Warehouse): Observable<void> {
    const url = `${this.root}/warehouse/${data.id}`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete<void>(url, { headers })
      .pipe();
  }

  getWarehouseById(id: number): Observable<Warehouse> {
    const url = `${this.root}/warehouse/${id}`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<Warehouse>(url, { headers })
      .pipe();
  }

  putWarehouses(data: Warehouse): Observable<Warehouse> {
    const url = `${this.root}/warehouse/${data.id}`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<Warehouse>(url, data, { headers })
      .pipe();
  }

  getPermutations(id: number): Observable<string> {
    const url = `${this.root}/warehouse/permutations/${id}`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<string>(url, { headers })
      .pipe();
  }

}
