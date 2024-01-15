import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Message, MessageNotification} from "../../models/message";
import {environment} from "../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<MessageNotification[]> {
    return this.httpClient.get<MessageNotification[]>(environment.apiHost + 'notifications')
  }

  getByUserId(username:string): Observable<MessageNotification[]> {
    return this.httpClient.get<MessageNotification[]>(environment.apiHost + 'notifications/user/'+username)
  }

}
