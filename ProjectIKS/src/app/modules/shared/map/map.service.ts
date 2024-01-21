import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private searchAddressSubject = new BehaviorSubject<string | null>(null);
  searchAddress$ = this.searchAddressSubject.asObservable();
  constructor(private http: HttpClient) {}
  search(street: string): Observable<any> {
    return this.http.get(
      'https://nominatim.openstreetmap.org/search?format=json&q=' + street
    );
  }
  reverseSearch(lat: number, lon: number): Observable<any> {
    return this.http.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&<params>`
    );
  }
  setSearchAddress(address: string) {
    this.searchAddressSubject.next(address);
  }
}
