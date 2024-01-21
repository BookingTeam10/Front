import { Injectable } from '@angular/core';
import {Owner} from "../../../models/users/owner";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  private OwnersList:Owner[] = [];
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Owner[]>{

    return this.httpClient.get<Owner[]>(environment.apiHost + '/owners');
  }

  getOwner(id: number): Observable<Owner>{

    return this.httpClient.get<Owner>(environment.apiHost + '/owners/' + id);
  }

  delete(id: number) {
    this.httpClient.delete(environment.apiHost + '/owners/' + id);
  }

  update(owner: Owner): Observable<Owner>{

      return this.httpClient.put<Owner>(environment.apiHost + '/owners/' + owner.id, owner);
  }
}
