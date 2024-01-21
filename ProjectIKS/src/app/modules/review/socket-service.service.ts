import { Injectable } from '@angular/core';
import {MessageNotification} from "../../models/message";
import {map} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class SocketServiceService {
    restUrl:string = environment.apiHost + "/reviews/sendMessageRest";

    constructor(private http: HttpClient) { }

  postRest(data: MessageNotification) {
      console.log("USLO")
      return this.http.post<MessageNotification>(this.restUrl, data)
          .pipe(map((data: MessageNotification) => { return data; }));
  }
}
