import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionDataManagerService } from '../session-data-manager.service';

@Injectable()
export class HttpLoginService {

  constructor(private sessionDataManagerService: SessionDataManagerService, private http: HttpClient) {
  }

  public get(url: string) {
    return this.http.get(url, {headers: new HttpHeaders({'request-token': this.sessionDataManagerService.user.token})});
  }

  public post(url: string, body: any) {
    return this.http.post(url, body, {headers: new HttpHeaders({'request-token': this.sessionDataManagerService.user.token})});
  }

}
