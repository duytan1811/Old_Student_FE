import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  private readonly apiEndpoint: string;
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;
  constructor(private http: HttpClient) {
    this.apiEndpoint = environment.apiUrl;
  }

  getHeaders(extra: any) {
    const authToken = localStorage.getItem(this.authLocalStorageToken);
    let token = '';
    if (authToken) {
      const authData = JSON.parse(authToken);
      token = `Bearer ${authData.token}`;
    }

    return new HttpHeaders({
      Authorization: token,
      ...extra,
    });
  }

  getData<T>(url: string, extra?: any) {
    const httpOptions = {
      headers: this.getHeaders(extra),
    };

    const endpoint = `${this.apiEndpoint}/${url}`;
    return this.http.get<T>(endpoint, httpOptions);
  }

  putData<T>(url: string, data: any, extra?: any) {
    const httpOptions = {
      headers: this.getHeaders(extra),
    };

    const endpoint = `${this.apiEndpoint}/${url}`;
    return this.http.put<T>(endpoint, data, httpOptions);
  }

  postData<T>(url: string, data: any, extra?: any) {
    const httpOptions = {
      headers: this.getHeaders(extra),
    };

    const endpoint = `${this.apiEndpoint}/${url}`;
    return this.http.post<T>(endpoint, data, httpOptions);
  }

  deleteData<T>(url: string, extra?: any) {
    const httpOptions = {
      headers: this.getHeaders(extra),
    };

    const endpoint = `${this.apiEndpoint}/${url}`;
    return this.http.delete<T>(endpoint, httpOptions);
  }

  deleteWithBodyData<T>(url: string, data: any, extra?: any) {
    const httpOptions = {
      headers: this.getHeaders(extra),
      body: data,
    };

    const endpoint = `${this.apiEndpoint}/${url}`;
    return this.http.delete<T>(endpoint, httpOptions);
  }
}
