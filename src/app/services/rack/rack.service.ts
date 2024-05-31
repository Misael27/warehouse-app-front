import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Rack {
  id: number;
  type: string;
  warehouseId: string;
  uuid: string;
}

@Injectable({
  providedIn: 'root'
})
export class RackService {

  root = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  postRack(data: Rack): Observable<Rack> {
    const url = `${this.root}/rack/`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Rack>(url, data, { headers })
      .pipe();
  }

  deleteRack(data: Rack): Observable<void> {
    const url = `${this.root}/rack/${data.id}`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete<void>(url, { headers })
      .pipe();
  }

}
