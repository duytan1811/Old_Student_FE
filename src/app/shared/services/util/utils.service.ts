import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private http: HttpClient) { }

  async loadFileUrl(url: any): Promise<any> {
    const content = await lastValueFrom(this.http.get(window.location.origin + "/" + url));
    return content;
  }
}
