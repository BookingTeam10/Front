import { Injectable } from '@angular/core';
import {environment} from "../../environment/environment";
import {HttpClient} from "@angular/common/http";
import {MessageNotification} from "../../models/message";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SocketService {


  url: string = environment.apiHost + "socket";
  restUrl:string = environment.apiHost + "/sendMessageRest";

  constructor(private http: HttpClient) { }

  post(data: MessageNotification) {
    return this.http.post<MessageNotification>(this.url, data)
      .pipe(map((data: MessageNotification) => { return data; }));
  }

  postRest(data: MessageNotification) {
    return this.http.post<MessageNotification>(this.restUrl, data)
      .pipe(map((data: MessageNotification) => { return data; }));
  }
}
